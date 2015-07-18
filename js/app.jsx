define(['react', 'jsx!./views/trello_board'], function(React, TrelloBoard) {
  var App = {};
  App.init = function(query) {
    React.render(<TrelloBoard defaultQuery={query} />, document.body);
  };

  return App;
});
