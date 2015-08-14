define([
  "./peg/query",
  "stores/lists",
], function(Parser, Lists) {
  var groupbys = {
    "list": "idList",
    "state": "closed"
  };
  var sortdirs = {
    "asc": function(a, b) {
      return a.localeCompare(b);
    },
    "desc": function(a, b) {
      return b.localeCompare(a);
    }
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
            output[field] = value;
            break;
          case "sortdir":
            output.compare = sortdirs[value];
            break;
          case "sort":
            var sorter;
            switch (value) {
              case "list":
                sorter = function(a, b) {
                  return this.compare(
                    Lists.get(a.idList).name,
                    Lists.get(b.idList).name);
                }.bind(output);
                break;
              case "state":
                sorter = function(a, b) {
                  return this.compare(
                    a.closed ? "c" : "o",
                    b.closed ? "c" : "o");
                }.bind(output);
                break;
              case "mod":
                sorter = function(a, b) {
                  return this.compare(a.dateLastActivity, b.dateLastActivity);
                }.bind(output);
                break;
              case "due":
                sorter = function(a, b) {
                  return this.compare(a.due, b.due);
                }.bind(output);
                break;
            }
            output.sorter = sorter;
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
      if (output.sorter !== undefined && output.compare == undefined) {
        output.compare = sortdirs.asc;
      }
      output.terms = terms;
      output.str = str;
      return output;
    }
  };
});
