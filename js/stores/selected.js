define(function() {
  var module = {};
  module.selected = {};

  module.set = function(key, val) {
    module.selected[key] = val;
  };

  module.any = function() {
    for (var key in module.selected) {
      if (module.selected[key]) {
        return true;
      }
    }
    return false;
  };

  module.getSelected = function() {
    var selected = [];
    // For some reason for..in didn't work here
    Object.keys(module.selected).forEach(function(key) {
      if (module.selected[key]) {
        selected.push(key);
      }
    });
    return selected;
  };

  return module;
});
