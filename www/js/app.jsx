define(['react', 'trello', 'query'], function(React, Trello, Query) {

  var lists = {};
  var defaultQuery = "board:nC8QJJoZ groupby:idList";

  var QueryBar = React.createClass({
    getDefaultProps: function() {
      return {
        queue: []
      };
    },
    getInitialState: function() {
      return Query.parse(defaultQuery);
    },
    handleSubmit: function(event) {
      event.preventDefault();
      this.updateVal(event.target.getElementsByTagName('input')[0].value);
    },
    handleChange: function(event) {
      if (this.state.timer) {
        clearTimeout(this.state.timer);
      }
      var input = event.target;
      this.state.timer = setTimeout(function() {
        this.updateVal(input.value);
      }.bind(this), 500);
    },
    updateVal: function(val) {
      var state;
      if (val === "") {
        state = {
          str: ""
        };
      } else {
        state = Query.parse(val);
      }
      this.setState(state);
      this.props.onUpdate(state);
    },
    render: function() {
      return (
        <h3 className="page-header"><form onSubmit={this.handleSubmit}><input id="queryInput" type="text" className="form-control" defaultValue={this.state.str} onChange={this.handleChange} /></form></h3>
      );
    }
  });

  var TrelloItem = React.createClass({
    render: function() {
      return (
        <tr className="trelloItem">
          <td className="checkCol">
            <input type="checkbox" />
          </td>
          <td className="title;Col"><a href={this.props.data.url}>{this.props.data.name}</a></td>
          <td className="listCol">{lists[this.props.data.idList].name}</td>
          <td className="stateCol">{this.props.data.closed ? "closed" : "open"}</td>
          <td className="dueCol">{this.props.data.due}</td>
        </tr>
      );
    }
  });


  var TrelloGroup = React.createClass({
    render: function() {
      var rows = this.props.cards.map(function(card) {
        return (
          <TrelloItem data={card} />
        );
      });

      var heading;
      if (this.props.group !== null) {
        heading = <div className="panel-heading">
                    <h1 className="panel-title">{this.props.group}</h1>
                  </div>;
      }

      return (
        <div className="trelloGroup panel panel-info">
          {heading}
          <table className="trello table table-striped">
            <thead>
              <tr>
                <th className="checkCol">&nbsp;</th>
                <th className="titleCol">Title</th>
                <th className="listCol">List</th>
                <th className="stateCol">State</th>
                <th className="dueCol">Due</th>
              </tr>
            </thead>
            <tbody>
              {rows}
            </tbody>
          </table>
        </div>
      );
    }
  });


  var TrelloBoard = React.createClass({
    getInitialState: function() {
      return {
        response: {
          cards: []
        },
        filtered: [],
        query: Query.parse(defaultQuery)
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
          lists[list.id] = list;
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
          <TrelloGroup group={groupName} cards={cards} />
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
        var list = lists[group];
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

  var App = {};
  App.init = function(boardId) {
    React.render(<TrelloBoard />, document.body);

  };

  return App;
});
