require.config({
  baseUrl: 'js',
  paths: {
    bootstrap: "//cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.5/js/bootstrap.min",
    jquery: "//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.1/jquery.min",
    jsx: "bower_components/requirejs-react-jsx/jsx",
    JSXTransformer: "//cdnjs.cloudflare.com/ajax/libs/react/0.13.3/JSXTransformer",
    react: "//cdnjs.cloudflare.com/ajax/libs/react/0.13.3/react",
    text: "bower_components/requirejs-text/text",
    trello: "//api.trello.com/1/client.js?key=cd8f1241e56eb1c3d1fc2eb3b1d0708f"
  },

  shim: {
    bootstrap: {
      deps: ['jquery']
    },
    JSXTransformer: "JSXTransformer",
    react: {
      exports: "React"
    },
    trello: {
      deps: ['jquery'],
      exports: 'Trello',
    },
  },

  config: {
    jsx: {
      fileExtension: ".jsx",
      transformOptions: {
        harmony: true,
        stripTypes: false,
        inlineSourceMap: true
      },
      usePragma: false
    }
  }
});

require(['jsx!app', 'jquery', 'trello', 'bootstrap', 'util'], function(
  App, jQuery, Trello, Bootstrap, Util) {

  Trello.authorize({
    name: "Trellofire",
    scope: {
      read: true,
      write: true,
      account: false
    },
    expiration: "never",
    success: function() {
      var qstr = Util.getQueryString();
      if (qstr.board === undefined) {
        Util.setQueryString({
          board: 'nC8QJJoZ' // Default to Trello's public dev board
        });
      } else {
        App.init(qstr.board);
      }
    },
    error: function() {
      alert('error');
    }
  });
});
