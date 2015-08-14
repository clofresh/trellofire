define([
  'react',
  'trello',
  'action',
  'query',
  'stores/lists',
  'stores/selected',
  'jsx!./trello_group',
  'jsx!./query_bar'
], function(React, Trello, Action, Query, Lists, Selected, TrelloGroup,
  QueryBar) {
  return React.createClass({
    getInitialState: function() {
      return {
        response: {
          cards: []
        },
        filtered: [],
        query: Query.parse(this.props.defaultQuery)
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

    handleActionMenu: function(event) {
      // If any items are selected, open the context menu
      if (Selected.any()) {
        event.preventDefault();

        // Move the context menu to the click position
        var menu = document.getElementById('context-menu');
        menu.style.left = JSON.stringify(event.pageX - 100) + 'px';
        menu.style.top = JSON.stringify(event.pageY - 80) + 'px';

        // Display it
        if (!menu.classList.contains('open')) {
          menu.classList.add('open');
        }

        // Clear the input and move the keyboard focus there
        var input = document.getElementById('context-menu-input');
        input.value = "";
        input.focus();

        // Set up an event handle to close the menu on esc key
        document.onkeydown = function(event) {
          if (event.keyCode === 27) { // Esc key code
            this.closeMenu();
            event.preventDefault();
          }
        }.bind(this);
      }
    },

    closeMenu: function() {
      var menu = document.getElementById('context-menu');
      menu.classList.remove('open');
      document.onkeydown = null;
    },

    handleActionSubmit: function(event) {
      event.preventDefault();
      var parsed = Action.parse(event.target.getElementsByTagName('input')[0].value);
      var cardIds = Selected.getSelected();
      for (var field in parsed.fields) {
        switch (field) {
          case "title":
            var newVal = parsed.fields[field];
            var pending = [];
            for (var i = 0; i < cardIds.length; ++i) {
              var cardId = cardIds[i];
              console.log(cardId, newVal);
              pending.push(Trello.put('cards/' + cardId + '/name',
                {
                  value: newVal
                }));
              for (var j = 0; j < this.state.response.cards.length; ++j) {
                var card = this.state.response.cards[i];
                if (card.id === cardId) {
                  card.name = newVal;
                }
              }
            }
            console.log(pending);
            // /1/cards/[card id or shortlink]/name
            break;
        }
      }
      this.setState(this.state);
      this.closeMenu();
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
          var fieldVal = card[filter.field];
          switch (typeof fieldVal) {
            case "boolean":
              if (filter.op && filter.op.name == "not") {
                matched = matched && fieldVal !== filter.value;
              } else {
                matched = matched && fieldVal === filter.value;
              }
              break;
            case "string":
              if (filter.op && filter.op.name == "not") {
                matched = matched && !fieldVal.match(filter.value);
              } else {
                matched = matched && fieldVal.match(filter.value);
              }
              break;
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

      // Render the groups
      var sorter = this.state.query.sorter;
      var groups = [];
      for (var group in grouped) {
        var cards = grouped[group];
        // Apply the sorting
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
        <div className="container" onContextMenu={this.handleActionMenu}>
          <QueryBar defaultQuery={this.props.defaultQuery} onUpdate={this.updateQuery} /> {groups}
          <div id="context-menu" className="dropdown">
            <ul className="dropdown-menu">
              <li>
                <form id="action-form" onSubmit={this.handleActionSubmit}>
                  <label>Action: </label>
                  <input id="context-menu-input" text="type" />
                </form>
              </li>
            </ul>
          </div>
        </div>
      );
    },

    groupName: function(group) {
      switch (this.state.query.groupby) {
        case "idList":
          var list = Lists.get(group);
          if (list !== undefined) {
            return list.name;
          } else {
            return "N/A";
          }
          break;
        case "closed":
          if (group === "true") { // Yep, string true, not bool
            return "closed";
          } else {
            return "open";
          }
          break;
        default:
          return group;
      }
    }
  });
});
