<<<<<<< HEAD
!function(e){var o={};function t(a){if(o[a])return o[a].exports;var n=o[a]={i:a,l:!1,exports:{}};return e[a].call(n.exports,n,n.exports,t),n.l=!0,n.exports}t.m=e,t.c=o,t.d=function(e,o,a){t.o(e,o)||Object.defineProperty(e,o,{enumerable:!0,get:a})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,o){if(1&o&&(e=t(e)),8&o)return e;if(4&o&&"object"==typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(t.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&o&&"string"!=typeof e)for(var n in e)t.d(a,n,function(o){return e[o]}.bind(null,n));return a},t.n=function(e){var o=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(o,"a",o),o},t.o=function(e,o){return Object.prototype.hasOwnProperty.call(e,o)},t.p="",t(t.s=0)}([function(e,o){$(document).ready((function(){$("button#add").click((function(){let e=$("input#n").val(),o=$("input#m").val(),t=$("input#k").val(),a=$("input#table-name").val();if(e&&o&&t&&e>0&&o>0&&t>0&&a&&""!=a){let t=[],a=[];for(let a=0;a<o;a++){t[a]=[];for(let o=0;o<e;o++)t[a][o]={name:"",colspan:1,rowspan:1,x:a,y:o}}for(let o=0;o<e;o++)a[o]={type:"",variants:[],name:"",formula:""};!function e(o){!function(e){var o,t=new Array(e.length).fill(0);for(let o=0;o<e.length;o++)for(let a=0;a<e[o].length;a++)if(t[o]+=e[o][a].colspan,e[o][a].rowspan>1)for(let n=o+1;n<=o+e[o][a].rowspan-1;n++)t[n]+=e[o][a].colspan;o=Math.max(...t);for(let a=0;a<t.length;a++)if(t[a]!=o)for(let n=0;n<o-t[a];n++)e[a].push({name:"",name:"",rowspan:1,colspan:1,x:a,j:e[a].length})}(o);$("div#table").html("");let t=$("<table class='table table-striped'>");for(let a=0;a<o.length;a++){let n=$("<tr>");for(let t=0;t<o[a].length;t++){let l=$("<td>").attr("colspan",o[a][t].colspan).attr("rowspan",o[a][t].rowspan);$("<input>").val(o[a][t].name).change((function(){o[a][t].name=$(this).val()})).appendTo(l),l.appendTo(n);let p=$("<div class='icons' tabindex='1'>").appendTo(l);if(t!=o[a].length-1){$("<a>").html('<i class="fa fa-arrow-right"></i>').click((function(){let n=o[a][t+1];o[a][t].colspan+=n.colspan;for(let e=a;e<=a+o[a][t].rowspan-1;e++)e==a?o[e].splice(t+1,1):o[e].pop();e(o)})).appendTo(p)}if(o[a][t].colspan>1){$("<a>").html('<i class="fa fa-arrow-left"></i>').click((function(){o[a][t].colspan--;for(let e=a;e<a+o[a][t].rowspan;e++)o[e].push({name:"",rowspan:1,colspan:1,x:e,j:o[e].length});e(o)})).appendTo(p)}if(o[a][t].rowspan>1){$("<a>").html('<i class="fa fa-arrow-up"></i>').click((function(){o[a][t].rowspan--;for(let e=0;e<o[a][t].colspan;e++)o[a+o[a][t].rowspan].push({name:"",rowspan:1,colspan:1,x:a+o[a][t].rowspan,j:o[a+o[a][t].rowspan].length});e(o)})).appendTo(p)}if(a+o[a][t].rowspan-1!=o.length-1){$("<a>").html('<i class="fa fa-arrow-down"></i>').click((function(){for(let e=0;e<o[a][t].colspan;e++){let e=o[a+o[a][t].rowspan];e&&e.pop()}o[a][t].rowspan++,e(o)})).appendTo(p)}}n.appendTo(t)}t.appendTo("div#table")}(t),function(e){$("div#types").html("");let o=$("<table class='table table-striped'>"),t=$("<tr>");for(let o=0;o<e.length;o++){let a=$("<td>"),n=$('<div class="wrap">'),l=$('<div class="left">'),p=$('<div class="form-group active">'),r=$('<div class="form-group active">'),s=$('<div class="form-group select item">'),i=$('<div class="form-group formula">'),c=$('<div class="form-group table">'),f=$('<div class="form-group table">'),u=$('<div class="form-group table">'),d=$('<div class="addInput"></div>'),v=$('<div class="form-group last select"></div>'),m=$('<a href="#!" class="addInput"><i class="fa fa-plus"></i></a>'),h=$("<select id='select' class='form-control'>").val(e[o].type).change((function(){e[o].type=$(this).val(),console.log(e)})),g=$('<option value="1">number</option>'),T=$('<option value="2">select</option>'),b=$('<option value="3">text</option>'),y=$('<option value="4">formula</option>'),x=$('<option value="5">table</option>'),w=$("<input type='text' class='form-control' placeholder='name'>").val(e[o].name).change((function(){e[o].name=$(this).val(),console.log(e)})),k=$("<input type='text' class='form-control' placeholder='formula'>").val(e[o].formula).change((function(){e[o].formula=$(this).val(),console.log(e)})),j=$("<input type='text' name='variant' class='form-control' placeholder='variants'>").val(e[o].variants).change((function(){e[o].variants[$(this).closest("td").find("input[name=variant]").index(this)]=$(this).val(),console.log(e)})),O=$("<input type='text' class='form-control' placeholder='table'>").val(e[o].table).change((function(){e[o].table=$(this).val(),console.log(e)})),M=$("<input type='text' class='form-control' placeholder='key'>").val(e[o].key).change((function(){e[o].key=$(this).val(),console.log(e)})),_=$("<input type='text' class='form-control' placeholder='value'>").val(e[o].value).change((function(){e[o].value=$(this).val(),console.log(e)}));g.appendTo(h),T.appendTo(h),b.appendTo(h),y.appendTo(h),x.appendTo(h),k.appendTo(i),h.appendTo(p),w.appendTo(r),j.appendTo(s),O.appendTo(c),M.appendTo(f),_.appendTo(u),r.appendTo(l),p.appendTo(l),s.appendTo(l),i.appendTo(l),c.appendTo(l),f.appendTo(l),u.appendTo(l),d.appendTo(l),m.appendTo(v),v.appendTo(l),l.appendTo(n),n.appendTo(a),a.appendTo(t)}t.appendTo(o),o.appendTo("div#types")}(a)}!e||e<=0?$("#n-error").text("Укажите значение N"):$("#n-error").text(""),!o||o<=0?$("#m-error").text("Укажите значение M"):$("#m-error").text(""),!t||t<=0?$("#k-error").text("Укажите значение K"):$("#k-error").text(""),!a||a<=0?$("#table-name-error").text("Укажите название таблицы"):$("#table-name-error").text("")}))}))}]);
=======
!function(e){var o={};function t(n){if(o[n])return o[n].exports;var a=o[n]={i:n,l:!1,exports:{}};return e[n].call(a.exports,a,a.exports,t),a.l=!0,a.exports}t.m=e,t.c=o,t.d=function(e,o,n){t.o(e,o)||Object.defineProperty(e,o,{enumerable:!0,get:n})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,o){if(1&o&&(e=t(e)),8&o)return e;if(4&o&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(t.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&o&&"string"!=typeof e)for(var a in e)t.d(n,a,function(o){return e[o]}.bind(null,a));return n},t.n=function(e){var o=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(o,"a",o),o},t.o=function(e,o){return Object.prototype.hasOwnProperty.call(e,o)},t.p="",t(t.s=0)}([function(e,o){$(document).ready((function(){$("button#add").click((function(){let e=$("input#n").val(),o=$("input#m").val(),t=$("input#k").val(),n=$("input#table-name").val();if(e&&o&&t&&e>0&&o>0&&t>0&&n&&""!=n){let t=[],n=[];for(let n=0;n<o;n++){t[n]=[];for(let o=0;o<e;o++)t[n][o]={name:"",colspan:1,rowspan:1,x:n,y:o}}for(let o=0;o<e;o++)n[o]={type:"",variants:[],name:"",formula:""};!function e(o){!function(e){var o,t=new Array(e.length).fill(0);for(let o=0;o<e.length;o++)for(let n=0;n<e[o].length;n++)if(t[o]+=e[o][n].colspan,e[o][n].rowspan>1)for(let a=o+1;a<=o+e[o][n].rowspan-1;a++)t[a]+=e[o][n].colspan;o=Math.max(...t);for(let n=0;n<t.length;n++)if(t[n]!=o)for(let a=0;a<o-t[n];a++)e[n].push({name:"",name:"",rowspan:1,colspan:1,x:n,y:e[n].length})}(o);$("div#table").html("");let t=$("<table class='table table-striped'>");for(let n=0;n<o.length;n++){let a=$("<tr>");for(let t=0;t<o[n].length;t++){let l=$("<td>").attr("colspan",o[n][t].colspan).attr("rowspan",o[n][t].rowspan);$("<input>").val(o[n][t].name).change((function(){o[n][t].name=$(this).val()})).appendTo(l),l.appendTo(a);let p=$("<div class='icons'>").appendTo(l);if(t!=o[n].length-1){$("<a>").html('<i class="fa fa-arrow-right"></i>').click((function(){for(let e=0;e<o.length;e++)o[e][t+1]&&n-e==o[e][t+1].rowspan-1&&o[e][t+1].rowspan--;let a=o[n][t+1];o[n][t].colspan+=a.colspan;for(let e=n;e<=n+o[n][t].rowspan-1;e++)e==n?o[e].splice(t+1,1):o[e].pop();e(o)})).appendTo(p)}if(o[n][t].colspan>1){$("<a>").html('<i class="fa fa-arrow-left"></i>').click((function(){o[n][t].colspan--;for(let e=n;e<n+o[n][t].rowspan;e++)o[e].push({name:"",rowspan:1,colspan:1,x:e,y:o[e].length});e(o)})).appendTo(p)}if(o[n][t].rowspan>1){$("<a>").html('<i class="fa fa-arrow-up"></i>').click((function(){o[n][t].rowspan--;for(let e=0;e<o[n][t].colspan;e++)o[n+o[n][t].rowspan].push({name:"",rowspan:1,colspan:1,x:n+o[n][t].rowspan,y:o[n+o[n][t].rowspan].length});e(o)})).appendTo(p)}if(n+o[n][t].rowspan-1!=o.length-1){$("<a>").html('<i class="fa fa-arrow-down"></i>').click((function(){for(let e=0;e<o[n][t].colspan;e++){let e=o[n+o[n][t].rowspan];e&&e.pop()}o[n][t].rowspan++,e(o)})).appendTo(p)}}a.appendTo(t)}t.appendTo("div#table")}(t),function(e){$("div#types").html("");let o=$("<table class='table table-striped'>"),t=$("<tr>");for(let o=0;o<e.length;o++){let n=$("<td>"),a=$('<div class="wrap">'),l=$('<div class="left">'),p=$('<div class="form-group active">'),r=$('<div class="form-group active">'),s=$('<div class="form-group select item">'),i=$('<div class="form-group formula">'),c=$('<div class="form-group table">'),f=$('<div class="form-group table">'),u=$('<div class="form-group table">'),d=$('<div class="addInput"></div>'),v=$('<div class="form-group last select"></div>'),m=$('<a href="#!" class="addInput"><i class="fa fa-plus"></i></a>'),h=$("<select id='select' class='form-control'>").val(e[o].type).change((function(){e[o].type=$(this).val(),console.log(e)})),g=$('<option value="1">number</option>'),T=$('<option value="2">select</option>'),b=$('<option value="3">text</option>'),y=$('<option value="4">formula</option>'),w=$('<option value="5">table</option>'),x=$("<input type='text' class='form-control' placeholder='name'>").val(e[o].name).change((function(){e[o].name=$(this).val(),console.log(e)})),k=$("<input type='text' class='form-control' placeholder='formula'>").val(e[o].formula).change((function(){e[o].formula=$(this).val(),console.log(e)})),j=$("<input type='text' name='variant' class='form-control' placeholder='variants'>").val(e[o].variants).change((function(){e[o].variants[$(this).closest("td").find("input[name=variant]").index(this)]=$(this).val(),console.log(e)})),O=$("<input type='text' class='form-control' placeholder='table'>").val(e[o].table).change((function(){e[o].table=$(this).val(),console.log(e)})),M=$("<input type='text' class='form-control' placeholder='key'>").val(e[o].key).change((function(){e[o].key=$(this).val(),console.log(e)})),_=$("<input type='text' class='form-control' placeholder='value'>").val(e[o].value).change((function(){e[o].value=$(this).val(),console.log(e)}));g.appendTo(h),T.appendTo(h),b.appendTo(h),y.appendTo(h),w.appendTo(h),k.appendTo(i),h.appendTo(p),x.appendTo(r),j.appendTo(s),O.appendTo(c),M.appendTo(f),_.appendTo(u),r.appendTo(l),p.appendTo(l),s.appendTo(l),i.appendTo(l),c.appendTo(l),f.appendTo(l),u.appendTo(l),d.appendTo(l),m.appendTo(v),v.appendTo(l),l.appendTo(a),a.appendTo(n),n.appendTo(t)}t.appendTo(o),o.appendTo("div#types")}(n)}!e||e<=0?$("#n-error").text("Укажите значение N"):$("#n-error").text(""),!o||o<=0?$("#m-error").text("Укажите значение M"):$("#m-error").text(""),!t||t<=0?$("#k-error").text("Укажите значение K"):$("#k-error").text(""),!n||n<=0?$("#table-name-error").text("Укажите название таблицы"):$("#table-name-error").text("")}))}))}]);
>>>>>>> e03b587261a789ae3c1743bf748e08d329c961f0
