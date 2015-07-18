define({
  setQueryString: function(qobj) {
    var pairs = [];
    for (var key in qobj) {
      pairs.push(key + "=" + qobj[key]);
    }
    window.location.search = "?" + pairs.join("&");
  },
  getQueryString: function() {
    var kv = window.location.search.substr(1).split('&');
    if (kv == "") return {};
    var obj = {};

    for (var i = 0; i < kv.length; ++i) {
      var pair = kv[i].split('=', 2);
      if (pair.length == 1) {
        obj[pair[0]] = "";
      } else {
        obj[pair[0]] = decodeURIComponent(pair[1].replace(/\+/g, " "));
      }
    }
    return obj;
  }
});
