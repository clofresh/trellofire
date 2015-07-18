define(["./peg/grammar"], function(peg) {
  return {
    parse: function(str) {
      var output = {};
      var terms = peg.parse(str);
      for (var i = 0; i < terms.length; ++i) {
        var term = terms[i];
        var key = term[0];
        var val = term[1];
        switch (key) {
          case "board":
          case "groupby":
          case "title":
            output[key] = val;
        }
      }
      output.terms = terms;
      output.str = str;
      return output;
    }
  };
});
