!function(e){var t={};function a(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,a),o.l=!0,o.exports}a.m=e,a.c=t,a.d=function(e,t,n){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},a.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)a.d(n,o,function(t){return e[t]}.bind(null,o));return n},a.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="",a(a.s=0)}([function(e,t){$(document).ready((function(){let e=$("button#add"),t=$("#content"),a=$("#save");var n=$("#update-table-id").length>0?$("#update-table-id").val():null;let o=[],l=[],p=null,r=null;function s(e){$("div#types").html("");let t=$("<table class='table table-striped'>"),a=$("<tr>");for(let t=0;t<e.length;t++){let n=$("<td>"),o=$('<div class="wrap">'),l=$('<div class="left">'),p=$('<div class="form-group active">'),r=$('<div class="form-group active">'),s=$('<div class="form-group formula '+(4==e[t].type?"active":"")+'">'),i=$('<div class="form-group table '+(5==e[t].type?"active":"")+'">'),c=$('<div class="addInput"></div>'),u=$('<div class="form-group last select '+(2==e[t].type?"active":"")+'"></div>'),d=$('<a href="#!" class="addInput"><i class="fa fa-plus"></i></a>'),f=$("<select class='type-select form-control'>").val(e[t].type).change((function(){e[t].type=$(this).val()})),v=$('<option value="1" '+(1==e[t].type?"selected":"")+">number</option>"),m=$('<option value="2" '+(2==e[t].type?"selected":"")+">select</option>"),h=$('<option value="3" '+(3==e[t].type?"selected":"")+">text</option>"),b=$('<option value="4" '+(4==e[t].type?"selected":"")+">formula</option>"),T=$('<option value="5" '+(5==e[t].type?"selected":"")+">table</option>"),g=$('<option value="6" '+(6==e[t].type?"selected":"")+">date</option>"),y=$('<option value="7" '+(7==e[t].type?"selected":"")+">numberation</option>"),x=$("<input type='text' class='form-control' placeholder='name'>").val(e[t].name).change((function(){e[t].name=$(this).val()})),w=$("<input type='text' class='form-control' placeholder='formula'>").val(e[t].formula).change((function(){e[t].formula=$(this).val()})),k=$("<select class='form-control'>").val(e[t].table).change((function(){e[t].table=$(this).val(),console.log(e)})),j=$('<option value="1" '+(1==e[t].type?"selected":"")+">select1</option>"),O=$('<option value="2" '+(2==e[t].type?"selected":"")+">select2</option>"),N=$('<option value="3" '+(3==e[t].type?"selected":"")+">select3</option>");j.appendTo(k),O.appendTo(k),N.appendTo(k),v.appendTo(f),m.appendTo(f),h.appendTo(f),b.appendTo(f),T.appendTo(f),g.appendTo(f),y.appendTo(f),w.appendTo(s),f.appendTo(p),x.appendTo(r),k.appendTo(i),r.appendTo(l),p.appendTo(l);for(let a=0;e[t].variants&&a<e[t].variants.length;a++){let n=$("<input type='text' name='variant' class='form-control' placeholder='variants'>").val(e[t].variants[a]).change((function(){e[t].variants[$(this).closest("td").find("input[name=variant]").index(this)]=$(this).val(),console.log(e[t].variants)})),o=$('<div class="form-group select item input-group '+(0==a?" first ":"")+(2==e[t].type?"active":"")+'">');n.appendTo(o),$('<span class="input-group-btn"><button class="btn btn-default"><i class="fa fa-minus"></i></button></span>').appendTo(o),o.appendTo(l)}if(!e[t].variants||e[t].variants&&0==e[t].variants.length){e[t].variants||(e[t].variants=[]);let a=$("<input type='text' name='variant' class='form-control' placeholder='variants'>").change((function(){e[t].variants[$(this).closest("td").find("input[name=variant]").index(this)]=$(this).val(),console.log(e[t].variants)})),n=$('<div class="form-group select item input-group first '+(2==e[t].type?"active":"")+'">');a.appendTo(n),$('<span class="input-group-btn"><button class="btn btn-default"><i class="fa fa-minus"></i></button></span>').appendTo(n),n.appendTo(l)}s.appendTo(l),i.appendTo(l),c.appendTo(l),d.appendTo(u),u.appendTo(l),l.appendTo(o),o.appendTo(n),n.appendTo(a)}a.appendTo(t),t.appendTo("div#types")}function i(e){!function(e){var t,a=new Array(e.length).fill(0);for(let t=0;t<e.length;t++)for(let n=0;n<e[t].length;n++)if(a[t]+=Number.parseInt(e[t][n].colspan),e[t][n].rowspan>1)for(let o=t+1;o<=t+Number.parseInt(e[t][n].rowspan)-1;o++)a[o]+=Number.parseInt(e[t][n].colspan);console.log("sums",a),t=Math.max(...a);for(let n=0;n<a.length;n++)if(a[n]!=t)for(let o=0;o<t-a[n];o++)e[n].push({name:"",rowspan:1,colspan:1})}(e),$("div#table").html("");let t=$("<table class='table table-striped'>"),a=$("<tbody>").appendTo(t),n=$("<tfoot>").appendTo(t),o=$("<tr>").appendTo(n),l=null,p=new Array(e.length).fill(0);for(let t=0;t<e.length;t++)for(let a=0;a<e[t].length;a++)if(p[t]+=Number.parseInt(e[t][a].colspan),e[t][a].rowspan>1)for(let n=t+1;n<=t+Number.parseInt(e[t][a].rowspan)-1;n++)p[n]+=Number.parseInt(e[t][a].colspan);l=Math.max(...p);for(let e=0;e<l;e++){let e=$("<th class='text-center'>").appendTo(o);$('<a href="#!">').html('<i class="fa fa-close">').click((function(){alert(1)})).appendTo(e)}for(let t=0;t<e.length;t++){let n=$("<tr>");for(let a=0;a<e[t].length;a++){let o=$("<td tabindex='1'>").attr("colspan",e[t][a].colspan).attr("rowspan",e[t][a].rowspan);$("<input>").val(e[t][a].name).change((function(){e[t][a].name=$(this).val()})).appendTo(o),o.appendTo(n);let l=$("<div class='icons'>").appendTo(o);$("<span>x</span>").appendTo(l);if($('<a href="#!">').html('<i class="fa fa-plus">').click((function(){e[t].splice(a+1,0,{name:"",rowspan:e[t][a],colspan:1}),i(e)})).appendTo(l),$('<a href="#!">').html('<i class="fa fa-close">').click((function(){e[t].splice(a,1),i(e)})).appendTo(l),a!=e[t].length-1){$("<a>").html('<i class="fa fa-arrow-right"></i>').click((function(){for(let n=0;n<e.length;n++)e[n][a+1]&&t-n==e[n][a+1].rowspan-1&&e[n][a+1].rowspan--;let n=e[t][a+1];e[t][a].colspan+=n.colspan;for(let n=t;n<=t+e[t][a].rowspan-1;n++)n==t?e[n].splice(a+1,1):e[n].pop();i(e)})).appendTo(l)}if(e[t][a].colspan>1){$("<a>").html('<i class="fa fa-arrow-left"></i>').click((function(){e[t][a].colspan--;for(let n=t;n<t+e[t][a].rowspan;n++)e[n].push({name:"",rowspan:1,colspan:1});i(e)})).appendTo(l)}if(e[t][a].rowspan>1){$("<a>").html('<i class="fa fa-arrow-up"></i>').click((function(){e[t][a].rowspan--;for(let n=0;n<e[t][a].colspan;n++)e[t+e[t][a].rowspan].push({name:"",rowspan:1,colspan:1});i(e)})).appendTo(l)}if(t+e[t][a].rowspan-1!=e.length-1){$("<a>").html('<i class="fa fa-arrow-down"></i>').click((function(){for(let n=0;n<e[t][a].colspan;n++){let n=e[t+e[t][a].rowspan];n&&n.pop()}e[t][a].rowspan++,i(e)})).appendTo(l)}}n.appendTo(a)}t.appendTo("div#table")}if(a.click((function(){(function(){var e=!1;return $("#table input").each((function(t,a){""==$(a).val()?($(a).css({border:"1px solid #E64320"}),e=!0):$(a).css({border:"1px solid #ccc"})})),$("#types input").each((function(t,a){$(a).closest(".form-group").hasClass("active")&&""==$(a).val()?($(a).css({border:"1px solid #E64320"}),e=!0):$(a).css({border:"1px solid #ccc"})})),e})()||function(e,t,a,n,o=null){e.length>0&&t.length>0&&a&&n&&$.ajax({method:"POST",data:{matrix:e,types:t,count:a,name:n,id:o},url:"http://eko.md.uz/api/default/index"}).done((function(e){e.status}))}(o,l,p,r,n)})),e.click((function(){let e=$("input#n").val(),a=$("input#m").val();if(p=$("input#k").val(),r=$("input#table-name").val(),e&&a&&p&&e>0&&a>0&&p>0&&r&&""!=r){t.show(),o=[],l=[];for(let t=0;t<a;t++){o[t]=[];for(let a=0;a<e;a++)o[t][a]={name:"",colspan:1,rowspan:1,x:t,y:a}}for(let t=0;t<e;t++)l[t]={type:1,variants:[],name:"",formula:"",table:""};i(o),s(l)}!e||e<=0?$("#n-error").text("Укажите значение N"):$("#n-error").text(""),!a||a<=0?$("#m-error").text("Укажите значение M"):$("#m-error").text(""),!p||p<=0?$("#k-error").text("Укажите значение K"):$("#k-error").text(""),!r||r<=0?$("#table-name-error").text("Укажите название таблицы"):$("#table-name-error").text("")})),$("#update-table-form").length>0){let e=$("#update-table-matrix-json").val(),t=$("#update-table-types-json").val(),a=$("#update-table-count").val(),n=$("#update-table-name").val();o=JSON.parse(e),l=JSON.parse(t),p=a,r=n,i(o),s(l)}}))}]);