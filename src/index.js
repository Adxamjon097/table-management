$(document).ready(function () {

	let add = $("button#add");

	add.click(function () {
		let n = $("input#n").val();
		let m = $("input#m").val();
		let k = $("input#k").val();
		let tableName = $("input#table-name").val();

		if (n && m && k && n > 0 && m > 0 && k > 0 && tableName && tableName != "") {

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
		}

		if (!n || n <= 0) {
			$("#n-error").text("Укажите значение N");
		} else {
			$("#n-error").text("");
		}

		if (!m || m <= 0) {
			$("#m-error").text("Укажите значение M");
		} else {
			$("#m-error").text("");
		}

		if (!k || k <= 0) {
			$("#k-error").text("Укажите значение K");
		} else {
			$("#k-error").text("");
		}
		if (!tableName || tableName <= 0) {
			$("#table-name-error").text("Укажите название таблицы");
		} else {
			$("#table-name-error").text("");
		}

	});

	function createTypes(types) {
		$("div#types").html("");

		let tbody = $("<table class='table table-striped'>");
		let tr = $("<tr>");

		for (let k = 0; k < types.length; k++) {
			let td = $("<td>");
			let wrap = $('<div class="wrap">');
			let left = $('<div class="left">');
			let form_group_active = $('<div class="form-group active">');
			let form_group_active2 = $('<div class="form-group active">');
			let form_group_select = $('<div class="form-group select item">');
			let form_group_formula = $('<div class="form-group formula">');
			let form_group_table = $('<div class="form-group table">');
			let form_group_table1 = $('<div class="form-group table">');
			let form_group_table2 = $('<div class="form-group table">');
			let addInput = $('<div class="addInput"></div>');
			let form_group_last_select = $('<div class="form-group last select"></div>');
			let a = $('<a href="#!" class="addInput"><i class="fa fa-plus"></i></a>')

			let select = $("<select id='select' class='form-control'>").val(types[k].type).change(function () {
				types[k].type = $(this).val();
				console.log(types);
			});
			let options1 = $('<option value="1">number</option>');
			let options2 = $('<option value="2">select</option>');
			let options3 = $('<option value="3">text</option>');
			let options4 = $('<option value="4">formula</option>');
			let options5 = $('<option value="5">table</option>');

			let input1 = $("<input type='text' class='form-control' placeholder='name'>").val(types[k].name).change(function () {
				types[k].name = $(this).val();
				console.log(types);
			});

			let input2 = $("<input type='text' class='form-control' placeholder='formula'>").val(types[k].formula).change(function () {
				types[k].formula = $(this).val();
				console.log(types);
			});

			let input3 = $("<input type='text' name='variant' class='form-control' placeholder='variants'>").val(types[k].variants).change(function () {
				types[k].variants[$(this).closest("td").find("input[name=variant]").index(this)] = $(this).val();

				console.log (types);
			});

			let input4 = $("<input type='text' class='form-control' placeholder='table'>").val(types[k].table).change(function () {
				types[k].table = $(this).val();
				console.log(types);
			});
			let input5 = $("<input type='text' class='form-control' placeholder='key'>").val(types[k].key).change(function () {
				types[k].key = $(this).val();
				console.log(types);
			});
			let input6 = $("<input type='text' class='form-control' placeholder='value'>").val(types[k].value).change(function () {
				types[k].value = $(this).val();
				console.log(types);
			});
			
			options1.appendTo(select);
			options2.appendTo(select);
			options3.appendTo(select);
			options4.appendTo(select);
			options5.appendTo(select);

			input2.appendTo(form_group_formula);

			select.appendTo(form_group_active);

			input1.appendTo(form_group_active2);

			
			input3.appendTo(form_group_select);
			input4.appendTo(form_group_table);
			input5.appendTo(form_group_table1);
			input6.appendTo(form_group_table2);

			form_group_active2.appendTo(left);
			form_group_active.appendTo(left);
			form_group_select.appendTo(left);
			form_group_formula.appendTo(left);
			form_group_table.appendTo(left);
			form_group_table1.appendTo(left);
			form_group_table2.appendTo(left);
			addInput.appendTo(left);

			a.appendTo(form_group_last_select);
			form_group_last_select.appendTo(left);

			left.appendTo(wrap);
			wrap.appendTo(td);
			td.appendTo(tr);
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




