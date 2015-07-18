define(['react', 'jsx!./views/trello_board'], function(React, TrelloBoard) {
  var App = {};
  App.init = function(boardId) {
    React.render(<TrelloBoard />, document.body);
  };

  return App;
});
