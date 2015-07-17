define(["./peg/grammar"], function(peg) {
  return {
    parse: function(str) {
      return peg.parse(str);
    }
  };
});
