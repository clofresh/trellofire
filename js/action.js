define(["./peg/action"], function(Parser) {
  return {
    parse: function(str) {
      var output = {
        fields: {}
      };
      var terms = Parser.parse(str);
      for (var i = 0; i < terms.length; ++i) {
        var term = terms[i];

        var field = term.field;
        var value = term.value;
        switch (field) {
          case "title":
            output.fields[field] = value;
            break;
        }
      }
      output.terms = terms;
      output.str = str;
      return output;
    }
  };
});
