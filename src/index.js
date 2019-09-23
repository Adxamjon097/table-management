$(document).ready(function () {

	let add = $("button#add");

	add.click(function () {
		let n = $("input#n").val();
		let m = $("input#m").val();

		let matrix = [];
		let types = [];

		for (let i = 0; i < m; i++) {
			matrix[i] = [];
			for (let k = 0; k < n; k++) {
				matrix[i][k] = {
					name: "",
					colspan: 1,
					rowspan: 1,
					x: i,
					y: k
				}
			}
		}


		for (let i = 0; i < n; i++){
			types[i] = {
				type: "",
				variants: [],
				name: "",
				formula: ""
			};
		}

		createTable(matrix);
		createTypes(types);
	});

	function createTypes(types) {
		$("div#types").html("");
		
		let tbody = $("<table class='table table-striped'>");
		let tr = $("<tr>");
		
		for (var k = 0; k < types[0].length; k++) {
		  var td = $("<td>").appendTo(tr);
		}
	
		tr.appendTo(tbody);
		tbody.appendTo("div#types");
	}


	function createTable(matrix) {
		$("div#table").html("");

		let table = $("<table class='table table-striped'>");

		for (let i = 0; i < matrix.length; i++) {
			let tr = $("<tr>");

			for (let j = 0; j < matrix[i].length; j++) {
				let td = $('<td>').attr("colspan", matrix[i][j].colspan).attr("rowspan", matrix[i][j].rowspan);
				let span = $('<input>').val(matrix[i][j].name).change(function (){
					matrix[i][j].name = $(this).val();
				});
				span.appendTo(td);
				td.appendTo(tr);

				let tool = $("<div class='icons'>").appendTo(td);

				if (j != matrix[i].length - 1) {
					let right = $("<a>").html('<i class="fa fa-arrow-right"></i>').click(function () {
						matrix[i][j].colspan++;

						for (let a = i; a <= i + matrix[i][j].rowspan - 1; a++) {
							matrix[a].pop();
						}

						createTable(matrix);
					}).appendTo(tool);
				}

				if (matrix[i][j].colspan > 1) {
					let left = $("<a>").html('<i class="fa fa-arrow-left"></i>').click(function () {
						matrix[i][j].colspan--;

						for (let a = i; a < i + matrix[i][j].rowspan; a++) {
							matrix[a].push({
								name: "",
								rowspan: 1,
								colspan: 1,
								x: a,
								j: matrix[a].length
							});
						}

						createTable(matrix);
					}).appendTo(tool);
				}

				if (matrix[i][j].rowspan > 1) {
					let up = $("<a>").html('<i class="fa fa-arrow-up"></i>').click(function () {
						matrix[i][j].rowspan--;
						for (let a = 0; a < matrix[i][j].colspan; a++) {
							matrix[i + matrix[i][j].rowspan].push({
								name: "",
								rowspan: 1,
								colspan: 1,
								x: i + matrix[i][j].rowspan,
								j: matrix[i + matrix[i][j].rowspan].length
							});
						}

						createTable(matrix);
					}).appendTo(tool);
				}

				if (i + matrix[i][j].rowspan - 1 != matrix.length - 1) {
					let down = $("<a>").html('<i class="fa fa-arrow-down"></i>').click(function () {
						for (let a = 0; a < matrix[i][j].colspan; a++) {
							let element = matrix[i + matrix[i][j].rowspan];
							if (element) {
								element.pop();
							}
						}

						matrix[i][j].rowspan++;

						createTable(matrix);
					}).appendTo(tool);
				}
			}
			tr.appendTo(table);
		}

		table.appendTo("div#table");
	}


	
});




