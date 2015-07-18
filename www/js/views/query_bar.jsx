define(['react', 'query'], function(React, Query) {
  return React.createClass({
    getDefaultProps: function() {
      return {
        queue: []
      };
    },
    getInitialState: function() {
      return Query.parse(Query.defaultQuery);
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
});
