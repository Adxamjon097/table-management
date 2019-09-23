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

		for (let i = 0; i < n; i++) {
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
		
		for (let k = 0; k < types.length; k++) {
			let td = $("<td>");
			let select = $("<select id='example'>");
			let options0 = $('<option value="null" selected="selected">--tanlang--</option>');
			let options1 = $('<option value="foo">number</option>');
			let options2 = $('<option value="foo">select</option>');
			let options3 = $('<option value="foo">text</option>');
			let options4 = $('<option value="foo">formula</option>');
			let options5 = $('<option value="foo">table</option>');
			
			let input1 = $("<input type='text' placeholder='name'>").val(types[k].name).change(function (){
				types[k].name = $(this).val();
				console.log(types);
			});

			let input2 = $("<input type='text' placeholder='formula'>").val(types[k].formula).change(function (){
				types[k].formula = $(this).val();
				console.log(types);
			});
			let input3 = $("<input type='text' placeholder='variants'>");
			let input4 = $("<input type='text' placeholder='table'>");
			let input5 = $("<input type='text' placeholder='key'>");
			let input6 = $("<input type='text' placeholder='value'>");
			options0.appendTo(select);
			options1.appendTo(select);
			options2.appendTo(select);
			options3.appendTo(select);
			options4.appendTo(select);
			options5.appendTo(select);
			select.appendTo(td);
			input1.appendTo(td);
			input2.appendTo(td);
			input3.appendTo(td);
			input4.appendTo(td);
			input5.appendTo(td);
			input6.appendTo(td);
		 	td .appendTo(tr);
		}
	
		tr.appendTo(tbody);
		tbody.appendTo("div#types");
	}

	function normalize(matrix) {
		var max = null;
		var sums = new Array(matrix.length).fill(0);

		for (let i = 0; i < matrix.length; i++) {

			for (let j = 0; j < matrix[i].length; j++) {
				sums[i] += matrix[i][j].colspan;

				if (matrix[i][j].rowspan > 1) {
					for (let u = i + 1; u <= i + matrix[i][j].rowspan - 1; u++) {
						sums[u] += matrix[i][j].colspan;
					}
				}
			}
		}

		max = Math.max(...sums);

		for (let i = 0; i < sums.length; i++) {
			if (sums[i] != max) {
				for (let k = 0; k < max - sums[i]; k++) {
					matrix[i].push({
						name: "",
						name: "",
						rowspan: 1,
						colspan: 1,
						x: i,
						j: matrix[i].length
					})
				}
			}
		}
	}

	function createTable(matrix) {
		normalize(matrix);

		$("div#table").html("");

		let table = $("<table class='table table-striped'>");

		for (let i = 0; i < matrix.length; i++) {
			let tr = $("<tr>");

			for (let j = 0; j < matrix[i].length; j++) {
				let td = $('<td>').attr("colspan", matrix[i][j].colspan).attr("rowspan", matrix[i][j].rowspan);
				let span = $('<input>').val(matrix[i][j].name).change(function () {
					matrix[i][j].name = $(this).val();
				});
				span.appendTo(td);
				td.appendTo(tr);

				let tool = $("<div class='icons'>").appendTo(td);

				if (j != matrix[i].length - 1) {
					let right = $("<a>").html('<i class="fa fa-arrow-right"></i>').click(function () {
						let next = matrix[i][j + 1];

						matrix[i][j].colspan += next.colspan;

						for (let a = i; a <= i + matrix[i][j].rowspan - 1; a++) {
							if (a == i)
								matrix[a].splice(j + 1, 1);
							else matrix[a].pop();
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




