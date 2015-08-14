define(["./peg/query"], function(Parser) {
  var groupbys = {
    "list": "idList",
    "state": "closed"
  };
  return {
    parse: function(str) {
      var output = {
        filters: []
      };
      var terms = Parser.parse(str);
      for (var i = 0; i < terms.length; ++i) {
        var term = terms[i];

        var field = term.field;
        var value = term.value;
        switch (field) {
          case "board":
          case "sort":
          case "sortdir":
            output[field] = value;
            break;
          case "groupby":
            output[field] = groupbys[value] || value;
            break;
          case "title":
            term.field = "name";
            output.filters.push(term);
            break;
          case "state":
            term.field = "closed";
            if (term.value === "closed") {
              term.value = true;
              output.filters.push(term);
            } else if (term.value === "open") {
              term.value = false;
              output.filters.push(term);
            } else {
              console.log("Ignoring state filter: " + term.value);
            }
            break;
        }
      }
      output.terms = terms;
      output.str = str;
      return output;
    }
  };
});
