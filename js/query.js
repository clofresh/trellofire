define(["./peg/grammar"], function(peg) {
  return {
    parse: function(str) {
      var output = {
        filters: []
      };
      var terms = peg.parse(str);
      for (var i = 0; i < terms.length; ++i) {
        var term = terms[i];

        var field = term.field;
        var value = term.value;
        switch (field) {
          case "board":
          case "groupby":
          case "sort":
          case "sortdir":
            output[field] = value;
            break;
          case "title":
            output.filters.push(term);
            break;
        }
      }
      output.terms = terms;
      output.str = str;
      return output;
    }
  };
});
