define(['react', 'jsx!./views/trello_board'], function(React, TrelloBoard) {
  lists = {}; // FIXME: global, used by trello_board and trello_item

  var App = {};
  App.init = function(boardId) {
    React.render(<TrelloBoard />, document.body);
  };

  return App;
});
