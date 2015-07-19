var _action_parser=function(){function e(e,t){function r(){this.constructor=e}r.prototype=t.prototype,e.prototype=new r}function t(e,t,r,n,a,i){this.message=e,this.expected=t,this.found=r,this.offset=n,this.line=a,this.column=i,this.name="SyntaxError"}function r(e){function r(t){function r(t,r,n){var a,i;for(a=r;n>a;a++)i=e.charAt(a),"\n"===i?(t.seenCR||t.line++,t.column=1,t.seenCR=!1):"\r"===i||"\u2028"===i||"\u2029"===i?(t.line++,t.column=1,t.seenCR=!0):(t.column++,t.seenCR=!1)}return I!==t&&(I>t&&(I=0,Q={line:1,column:1,seenCR:!1}),r(Q,I,t),I=t),Q}function n(e){J>T||(T>J&&(J=T,M=[]),M.push(e))}function a(n,a,i){function s(e){var t=1;for(e.sort(function(e,t){return e.description<t.description?-1:e.description>t.description?1:0});t<e.length;)e[t-1]===e[t]?e.splice(t,1):t++}function o(e,t){function r(e){function t(e){return e.charCodeAt(0).toString(16).toUpperCase()}return e.replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\x08/g,"\\b").replace(/\t/g,"\\t").replace(/\n/g,"\\n").replace(/\f/g,"\\f").replace(/\r/g,"\\r").replace(/[\x00-\x07\x0B\x0E\x0F]/g,function(e){return"\\x0"+t(e)}).replace(/[\x10-\x1F\x80-\xFF]/g,function(e){return"\\x"+t(e)}).replace(/[\u0180-\u0FFF]/g,function(e){return"\\u0"+t(e)}).replace(/[\u1080-\uFFFF]/g,function(e){return"\\u"+t(e)})}var n,a,i,s=new Array(e.length);for(i=0;i<e.length;i++)s[i]=e[i].description;return n=e.length>1?s.slice(0,-1).join(", ")+" or "+s[e.length-1]:s[0],a=t?'"'+r(t)+'"':"end of input","Expected "+n+" but "+a+" found."}var l=r(i),u=i<e.length?e.charAt(i):null;return null!==a&&s(a),new t(null!==n?n:o(a,u),a,u,i,l.line,l.column)}function i(){var e;return e=s()}function s(){var t,r,a,i;if(t=T,r=o(),r!==f){for(a=[],v.test(e.charAt(T))?(i=e.charAt(T),T++):(i=f,0===U&&n(y));i!==f;)a.push(i),v.test(e.charAt(T))?(i=e.charAt(T),T++):(i=f,0===U&&n(y));a!==f?(i=s(),i===f&&(i=b),i!==f?(B=t,r=x(r,i),t=r):(T=t,t=g)):(T=t,t=g)}else T=t,t=g;return t}function o(){var t,r,a,i;return t=T,r=l(),r!==f?(58===e.charCodeAt(T)?(a=E,T++):(a=f,0===U&&n(C)),a!==f?(i=u(),i!==f?(B=t,r=A(r,i),t=r):(T=t,t=g)):(T=t,t=g)):(T=t,t=g),t}function l(){var t;return e.substr(T,5)===w?(t=w,T+=5):(t=f,0===U&&n(S)),t}function u(){var t,r,a,i;if(t=T,34===e.charCodeAt(T)?(r=q,T++):(r=f,0===U&&n(j)),r!==f){if(a=[],N.test(e.charAt(T))?(i=e.charAt(T),T++):(i=f,0===U&&n(R)),i!==f)for(;i!==f;)a.push(i),N.test(e.charAt(T))?(i=e.charAt(T),T++):(i=f,0===U&&n(R));else a=g;a!==f?(34===e.charCodeAt(T)?(i=q,T++):(i=f,0===U&&n(j)),i!==f?(B=t,r=F(a),t=r):(T=t,t=g)):(T=t,t=g)}else T=t,t=g;if(t===f){if(t=T,r=[],k.test(e.charAt(T))?(a=e.charAt(T),T++):(a=f,0===U&&n(_)),a!==f)for(;a!==f;)r.push(a),k.test(e.charAt(T))?(a=e.charAt(T),T++):(a=f,0===U&&n(_));else r=g;r!==f&&(B=t,r=F(r)),t=r}return t}function c(e){return e.join("")}var p,d=arguments.length>1?arguments[1]:{},f={},h={start:i},m=i,g=f,v=/^[ ]/,y={type:"class",value:"[ ]",description:"[ ]"},b=null,x=function(e,t){var r=[e];return null===t?r:r.concat(t)},E=":",C={type:"literal",value:":",description:'":"'},A=function(e,t){return{field:e,value:t}},w="title",S={type:"literal",value:"title",description:'"title"'},q='"',j={type:"literal",value:'"',description:'"\\""'},N=/^[^"]/,R={type:"class",value:'[^"]',description:'[^"]'},F=function(e){return c(e)},k=/^[^ ]/,_={type:"class",value:"[^ ]",description:"[^ ]"},T=0,B=0,I=0,Q={line:1,column:1,seenCR:!1},J=0,M=[],U=0;if("startRule"in d){if(!(d.startRule in h))throw new Error("Can't start parsing from rule \""+d.startRule+'".');m=h[d.startRule]}if(p=m(),p!==f&&T===e.length)return p;throw p!==f&&T<e.length&&n({type:"end",description:"end of input"}),a(null,M,J)}return e(t,Error),{SyntaxError:t,parse:r}}();define("peg/action",[],function(){return _action_parser}),define("action",["./peg/action"],function(e){return{parse:function(t){for(var r={fields:{}},n=e.parse(t),a=0;a<n.length;++a){var i=n[a],s=i.field,o=i.value;switch(s){case"title":r.fields[s]=o}}return r.terms=n,r.str=t,r}}});var _query_parser=function(){function e(e,t){function r(){this.constructor=e}r.prototype=t.prototype,e.prototype=new r}function t(e,t,r,n,a,i){this.message=e,this.expected=t,this.found=r,this.offset=n,this.line=a,this.column=i,this.name="SyntaxError"}function r(e){function r(t){function r(t,r,n){var a,i;for(a=r;n>a;a++)i=e.charAt(a),"\n"===i?(t.seenCR||t.line++,t.column=1,t.seenCR=!1):"\r"===i||"\u2028"===i||"\u2029"===i?(t.line++,t.column=1,t.seenCR=!0):(t.column++,t.seenCR=!1)}return Z!==t&&(Z>t&&(Z=0,H={line:1,column:1,seenCR:!1}),r(H,Z,t),Z=t),H}function n(e){K>G||(G>K&&(K=G,W=[]),W.push(e))}function a(n,a,i){function s(e){var t=1;for(e.sort(function(e,t){return e.description<t.description?-1:e.description>t.description?1:0});t<e.length;)e[t-1]===e[t]?e.splice(t,1):t++}function o(e,t){function r(e){function t(e){return e.charCodeAt(0).toString(16).toUpperCase()}return e.replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\x08/g,"\\b").replace(/\t/g,"\\t").replace(/\n/g,"\\n").replace(/\f/g,"\\f").replace(/\r/g,"\\r").replace(/[\x00-\x07\x0B\x0E\x0F]/g,function(e){return"\\x0"+t(e)}).replace(/[\x10-\x1F\x80-\xFF]/g,function(e){return"\\x"+t(e)}).replace(/[\u0180-\u0FFF]/g,function(e){return"\\u0"+t(e)}).replace(/[\u1080-\uFFFF]/g,function(e){return"\\u"+t(e)})}var n,a,i,s=new Array(e.length);for(i=0;i<e.length;i++)s[i]=e[i].description;return n=e.length>1?s.slice(0,-1).join(", ")+" or "+s[e.length-1]:s[0],a=t?'"'+r(t)+'"':"end of input","Expected "+n+" but "+a+" found."}var l=r(i),u=i<e.length?e.charAt(i):null;return null!==a&&s(a),new t(null!==n?n:o(a,u),a,u,i,l.line,l.column)}function i(){var e;return e=s()}function s(){var t,r,a,i;if(t=G,r=o(),r!==m){for(a=[],b.test(e.charAt(G))?(i=e.charAt(G),G++):(i=m,0===$&&n(x));i!==m;)a.push(i),b.test(e.charAt(G))?(i=e.charAt(G),G++):(i=m,0===$&&n(x));a!==m?(i=s(),i===m&&(i=E),i!==m?(Y=t,r=C(r,i),t=r):(G=t,t=y)):(G=t,t=y)}else G=t,t=y;return t}function o(){var t,r,a,i,s;return t=G,r=p(),r===m&&(r=E),r!==m?(a=u(),a!==m?(58===e.charCodeAt(G)?(i=A,G++):(i=m,0===$&&n(w)),i!==m?(s=c(),s!==m?(Y=t,r=S(r,a,s),t=r):(G=t,t=y)):(G=t,t=y)):(G=t,t=y)):(G=t,t=y),t===m&&(t=G,r=l(),r!==m?(58===e.charCodeAt(G)?(a=A,G++):(a=m,0===$&&n(w)),a!==m?(i=c(),i!==m?(Y=t,r=q(r,i),t=r):(G=t,t=y)):(G=t,t=y)):(G=t,t=y)),t}function l(){var t;return e.substr(G,5)===j?(t=j,G+=5):(t=m,0===$&&n(N)),t===m&&(e.substr(G,7)===R?(t=R,G+=7):(t=m,0===$&&n(F)),t===m&&(e.substr(G,4)===k?(t=k,G+=4):(t=m,0===$&&n(_)),t===m&&(e.substr(G,7)===T?(t=T,G+=7):(t=m,0===$&&n(B)),t===m&&(t=u())))),t}function u(){var t;return e.substr(G,5)===I?(t=I,G+=5):(t=m,0===$&&n(Q)),t}function c(){var t,r,a,i;if(t=G,34===e.charCodeAt(G)?(r=J,G++):(r=m,0===$&&n(M)),r!==m){if(a=[],U.test(e.charAt(G))?(i=e.charAt(G),G++):(i=m,0===$&&n(D)),i!==m)for(;i!==m;)a.push(i),U.test(e.charAt(G))?(i=e.charAt(G),G++):(i=m,0===$&&n(D));else a=y;a!==m?(34===e.charCodeAt(G)?(i=J,G++):(i=m,0===$&&n(M)),i!==m?(Y=t,r=L(a),t=r):(G=t,t=y)):(G=t,t=y)}else G=t,t=y;if(t===m){if(t=G,r=[],X.test(e.charAt(G))?(a=e.charAt(G),G++):(a=m,0===$&&n(O)),a!==m)for(;a!==m;)r.push(a),X.test(e.charAt(G))?(a=e.charAt(G),G++):(a=m,0===$&&n(O));else r=y;r!==m&&(Y=t,r=L(r)),t=r}return t}function p(){var t,r,a,i;if(t=G,33===e.charCodeAt(G)?(r=V,G++):(r=m,0===$&&n(P)),r!==m){for(a=[],b.test(e.charAt(G))?(i=e.charAt(G),G++):(i=m,0===$&&n(x));i!==m;)a.push(i),b.test(e.charAt(G))?(i=e.charAt(G),G++):(i=m,0===$&&n(x));a!==m?(Y=t,r=z(),t=r):(G=t,t=y)}else G=t,t=y;return t}function d(e){return e.join("")}var f,h=arguments.length>1?arguments[1]:{},m={},g={start:i},v=i,y=m,b=/^[ ]/,x={type:"class",value:"[ ]",description:"[ ]"},E=null,C=function(e,t){var r=[e];return null===t?r:r.concat(t)},A=":",w={type:"literal",value:":",description:'":"'},S=function(e,t,r){return{field:t,value:r,op:e}},q=function(e,t){return{field:e,value:t}},j="board",N={type:"literal",value:"board",description:'"board"'},R="groupby",F={type:"literal",value:"groupby",description:'"groupby"'},k="sort",_={type:"literal",value:"sort",description:'"sort"'},T="sortdir",B={type:"literal",value:"sortdir",description:'"sortdir"'},I="title",Q={type:"literal",value:"title",description:'"title"'},J='"',M={type:"literal",value:'"',description:'"\\""'},U=/^[^"]/,D={type:"class",value:'[^"]',description:'[^"]'},L=function(e){return d(e)},X=/^[^ ]/,O={type:"class",value:"[^ ]",description:"[^ ]"},V="!",P={type:"literal",value:"!",description:'"!"'},z=function(){return{type:"unary",name:"not"}},G=0,Y=0,Z=0,H={line:1,column:1,seenCR:!1},K=0,W=[],$=0;if("startRule"in h){if(!(h.startRule in g))throw new Error("Can't start parsing from rule \""+h.startRule+'".');v=g[h.startRule]}if(f=v(),f!==m&&G===e.length)return f;throw f!==m&&G<e.length&&n({type:"end",description:"end of input"}),a(null,W,K)}return e(t,Error),{SyntaxError:t,parse:r}}();define("peg/query",[],function(){return _query_parser}),define("query",["./peg/query"],function(e){return{parse:function(t){for(var r={filters:[]},n=e.parse(t),a=0;a<n.length;++a){var i=n[a],s=i.field,o=i.value;switch(s){case"board":case"groupby":case"sort":case"sortdir":r[s]=o;break;case"title":r.filters.push(i)}}return r.terms=n,r.str=t,r}}}),define("stores/lists",[],function(){var e={};return e.lists={},e.set=function(t,r){e.lists[t]=r},e.get=function(t){return e.lists[t]},e}),define("stores/selected",[],function(){var e={};return e.selected={},e.set=function(t,r){e.selected[t]=r},e.any=function(){for(var t in e.selected)if(e.selected[t])return!0;return!1},e.getSelected=function(){var t=[];return Object.keys(e.selected).forEach(function(r){e.selected[r]&&t.push(r)}),t},e}),define("views/trello_item",["react","stores/lists","stores/selected"],function(e,t,r){return e.createClass({getInitialState:function(){return{checked:!1}},handleClick:function(e){if("A"!==e.target.tagName){var t=!this.state.checked;this.setState({checked:t}),r.set(this.props.data.id,t)}},render:function(){return e.createElement("tr",{className:"trelloItem",onClick:this.handleClick},e.createElement("td",{className:"checkCol"},e.createElement("input",{type:"checkbox",checked:this.state.checked,onChange:this.handleClick})),e.createElement("td",{className:"titleCol"},e.createElement("a",{href:this.props.data.url},this.props.data.name)),e.createElement("td",{className:"listCol"},t.get(this.props.data.idList).name),e.createElement("td",{className:"stateCol"},this.props.data.closed?"closed":"open"),e.createElement("td",{className:"dueCol"},this.props.data.due))}})}),define("views/trello_group",["react","./trello_item"],function(e,t){return e.createClass({render:function(){var r,n=this.props.cards.map(function(r){return e.createElement(t,{key:r.id,data:r})});return null!==this.props.group&&(r=e.createElement("div",{className:"panel-heading"},e.createElement("h1",{className:"panel-title"},this.props.group))),e.createElement("div",{className:"trelloGroup panel panel-info"},r,e.createElement("table",{className:"trello table table-striped"},e.createElement("thead",null,e.createElement("tr",null,e.createElement("th",{className:"checkCol"}," "),e.createElement("th",{className:"titleCol"},"Title"),e.createElement("th",{className:"listCol"},"List"),e.createElement("th",{className:"stateCol"},"State"),e.createElement("th",{className:"dueCol"},"Due"))),e.createElement("tbody",null,n)))}})}),define("views/query_bar",["react","query"],function(e,t){return e.createClass({getDefaultProps:function(){return{queue:[]}},getInitialState:function(){return t.parse(this.props.defaultQuery)},handleSubmit:function(e){e.preventDefault(),this.updateVal(e.target.getElementsByTagName("input")[0].value)},handleChange:function(e){this.state.timer&&clearTimeout(this.state.timer);var t=e.target;this.state.timer=setTimeout(function(){this.updateVal(t.value)}.bind(this),500)},updateVal:function(e){var r;if(""===e)r={str:""};else try{r=t.parse(e);var n=window.location.origin+window.location.pathname+"?q="+encodeURIComponent(e);history.replaceState(null,null,n),localStorage.query=e}catch(a){console.log(a)}this.setState(r),this.props.onUpdate(r)},render:function(){return e.createElement("h3",{className:"page-header"},e.createElement("form",{onSubmit:this.handleSubmit},e.createElement("input",{id:"queryInput",type:"text",className:"form-control",defaultValue:this.state.str,onChange:this.handleChange})))}})}),define("views/trello_board",["react","trello","action","query","stores/lists","stores/selected","./trello_group","./query_bar"],function(e,t,r,n,a,i,s,o){return e.createClass({getInitialState:function(){return{response:{cards:[]},filtered:[],query:n.parse(this.props.defaultQuery)}},updateBoard:function(e){console.log("Updating board with query",e),t.boards.get(e.board,{cards:"all",lists:"all"},function(t){for(var r=0;r<t.lists.length;r++){var n=t.lists[r];a.set(n.id,n)}this.setState({response:t,filtered:[],query:e})}.bind(this))},componentDidMount:function(){this.updateBoard(this.state.query)},updateQuery:function(e){this.state.query.board!==e.board?this.updateBoard(e):(this.state.query=e,this.setState(this.state))},handleActionMenu:function(e){if(i.any()){e.preventDefault();var t=document.getElementById("context-menu");t.style.left=JSON.stringify(e.pageX-100)+"px",t.style.top=JSON.stringify(e.pageY-80)+"px",t.classList.contains("open")||t.classList.add("open");var r=document.getElementById("context-menu-input");r.value="",r.focus(),document.onkeydown=function(e){27===e.keyCode&&(this.closeMenu(),e.preventDefault())}.bind(this)}},closeMenu:function(){var e=document.getElementById("context-menu");e.classList.remove("open"),document.onkeydown=null},handleActionSubmit:function(e){e.preventDefault();var n=r.parse(e.target.getElementsByTagName("input")[0].value),a=i.getSelected();for(var s in n.fields)switch(s){case"title":for(var o=n.fields[s],l=[],u=0;u<a.length;++u){var c=a[u];console.log(c,o),l.push(t.put("cards/"+c+"/name",{value:o}));for(var p=0;p<this.state.response.cards.length;++p){var d=this.state.response.cards[u];d.id===c&&(d.name=o)}}console.log(l)}this.setState(this.state),this.closeMenu()},render:function(){for(var t={},r=this.state.response.cards,n=this.state.query.filters,a=this.state.query.groupby,i=0;i<r.length;++i){for(var l=r[i],u=!0,c=0;c<n.length;++c){var p=n[c];u=p.op&&"not"==p.op.name?u&&!l.name.match(p.value):u&&l.name.match(p.value)}if(u){var d=l[a]||"ungrouped";void 0===t[d]?t[d]=[l]:t[d].push(l)}}var f=this.state.query.sort,h=null;void 0!==f&&(h=function(e,t){return e[f]>t[f]});var m=[];for(var g in t){var r=t[g];null!==h&&r.sort(h);var v;v=void 0===a?null:this.groupName(g),m.push(e.createElement(s,{key:g,group:v,cards:r}))}return e.createElement("div",{className:"container",onContextMenu:this.handleActionMenu},e.createElement(o,{defaultQuery:this.props.defaultQuery,onUpdate:this.updateQuery})," ",m,e.createElement("div",{id:"context-menu",className:"dropdown"},e.createElement("ul",{className:"dropdown-menu"},e.createElement("li",null,e.createElement("form",{id:"action-form",onSubmit:this.handleActionSubmit},e.createElement("label",null,"Action: "),e.createElement("input",{id:"context-menu-input",text:"type"}))))))},groupName:function(e){if("idList"===this.state.query.groupby){var t=a.get(e);return void 0!==t?t.name:"N/A"}return e}})}),define("app",["react","./views/trello_board"],function(e,t){var r={};return r.init=function(r,n){var n=n||document.body;e.render(e.createElement(t,{defaultQuery:r}),n)},r}),define("util",{setQueryString:function(e){var t=[];for(var r in e)t.push(r+"="+e[r]);window.location.search="?"+t.join("&")},getQueryString:function(){var e=window.location.search.substr(1).split("&");if(""==e)return{};for(var t={},r=0;r<e.length;++r){var n=e[r].split("=",2);t[n[0]]=1==n.length?"":decodeURIComponent(n[1].replace(/\+/g," "))}return t}}),require.config({baseUrl:"js",paths:{bootstrap:"//cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.5/js/bootstrap.min",jquery:"//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.1/jquery.min",jsx:"bower_components/requirejs-react-jsx/jsx",JSXTransformer:"//cdnjs.cloudflare.com/ajax/libs/react/0.13.3/JSXTransformer",react:"//cdnjs.cloudflare.com/ajax/libs/react/0.13.3/react",text:"bower_components/requirejs-text/text",trello:"//api.trello.com/1/client.js?key=cd8f1241e56eb1c3d1fc2eb3b1d0708f"},shim:{bootstrap:["jquery"],JSXTransformer:"JSXTransformer",react:{exports:"React"},trello:{deps:["jquery"],exports:"Trello"}},config:{jsx:{fileExtension:".jsx",transformOptions:{harmony:!0,stripTypes:!1,inlineSourceMap:!0},usePragma:!1}}}),require(["app","jquery","trello","bootstrap","util"],function(e,t,r,n,a){r.authorize({name:"Trellofire",scope:{read:!0,write:!0,account:!1},expiration:"never",success:function(){var t=a.getQueryString(),r=t.q||localStorage.query||"board:nC8QJJoZ groupby:idList";e.init(r,document.getElementById("app"))},error:function(){alert("error")}})}),define("main",function(){});
//# sourceMappingURL=main.js.map