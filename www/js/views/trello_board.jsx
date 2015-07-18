var deps = [
  'react',
  'trello',
  'query',
  'stores/lists',
  'jsx!./trello_group',
  'jsx!./query_bar'
];

define(deps, function(React, Trello, Query, Lists, TrelloGroup, QueryBar) {
  return React.createClass({
    getInitialState: function() {
      return {
        response: {
          cards: []
        },
        filtered: [],
        query: Query.parse(Query.defaultQuery)
      };
    },
    updateBoard: function(query) {
      console.log('Updating board with query', query);
      Trello.boards.get(query.board, {
        cards: 'all',
        lists: 'all'
      }, function(data) {
        for (var i = 0; i < data.lists.length; i++) {
          var list = data.lists[i];
          Lists.set(list.id, list);
        }
        this.setState({
          response: data,
          filtered: [],
          query: query
        });
      }.bind(this));
    },
    componentDidMount: function() {
      this.updateBoard(this.state.query);
    },

    updateQuery: function(query) {
      if (this.state.query.board !== query.board) {
        this.updateBoard(query);
      } else {
        this.state.query = query;
        this.setState(this.state);
      }
    },

    render: function() {
      var grouped = {};
      var cards = this.state.response.cards;
      var filters = this.state.query.filters;
      var groupby = this.state.query.groupby;
      for (var i = 0; i < cards.length; ++i) {
        var card = cards[i];

        // Apply the filters
        var matched = true;
        for (var j = 0; j < filters.length; ++j) {
          var filter = filters[j];
          if (filter.op && filter.op.name == "not") {
            matched = matched && !card.name.match(filter.value);
          } else {
            matched = matched && card.name.match(filter.value);
          }
        }

        if (matched) {
          // Apply the grouping
          var key = card[groupby] || "ungrouped";
          if (grouped[key] === undefined) {
            grouped[key] = [card];
          } else {
            grouped[key].push(card);
          }
        }
      }

      // Apply the sorting
      var sortKey = this.state.query.sort;
      var sorter = null;
      if (sortKey !== undefined) {
        sorter = function(a, b) {
          return a[sortKey] > b[sortKey];
        };
      }

      // Render the groups
      var groups = [];
      for (var group in grouped) {
        var cards = grouped[group];
        if (sorter !== null) {
          cards.sort(sorter);
        }
        var groupName;
        if (groupby === undefined) {
          groupName = null;
        } else {
          groupName = this.groupName(group);
        }
        groups.push(
          <TrelloGroup key={group} group={groupName} cards={cards} />
        );
      }

      return (
        <div className="container">
          <QueryBar onUpdate={this.updateQuery} /> {groups}
        </div>
      );
    },

    groupName: function(group) {
      if (this.state.query.groupby === "idList") {
        var list = Lists.get(group);
        if (list !== undefined) {
          return list.name;
        } else {
          return "N/A";
        }
      } else {
        return group;
      }
    }
  });
});
