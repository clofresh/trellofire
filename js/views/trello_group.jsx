define(['react', 'jsx!./trello_item'], function(React, TrelloItem) {
  return React.createClass({
    render: function() {
      var rows = this.props.cards.map(function(card) {
        return (
          <TrelloItem key={card.id} data={card} />
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
});
