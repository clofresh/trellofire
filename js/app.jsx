define(['react', 'jsx!./views/trello_board'], function(React, TrelloBoard) {
  var App = {};
  App.init = function(query, el) {
    var el = el || document.body;
    React.render(<TrelloBoard defaultQuery={query} />, el);
  };

  return App;
});
