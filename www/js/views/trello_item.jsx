define(['react'], function(React) {
  return React.createClass({
    getInitialState: function() {
      return {
        checked: false
      };
    },
    handleClick: function(event) {
      if (event.target.tagName !== "A") {
        this.setState({
          checked: !this.state.checked
        });
      }
    },
    render: function() {
      return (
        <tr className="trelloItem" onClick={this.handleClick}>
          <td className="checkCol">
            <input type="checkbox" checked={this.state.checked} onChange={this.handleClick} />
          </td>
          <td className="titleCol"><a href={this.props.data.url}>{this.props.data.name}</a></td>
          <td className="listCol">{lists[this.props.data.idList].name}</td>
          <td className="stateCol">{this.props.data.closed ? "closed" : "open"}</td>
          <td className="dueCol">{this.props.data.due}</td>
        </tr>
      );
    }
  });
});
