{
    function strconcat(s) { return s.join("") }
}

start
 = query

query
 = head:term [ ]* tail:query? {
     var vals = [head];
     if (tail === null) {
         return vals;
     } else {
         return vals.concat(tail);
     }
}

term
 = f:field ":" value:string { return {field: f, value: value} }

field
 = "title"

string
 = '"' val:[^"]+ '"' { return strconcat(val) }
 / val:[^ ]+         { return strconcat(val) }
