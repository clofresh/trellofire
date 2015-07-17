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
 = field:identifier ":" value:string { return [field, value] }

identifier
 = first:[A-Za-z] rest:[A-Za-z0-9_]* { return first + strconcat(rest) }

string
 = '"' val:[^"]+ '"' { return strconcat(val) }
 / val:[^ ]+         { return strconcat(val) }
