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
 = uop:not? field:filter ":" value:string {
     return {
         field: field,
         value: value,
         op:    uop
     }
 }
 / field:identifier ":" value:string { return {field: field, value: value} }

identifier
 = "board" / "groupby" / "sortdir" / "sort" / filter

filter
 = "title" / "state"

string
 = '"' val:[^"]+ '"' { return strconcat(val) }
 / val:[^ ]+         { return strconcat(val) }

not
 = "!" [ ]* { return {type: "unary", name: "not"} }
