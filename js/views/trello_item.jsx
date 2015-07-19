define([
  'react',
  'stores/lists',
  'stores/selected'
], function(React, Lists, Selected) {

  return React.createClass({
    getInitialState: function() {
      return {
        checked: false
      };
    },

    handleClick: function(event) {
      if (event.target.tagName !== "A") {
        var newVal = !this.state.checked;
        this.setState({
          checked: newVal
        });
        Selected.set(this.props.data.id, newVal);
      }
    },

    render: function() {
      return (
        <tr className="trelloItem" onClick={this.handleClick}>
          <td className="checkCol">
            <input type="checkbox" checked={this.state.checked} onChange={this.handleClick} />
          </td>
          <td className="titleCol"><a href={this.props.data.url}>{this.props.data.name}</a></td>
          <td className="listCol">{Lists.get(this.props.data.idList).name}</td>
          <td className="stateCol">{this.props.data.closed ? "closed" : "open"}</td>
          <td className="dueCol">{this.props.data.due}</td>
        </tr>
      );
    }
  });

});
