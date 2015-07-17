define(['react', 'trello', 'query'], function(React, Trello, Query) {

  var lists = {};

  var TrelloItem = React.createClass({
    render: function() {
      return (
        <tr className="trelloItem">
          <td className="checkCol">
            <input type="checkbox" />
          </td>
          <td className="nameCol"><a href={this.props.data.url}>{this.props.data.name}</a></td>
          <td className="nameCol">{lists[this.props.data.idList].name}</td>
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


      return (
        <div className="trelloGroup panel panel-info">
          <div className="panel-heading">
            <h1 className="panel-title">{this.props.group}</h1>
          </div>
          <table className="trello table table-striped">
            <thead>
              <tr>
                <th className="checkCol">&nbsp;</th>
                <th className="nameCol">Name</th>
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
        query: {

        },
        cards: [],
        grouping: "idList"
      };
    },

    componentDidMount: function() {
      Trello.boards.get(this.props.board, {
        cards: 'all',
        lists: 'all'
      }, function(data) {
        for (var i = 0; i < data.lists.length; i++) {
          var list = data.lists[i];
          lists[list.id] = list;
        }
        this.setState(data);
      }.bind(this));
    },

    render: function() {
      var grouped = {};
      for (var i = 0; i < this.state.cards.length; i++) {
        var card = this.state.cards[i];
        var key = card[this.state.grouping];
        if (grouped[key] === undefined) {
          grouped[key] = [card];
        } else {
          grouped[key].push(card);
        }
      }

      var groups = [];

      for (var group in grouped) {
        groups.push(
          <TrelloGroup group={this.groupName(group)} cards={grouped[group]} />
        );
      }

      return (
        <div className="container">
          <h3 className="page-header">
                                                  <input id="queryInput" type="text" className="form-control" value={this.state.query.str} />
                                                  </h3> {groups}
        </div>
      );
    },

    groupName: function(group) {
      if (this.state.grouping === "idList") {
        return lists[group].name;
      } else {
        return group;
      }
    }
  });


  var App = {
    hotkey: 126 // ~
  };

  App.enter = function(stateName) {
    var state = this.states[stateName];
    if (state == undefined) {
      throw 'Invalid state: ' + JSON.stringify(stateName);
    }
    console.log('Entering state: ' + stateName);
    if (this.current) {
      this.current.exit.bind(this)();
    }
    state.enter.bind(this)();
    this.current = state;
  };

  App.states = {};

  App.states.browse = {
    enter: function() {
      $(document).keypress(function(evt) {
        evt.preventDefault();
        console.log('browse keypress', evt.keyCode);
        if (evt.keyCode === App.hotkey) {
          this.enter('launcher');
        }
      }.bind(this));
    },
    update: function() {},
    exit: function() {
      $(document).off('keypress');
    }
  };

  App.states.launcher = {
    enter: function() {
      $(document).keypress(function(evt) {
        evt.preventDefault();
        console.log('browse keypress', evt.keyCode);
        if (evt.keyCode === App.hotkey) {
          this.enter('browse');
        }
      }.bind(this));
    },
    update: function() {},
    exit: function() {
      $(document).off('keypress');
    }
  };

  App.init = function(boardId) {
    // this.enter('browse');

    React.render(<TrelloBoard board={boardId} />, document.body);

    var typingTimer;
    $('#queryInput').on('keyup', function() {
      clearTimeout(typingTimer);
      var queryInput = this;
      typingTimer = setTimeout(function() {
        console.log(Query.parse($(queryInput).val()));
      }, 500);
    });

    $('#queryInput').on('keydown', function() {
      clearTimeout(typingTimer);
    });

  };

  return App;
});
