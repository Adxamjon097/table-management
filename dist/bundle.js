!function(e){var t={};function a(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,a),o.l=!0,o.exports}a.m=e,a.c=t,a.d=function(e,t,n){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},a.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)a.d(n,o,function(t){return e[t]}.bind(null,o));return n},a.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="",a(a.s=0)}([function(e,t){$(document).ready((function(){let e=$("button#add"),t=$("#content"),a=$("#save");var n=$("#update-table-id").length>0?$("#update-table-id").val():null;let o=[],l=[],p=[],r=null,s=null;function i(e){$("div#types").html("");let t=$("<table class='table table-striped'>"),a=$("<tr>");for(let t=0;t<e.length;t++){let n=$("<td>"),o=$('<div class="wrap">'),l=$('<div class="left">'),r=$('<div class="form-group active">'),s=$('<div class="form-group active">'),i=$('<div class="form-group formula '+(4==e[t].type?"active":"")+'">'),c=$('<div class="form-group table '+(5==e[t].type?"active":"")+'">'),u=$('<div class="addInput"></div>'),d=$('<div class="form-group last select '+(2==e[t].type?"active":"")+'"></div>'),f=$('<a href="#!" class="addInput"><i class="fa fa-plus"></i></a>'),v=$("<select class='type-select form-control'>").val(e[t].type).change((function(){e[t].type=$(this).val(),0==p.length&&$.ajax({method:"POST",url:"http://eko.md.uz/api/default/tables"}).done((function(e){p=e,console.log(p);for(let e=0;e<p.length;e++)$opt=$('<option value=" '+p[e]+' " >'+p[e]+" </option>"),$opt.appendTo($(".table-select")),console.log(p[e])}))})),m=$('<option value="1" '+(1==e[t].type?"selected":"")+">number</option>"),h=$('<option value="2" '+(2==e[t].type?"selected":"")+">select</option>"),b=$('<option value="3" '+(3==e[t].type?"selected":"")+">text</option>"),g=$('<option value="4" '+(4==e[t].type?"selected":"")+">formula</option>"),T=$('<option value="5" '+(5==e[t].type?"selected":"")+">table</option>"),y=$('<option value="6" '+(6==e[t].type?"selected":"")+">date</option>"),x=$('<option value="7" '+(7==e[t].type?"selected":"")+">numberation</option>"),w=$("<input type='text' class='form-control' placeholder='name'>").val(e[t].name).change((function(){e[t].name=$(this).val()})),k=$("<input type='text' class='form-control' placeholder='formula'>").val(e[t].formula).change((function(){e[t].formula=$(this).val()})),j=$("<select class='form-control'>").val(e[t].table).change((function(){e[t].table=$(this).val(),console.log(e)})),O=$('<option value="1" '+(1==e[t].type?"selected":"")+">select1</option>"),N=$('<option value="2" '+(2==e[t].type?"selected":"")+">select2</option>"),S=$('<option value="3" '+(3==e[t].type?"selected":"")+">select3</option>");O.appendTo(j),N.appendTo(j),S.appendTo(j),m.appendTo(v),h.appendTo(v),b.appendTo(v),g.appendTo(v),T.appendTo(v),y.appendTo(v),x.appendTo(v),k.appendTo(i),v.appendTo(r),w.appendTo(s),j.appendTo(c),s.appendTo(l),r.appendTo(l);for(let a=0;e[t].variants&&a<e[t].variants.length;a++){let n=$("<input type='text' name='variant' class='form-control' placeholder='variants'>").val(e[t].variants[a]).change((function(){e[t].variants[$(this).closest("td").find("input[name=variant]").index(this)]=$(this).val(),console.log(e[t].variants)})),o=$('<div class="form-group select item input-group '+(0==a?" first ":"")+(2==e[t].type?"active":"")+'">');n.appendTo(o),$('<span class="input-group-btn"><button class="btn btn-default"><i class="fa fa-minus"></i></button></span>').appendTo(o),o.appendTo(l)}if(!e[t].variants||e[t].variants&&0==e[t].variants.length){e[t].variants||(e[t].variants=[]);let a=$("<input type='text' name='variant' class='form-control' placeholder='variants'>").change((function(){e[t].variants[$(this).closest("td").find("input[name=variant]").index(this)]=$(this).val(),console.log(e[t].variants)})),n=$('<div class="form-group select item input-group first '+(2==e[t].type?"active":"")+'">');a.appendTo(n),$('<span class="input-group-btn"><button class="btn btn-default"><i class="fa fa-minus"></i></button></span>').appendTo(n),n.appendTo(l)}i.appendTo(l),c.appendTo(l),u.appendTo(l),f.appendTo(d),d.appendTo(l),l.appendTo(o),o.appendTo(n),n.appendTo(a)}a.appendTo(t),t.appendTo("div#types")}function c(e,t=!1){!function(e,t=!1){var a=null,n=new Array(e.length).fill(0);for(let t=0;t<e.length;t++)for(let a=0;a<e[t].length;a++)if(n[t]+=Number.parseInt(e[t][a].colspan),e[t][a].rowspan>1)for(let o=t+1;o<=t+Number.parseInt(e[t][a].rowspan)-1;o++)n[o]+=Number.parseInt(e[t][a].colspan);if(t){a=Math.min(...n);for(let t=0;t<n.length;t++)if(console.log(a,n[t]),n[t]>a)for(let o=0;o<n[t]-a;o++)1==e[t][e[t].length-1].colspan?e[t].pop():e[t][e[t].length-1].colspan--}else{a=Math.max(...n);for(let t=0;t<n.length;t++)if(n[t]!=a)for(let o=0;o<a-n[t];o++)e[t].push({name:"",rowspan:1,colspan:1})}}(e,t),$("div#table").html("");let a=$("<table class='table table-striped'>"),n=$("<tbody>").appendTo(a),o=$("<tfoot>").appendTo(a),l=$("<tr>").appendTo(o),p=null,r=new Array(e.length).fill(0);for(let t=0;t<e.length;t++)for(let a=0;a<e[t].length;a++)if(r[t]+=Number.parseInt(e[t][a].colspan),e[t][a].rowspan>1)for(let n=t+1;n<=t+Number.parseInt(e[t][a].rowspan)-1;n++)r[n]+=Number.parseInt(e[t][a].colspan);p=Math.max(...r);for(let t=0;t<p;t++){let a=$("<th class='text-center'>").appendTo(l);$('<a href="#!">').html('<i class="fa fa-close">').click((function(){for(let a=0;a<e[0].length;a++)e[0][a].colspan-1+a==t&&(e[0].splice(a,1),c(e,!0))})).appendTo(a)}for(let t=0;t<e.length;t++){let a=$("<tr>");for(let n=0;n<e[t].length;n++){let o=$("<td tabindex='1'>").attr("colspan",e[t][n].colspan).attr("rowspan",e[t][n].rowspan);$("<input>").val(e[t][n].name).change((function(){e[t][n].name=$(this).val()})).appendTo(o),o.appendTo(a);let l=$("<div class='icons'>").appendTo(o);$("<span>x</span>").appendTo(l);if($('<a href="#!">').html('<i class="fa fa-plus">').click((function(){e[t].splice(n+1,0,{name:"",rowspan:e[t][n],colspan:1}),c(e)})).appendTo(l),$('<a href="#!">').html('<i class="fa fa-close">').click((function(){e[t].splice(n,1),c(e,!0)})).appendTo(l),n!=e[t].length-1){$("<a>").html('<i class="fa fa-arrow-right"></i>').click((function(){for(let a=0;a<e.length;a++)e[a][n+1]&&t-a==e[a][n+1].rowspan-1&&e[a][n+1].rowspan--;let a=e[t][n+1];e[t][n].colspan+=a.colspan;for(let a=t;a<=t+e[t][n].rowspan-1;a++)a==t?e[a].splice(n+1,1):e[a].pop();c(e)})).appendTo(l)}if(e[t][n].colspan>1){$("<a>").html('<i class="fa fa-arrow-left"></i>').click((function(){e[t][n].colspan--;for(let a=t;a<t+e[t][n].rowspan;a++)e[a].push({name:"",rowspan:1,colspan:1});c(e)})).appendTo(l)}if(e[t][n].rowspan>1){$("<a>").html('<i class="fa fa-arrow-up"></i>').click((function(){e[t][n].rowspan--;for(let a=0;a<e[t][n].colspan;a++)e[t+e[t][n].rowspan].push({name:"",rowspan:1,colspan:1});c(e)})).appendTo(l)}if(t+e[t][n].rowspan-1!=e.length-1){$("<a>").html('<i class="fa fa-arrow-down"></i>').click((function(){for(let a=0;a<e[t][n].colspan;a++){let a=e[t+e[t][n].rowspan];a&&a.pop()}e[t][n].rowspan++,c(e)})).appendTo(l)}}a.appendTo(n)}a.appendTo("div#table")}if(a.click((function(){(function(){var e=!1;return $("#table input").each((function(t,a){""==$(a).val()?($(a).css({border:"1px solid #E64320"}),e=!0):$(a).css({border:"1px solid #ccc"})})),$("#types input").each((function(t,a){$(a).closest(".form-group").hasClass("active")&&""==$(a).val()?($(a).css({border:"1px solid #E64320"}),e=!0):$(a).css({border:"1px solid #ccc"})})),e})()||function(e,t,a,n,o=null){e.length>0&&t.length>0&&a&&n&&$.ajax({method:"POST",data:{matrix:e,types:t,count:a,name:n,id:o},url:"http://eko.md.uz/api/default/index"}).done((function(e){e.status}))}(o,l,r,s,n)})),e.click((function(){let e=$("input#n").val(),a=$("input#m").val();if(r=$("input#k").val(),s=$("input#table-name").val(),e&&a&&r&&e>0&&a>0&&r>0&&s&&""!=s){t.show(),o=[],l=[];for(let t=0;t<a;t++){o[t]=[];for(let a=0;a<e;a++)o[t][a]={name:"",colspan:1,rowspan:1,x:t,y:a}}for(let t=0;t<e;t++)l[t]={type:1,variants:[],name:"",formula:"",table:""};c(o),i(l)}!e||e<=0?$("#n-error").text("Укажите значение N"):$("#n-error").text(""),!a||a<=0?$("#m-error").text("Укажите значение M"):$("#m-error").text(""),!r||r<=0?$("#k-error").text("Укажите значение K"):$("#k-error").text(""),!s||s<=0?$("#table-name-error").text("Укажите название таблицы"):$("#table-name-error").text("")})),$("#update-table-form").length>0){let e=$("#update-table-matrix-json").val(),t=$("#update-table-types-json").val(),a=$("#update-table-count").val(),n=$("#update-table-name").val();o=JSON.parse(e),l=JSON.parse(t),r=a,s=n,c(o),i(l)}}))}]);