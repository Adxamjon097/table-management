$(document).ready(function () {

	let add = $("button#add");
	let content = $("#content");
	let save = $("#save");
	var id = $("#update-table-id").length > 0 ? $("#update-table-id").val() : null;

	let matrix = [];
	let types = [];
	let table_select_types = [];

	let k = null;
	let tableName = null;

	function send(matrix, types, count, name, id = null) {
		if (matrix.length > 0 && types.length > 0 && count && name) {
			$.ajax({
				method: "POST",
				data: {
					matrix,
					types,
					count,
					name,
					id
				},
				url: "http://eko.md.uz/api/default/index"
			}).done(function (response) {
				if (response.status == "ok") {
					// document.location = $("#route").data('url');
				}
			});
		}
	}

	function validation() {
		var hasError = false;

		$("#table input").each(function (i, el) {
			if ($(el).val() == "") {
				$(el).css({
					border: "1px solid red"
				});
				hasError = true;
			} else {
				$(el).css({
					border: "1px solid transparent"
				});
			}
		});

		$("#types input").each(function (i, el) {
			if ($(el).closest(".form-group").hasClass("active") && $(el).val() == "") {
				$(el).css({
					border: "1px solid red"
				});
				hasError = true;
			} else {
				$(el).css({
					border: "1px solid #ccc"
				});
			}
		});

		return hasError;
	}

	save.click(function () {
		let hasError = validation();

		if (!hasError)
			send(matrix, types, k, tableName, id);
	});

	add.click(function () {
		let n = $("input#n").val();
		let m = $("input#m").val();
		k = $("input#k").val();
		tableName = $("input#table-name").val();

		if (n && m && k && n > 0 && m > 0 && k > 0 && tableName && tableName != "") {

			content.show();

			matrix = [];
			types = [];

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
					type: 1,
					variants: [],
					name: "",
					formula: "",
					table: "",
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
			let form_group_formula = $('<div class="form-group formula ' + (types[k].type == 4 ? "active" : "") + '">');
			let form_group_table = $('<div class="form-group table ' + (types[k].type == 5 ? "active" : "") + '">');
			let addInput = $('<div class="addInput"></div>');
			let form_group_last_select = $('<div class="form-group last select ' + (types[k].type == 2 ? "active" : "") + '"></div>');
			let a = $('<a href="#!" class="addInput"><i class="fa fa-plus"></i></a>');

			let select_table = $("<select class='form-control table-select'>").val(types[k].table).change(function () {
				
				types[k].table = $(this).val();
				console.log(types);
			});

			let select = $("<select class='type-select form-control'>").val(types[k].type).change(function () {
				types[k].type = $(this).val();
				if(table_select_types.length == 0){
					$.ajax({
						method: "POST",
						url: "http://eko.md.uz/api/default/tables"
					}).done(function (response) {
						
						table_select_types = response;
						console.log(table_select_types);
						for (let z1 = 0; z1 < table_select_types.length; z1++) {
							$opt = $('<option value=" ' + table_select_types[z1] + ' " >' + table_select_types[z1] + ' </option>');
							$opt.appendTo($(".table-select"));
							console.log(table_select_types[z1]);
						}
					});
				}
				
				
				
			});
			// type for table
			

			// let options_table1 = $('<option value="1" ' + (types[k].type == 1 ? 'selected' : '') + '>select1</option>');
			// let options_table2 = $('<option value="2" ' + (types[k].type == 2 ? 'selected' : '') + '>select2</option>');
			// let options_table3 = $('<option value="3" ' + (types[k].type == 3 ? 'selected' : '') + '>select3</option>');

			// options_table1.appendTo(select_table);
			// options_table2.appendTo(select_table);
			// options_table3.appendTo(select_table);

			// type for table end

			let options1 = $('<option value="1" ' + (types[k].type == 1 ? 'selected' : '') + '>number</option>');
			let options2 = $('<option value="2" ' + (types[k].type == 2 ? 'selected' : '') + '>select</option>');
			let options3 = $('<option value="3" ' + (types[k].type == 3 ? 'selected' : '') + '>text</option>');
			let options4 = $('<option value="4" ' + (types[k].type == 4 ? 'selected' : '') + '>formula</option>');
			let options5 = $('<option value="5" ' + (types[k].type == 5 ? 'selected' : '') + '>table</option>');
			let options6 = $('<option value="6" ' + (types[k].type == 6 ? 'selected' : '') + '>date</option>');
			let options7 = $('<option value="7" ' + (types[k].type == 7 ? 'selected' : '') + '>numberation</option>');

			let input1 = $("<input type='text' class='form-control' placeholder='name'>").val(types[k].name).change(function () {
				types[k].name = $(this).val();

			});

			let input2 = $("<input type='text' class='form-control' placeholder='formula'>").val(types[k].formula).change(function () {
				types[k].formula = $(this).val();

			});
			

			options1.appendTo(select);
			options2.appendTo(select);
			options3.appendTo(select);
			options4.appendTo(select);
			options5.appendTo(select);
			options6.appendTo(select);
			options7.appendTo(select);

			input2.appendTo(form_group_formula);

			select.appendTo(form_group_active);

			input1.appendTo(form_group_active2);

			select_table.appendTo(form_group_table);

			form_group_active2.appendTo(left);
			form_group_active.appendTo(left);

			for (let r = 0; types[k].variants && r < types[k].variants.length; r++) {
				let a = $("<input type='text' name='variant' class='form-control' placeholder='variants'>").val(types[k].variants[r]).change(function () {
					types[k].variants[$(this).closest("td").find("input[name=variant]").index(this)] = $(this).val();
					console.log(types[k].variants);
				});

				let form_group_select = $('<div class="form-group select item input-group ' + (r == 0 ? ' first ' : '') + (types[k].type == 2 ? "active" : "") + '">');

				a.appendTo(form_group_select);
				$('<span class="input-group-btn"><button class="btn btn-default"><i class="fa fa-minus"></i></button></span>').appendTo(form_group_select);
				form_group_select.appendTo(left);
			}

			if (!types[k].variants || types[k].variants && types[k].variants.length == 0) {
				let a = $("<input type='text' name='variant' class='form-control' placeholder='variants'>").change(function () {
					types[k].variants[$(this).closest("td").find("input[name=variant]").index(this)] = $(this).val();
					console.log(types[k].variants);
				});

				let form_group_select = $('<div class="form-group select item input-group first ' + (types[k].type == 2 ? "active" : "") + '">');

				a.appendTo(form_group_select);
				$('<span class="input-group-btn"><button class="btn btn-default"><i class="fa fa-minus"></i></button></span>').appendTo(form_group_select);
				form_group_select.appendTo(left);
			}

			form_group_formula.appendTo(left);
			form_group_table.appendTo(left);
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
						y: matrix[i].length
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
				let td = $("<td tabindex='1'>").attr("colspan", matrix[i][j].colspan).attr("rowspan", matrix[i][j].rowspan);
				let span = $('<input>').val(matrix[i][j].name).change(function () {
					matrix[i][j].name = $(this).val();
					console.log(matrix[i][j].name);
				});
				span.appendTo(td);
				td.appendTo(tr);

				let tool = $("<div class='icons'>").appendTo(td);
				let x = $("<span>x</span>").appendTo(tool);

				if (j != matrix[i].length - 1) {
					let right = $("<a>").html('<i class="fa fa-arrow-right"></i>').click(function () {
						for (let t = 0; t < matrix.length; t++) {
							if (matrix[t][j + 1] && i - t == matrix[t][j + 1].rowspan - 1) {
								matrix[t][j + 1].rowspan--;
							}
						}

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
								y: matrix[a].length
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
								y: matrix[i + matrix[i][j].rowspan].length
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

	if ($("#update-table-form").length > 0) {
		let matrix_json = $("#update-table-matrix-json").val();

		let types_json = $("#update-table-types-json").val();
		let count = $("#update-table-count").val();
		let name = $("#update-table-name").val();

		matrix = JSON.parse(matrix_json);
		types = JSON.parse(types_json);

		k = count;
		tableName = name;

		createTable(matrix);
		createTypes(types);
	}
});