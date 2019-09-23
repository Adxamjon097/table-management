$(document).ready(function() {

	var add = $("button#add");
	
	add.click(function() {
		var n = $("input#n").val();
		var m = $("input#m").val();
		
		var matrix = []; 

		for (var i = 0; i < m; i++) {
			matrix[i] = [];
			for (var k = 0; k < n; k++) {
				matrix[i][k] = {
					name: "",
					colspan: 1,
					rowspan: 1,
					x: i,
					y: k
				}
			}
		}

		createTable(matrix);
	});

	function createTable(matrix) {
		var table = $("<table class='table table-striped'>");

		for (var i = 0; i < matrix.length; i++){
			var tr = $("<tr>");

			for (var j = 0; j < matrix[i].length; j++){
				var td = $("<td>").text(matrix[i][j].name).attr("colspan", matrix[i][j].colspan).attr("rowspan", matrix[i][j].rowspan);
				td.appendTo(tr);

				var tool = $("<div>");

				var right = $("<a>").click(function (){
					matrix[i][j].colspan++;
					td
				});

				var left = $("<a>").click(function (){
					matrix[i][j].colspan--;
				});

				var up = $("<a>").click(function (){
					matrix[i][j].rowspan--;
				});

				var down = $("<a>").click(function (){
					matrix[i][j].rowspan++;
				});

				
			}

			tr.appendTo(table);
		}

		table.appendTo("div#table");
	}

});




