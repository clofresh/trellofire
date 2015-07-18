define(function() {
  var module = {};
  module.lists = {};

  module.set = function(key, val) {
    module.lists[key] = val;
  };

  module.get = function(key) {
    return module.lists[key];
  };

  return module;
});
