let FormulaParser = require('hot-formula-parser').Parser;
let parser = new FormulaParser();

$(document).ready(function () {

	let add = $("button#add");
	let content = $("#content");
	let save = $("button#save");
	let add_row = $("#table-view-add-row");
	let remove_row = $("#table-view-remove-row");
	let add_row_in = $("#table-view-add-row-in");
	let remove_row_in = $("#table-view-remove-row-in");
	var id = $("#update-table-id").length > 0 ? $("#update-table-id").val() : null;

	let matrix = [];
	let types = [];
	let table_select_types = [];

	let k = null;
	let tableName = null;

	function send(matrix, types, count, name, id = null) {

		let m = [...matrix];

		for (let i = 0; i < m.length; i++) {
			for (let j = 0; j < m[i].length; j++) {
				m[i][j].refer = null;
			}
		}

		if (matrix.length > 0 && types.length > 0 && count && name) {
			let api = $("#api").data('url');
			save.attr('disabled', true);
			$.ajax({
				method: "POST",
				data: {
					data: JSON.stringify({
						matrix,
						types,
						count,
						name,
						id
					})
				},
				url: api ? api : "http://eko.md.uz/api/default/index",
				dataType: "json",
			}).done(function (response) {
				if (response.status == "ok") {
					let url = $("#route").data('url');
					if (url)
						document.location = url;
					else document.location.reload();
				} else {
					save.attr('disabled', false);
				}
			});
		}
	}

	function validation() {
		var hasError = false;
		$("#table input").each(function (i, el) {
			if ($(el).val() == "") {
				$(el).css({
					border: "1px solid #E64320"
				});
				hasError = true;
			} else {
				$(el).css({
					border: "1px solid #ccc"
				});
			}
		});

		$("#types input").each(function (i, el) {
			if ($(el).closest(".form-group").hasClass("active") && $(el).val() == "") {
				$(el).css({
					border: "1px solid #E64320"
				});
				hasError = true;
			} else {
				$(el).css({
					border: "1px solid #ccc"
				});
			}
		});

		let cols = 0;

		if (matrix.length > 0) {
			for (let i = 0; i < matrix[0].length; i++) {
				cols += Number.parseInt(matrix[0][i].colspan);
			}


			if (cols != types.length) {
				hasError = true;
				alert("Количества стобцов у шапки таблицы и тело таблицы должны быть равны");
			}
		}

		return hasError;
	}

	add_row.click(function () {
		let clone = $("#table-view table tbody tr").last().clone();
		clone.appendTo("#table-view table tbody");
		clone.find("span.numberation").text(Number.parseInt(clone.find("span.numberation").text()) + 1);
		clone.find("input").val("");
		clone.find("input, select").each(function (i, el) {
			let name = el.name;
			let type = "";

			if (name.indexOf("[value]") > 0) {
				type = "[value]";
			} else if (name.indexOf("[rowspan]") > 0) {
				type = "[rowspan]";
			} else if (name.indexOf("[colspan]") > 0) {
				type = "[colspan]";
			}

			let parts = name.split("[").join(",").split("][").join(",").split("]").join(",").split(",");
			parts = parts.filter((val) => val != "");

			if (parts.length > 0) {
				el.name = parts[0] + "[" + (Number.parseInt(parts[1]) + 1) + "][" + parts[2] + "]" + type;
			}
		})
	});

	remove_row.click(function () {
		let tr = $("#table-view table tbody tr");

		if (tr.length > 1) {
			tr.last().remove();
		}
	});

	add_row_in.click(function () {
		let clone = $(this).closest("tr").clone();
		$(this).closest("tr").after(clone);
		clone.find("span.numberation").text(Number.parseInt(clone.find("span.numberation").text()) + 1);
		clone.find("input").val("");
		clone.find("input, select").each(function (i, el) {
			let name = el.name;
			let parts = name.split("[").join(",").split("][").join(",").split("]").join(",").split(",");
			parts = parts.filter((val) => val != "");

			if (parts.length > 0) {
				el.name = parts[0] + "[" + (Number.parseInt(parts[1]) + 1) + "][" + parts[2] + "]";
			}
		})
	});

	remove_row_in.click(function () {
		let tr = $("#table-view table tbody tr");

		if (tr.length > 1) {
			tr.last().remove();
		}
	});

	save.click(function () {
		let hasError = validation();

		if ($("#update-table-form").length > 0) {
			let name = $("#update-table-name").val();
			tableName = name;
		}

		if (!hasError)
			send(matrix, types, k, tableName, id);
	});

	add.click(function () {
		let n = $("input#n").val();
		let m = $("input#m").val();
		k = $("input#k").val();
		if (!k || k < 0) {
			k = 99;
		}

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
					type: 3,
					variants: [],
					name: "",
					formula: "",
					table: "",
					isgroup: 1,
					grouptype: 2
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

		let table = $("<table class='table table-striped'>");
		let tbody = $("<tbody>");
		let thead = $("<thead>").appendTo(table);

		let thead_tr = $("<tr>").appendTo(thead);

		for (let k = 0; k < types.length; k++) {
			let td = $('<td class="text-center">').appendTo(thead_tr);
			let close = $('<a href="#!">').html('<i class="fa fa-close"></i>').appendTo(td).click(function () {
				if (types.length > 1) {
					types.splice(k, 1);
					createTypes(types);
				}
			});
			let plus = $('<a href="#!">').html('<i class="fa fa-plus"></i>').appendTo(td).click(function () {
				types.splice(k + 1, 0, {
					type: 1,
					variants: [],
					name: "",
					formula: "",
					table: "",
					isgroup: 1,
					grouptype: 2
				});
				createTypes(types);
			});

		}

		let tr = $("<tr>");

		for (let k = 0; k < types.length; k++) {
			let td = $("<td>");
			let wrap = $('<div class="wrap">');
			let left = $('<div class="left">');
			let form_group_active = $('<div class="form-group active">');
			let form_group_active2 = $('<div class="form-group active">');
			let form_group_active3 = $('<div class="form-group active">'); // for second selectable
			let form_group_active4 = $('<div class="form-group active">'); // for second chechbox
			let form_group_formula = $('<div class="form-group formula ' + (types[k].type == 4 ? "active" : "") + '">');
			let form_group_table = $('<div class="form-group table ' + (types[k].type == 5 ? "active" : "") + '">');
			let table_select = $("<select class='table-select form-control' data-selected='" + types[k].table + "' >").val(types[k].table).change(function () {
				types[k].table = $(this).val();
			});
			let addInput = $('<div class="addInput"></div>');
			let form_group_last_select = $('<div class="form-group last select ' + (types[k].type == 2 ? "active" : "") + '"></div>');
			let a = $('<a href="#!" class="addInput"><i class="fa fa-plus"></i></a>');

			let select = $("<select class='type-select form-control'>").val(types[k].type).change(function () {
				types[k].type = $(this).val();
			});

			let options1 = $('<option value="1" ' + (types[k].type == 1 ? 'selected' : '') + '>number</option>');
			let options2 = $('<option value="2" ' + (types[k].type == 2 ? 'selected' : '') + '>select</option>');
			let options3 = $('<option value="3" ' + (types[k].type == 3 ? 'selected' : '') + '>text</option>');
			let options4 = $('<option value="4" ' + (types[k].type == 4 ? 'selected' : '') + '>formula</option>');
			let options5 = $('<option value="5" ' + (types[k].type == 5 ? 'selected' : '') + '>table</option>');
			let options6 = $('<option value="6" ' + (types[k].type == 6 ? 'selected' : '') + '>date</option>');
			let options7 = $('<option value="7" ' + (types[k].type == 7 ? 'selected' : '') + '>numberation</option>');

			let select2 = $('<select class="form-control" name="grouptype">').val(types[k].grouptype).change(function () {
				types[k].grouptype = $(this).val();
			});

			let opts1 = $('<option value="1" ' + (types[k].grouptype == 1 ? 'selected' : '') + '>%</option>');
			let opts2 = $('<option value="2" ' + (types[k].grouptype == 2 ? 'selected' : '') + '>SUM</option>');
			
			let int1 = $('<input type="checkbox" class="form-control" ' + (types[k].isgroup == 1 ? "checked" : "") + ' name="isgroup" value="1">').click(function () {
				types[k].isgroup = $(this).val();
				if($(this).is(':checked')){
					types[k].isgroup = 1;
				} else {
					types[k].isgroup = 0;
				}
			 });

			opts1.appendTo(select2);
			opts2.appendTo(select2);

			let count = types.length;
			let max = 26;
			let length = count / max;

			let symbol = "";

			if (Number.parseInt(k / max) > 0)
				symbol = String.fromCharCode(65 + Number.parseInt(k / max) - 1);
			else
				symbol = "";


			symbol += String.fromCharCode(65 + (k % max));

			types[k].name = symbol;

			let input1 = $("<input type='text' class='form-control' readonly placeholder='name' name='name'>").val(types[k].name).change(function () { });

			let input2 = $("<input type='text' class='form-control' placeholder='formula'>").val(types[k].formula).change(function () {
				types[k].formula = $(this).val();

			});

			// type for table end

			options3.appendTo(select);
			options1.appendTo(select);
			options2.appendTo(select);
			options4.appendTo(select);
			options5.appendTo(select);
			options6.appendTo(select);
			options7.appendTo(select);

			input2.appendTo(form_group_formula);

			select.appendTo(form_group_active);

			input1.appendTo(form_group_active2);

			select2.appendTo(form_group_active3);

			int1.appendTo(form_group_active4);

			form_group_active2.appendTo(left);
			form_group_active.appendTo(left);
			

			for (let r = 0; types[k].variants && r < types[k].variants.length; r++) {
				let a = $("<input type='text' name='variant' class='form-control' placeholder='variants'>").val(types[k].variants[r]).change(function () {
					types[k].variants[$(this).closest("td").find("input[name=variant]").index(this)] = $(this).val();
				});

				let form_group_select = $('<div class="form-group select item input-group ' + (r == 0 ? ' first ' : '') + (types[k].type == 2 ? "active" : "") + '">');

				a.appendTo(form_group_select);
				$('<span class="input-group-btn"><button class="btn btn-default"><i class="fa fa-minus"></i></button></span>').appendTo(form_group_select);
				form_group_select.appendTo(left);
			}

			if (!types[k].variants || types[k].variants && types[k].variants.length == 0) {
				if (!types[k].variants) types[k].variants = [];

				let a = $("<input type='text' name='variant' class='form-control' placeholder='variants'>").change(function () {
					types[k].variants[$(this).closest("td").find("input[name=variant]").index(this)] = $(this).val();
				});

				let form_group_select = $('<div class="form-group select item input-group first ' + (types[k].type == 2 ? "active" : "") + '">');

				a.appendTo(form_group_select);
				$('<span class="input-group-btn"><button class="btn btn-default"><i class="fa fa-minus"></i></button></span>').appendTo(form_group_select);
				form_group_select.appendTo(left);
			}

			form_group_formula.appendTo(left);
			table_select.appendTo(form_group_table);
			form_group_table.appendTo(left);
			addInput.appendTo(left);

			a.appendTo(form_group_last_select);
			form_group_last_select.appendTo(left);
			form_group_active3.appendTo(left);
			form_group_active4.appendTo(left);

			left.appendTo(wrap);
			wrap.appendTo(td);
			td.appendTo(tr);
		}

		tr.appendTo(tbody);
		tbody.appendTo(table);
		table.appendTo("div#types");

		if (table_select_types.length == 0) {
			$.ajax({
				method: "POST",
				url: "http://eko.md.uz/api/default/tables"
			}).done(function (response) {
				table_select_types = response;

				$(".table-select").each(function (i, el) {
					for (let z1 = 0; z1 < table_select_types.length; z1++) {
						$opt = $('<option value="' + table_select_types[z1] + '" ' + ($(el).data("selected") == table_select_types[z1] ? 'selected' : '') + '>' + table_select_types[z1] + '</option>');
						$opt.appendTo($(el));
					}
				});
			});
		}
	}

	function normalize(matrix, min = false) {
		var max = null;
		var sums = new Array(matrix.length).fill(0);

		for (let i = 0; i < matrix.length; i++) {

			for (let j = 0; j < matrix[i].length; j++) {
				sums[i] += Number.parseInt(matrix[i][j].colspan);

				if (Number.parseInt(matrix[i][j].rowspan) > 1) {
					for (let u = i + 1; u <= i + Number.parseInt(matrix[i][j].rowspan) - 1; u++) {
						sums[u] += Number.parseInt(matrix[i][j].colspan);
					}
				}
			}
		}

		if (!min) {
			max = Math.max(...sums);

			for (let i = 0; i < sums.length; i++) {
				if (sums[i] != max) {
					for (let k = 0; k < max - sums[i]; k++) {
						matrix[i].push({
							name: "",
							rowspan: 1,
							colspan: 1,
						})
					}
				}
			}
		} else {
			max = Math.min(...sums);

			for (let i = 0; i < sums.length; i++) {

				if (sums[i] > max) {
					for (let k = 0; k < sums[i] - max; k++) {
						if (matrix[i][matrix[i].length - 1]) {
							if (matrix[i][matrix[i].length - 1].colspan == 1)
								matrix[i].pop();
							else
								matrix[i][matrix[i].length - 1].colspan--;
						}
					}
				}
			}
		}
	}

	function createTable(matrix, min = false) {
		normalize(matrix, min);

		$("div#table").html("");

		let table = $("<table class='table table-striped'>");
		let tbody = $("<tbody>").appendTo(table);

		for (let i = 0; i < matrix.length; i++) {
			let tr = $("<tr>");

			for (let j = 0; j < matrix[i].length; j++) {
				let td = $("<td tabindex='1'>").attr("colspan", matrix[i][j].colspan).attr("rowspan", matrix[i][j].rowspan);

				matrix[i][j].refer = td.get(0);

				let span = $('<input>').val(matrix[i][j].name).change(function () {
					matrix[i][j].name = $(this).val();
				});

				span.appendTo(td);
				td.appendTo(tr);

				let tool = $("<div class='icons'>").appendTo(td);
				let x = $("<span>x</span>").appendTo(tool);

				$('<a href="#!">').html('<i class="fa fa-plus">').click(function () {
					matrix[i].splice(j + 1, 0, {
						name: "",
						rowspan: matrix[i][j].rowspan,
						colspan: 1,
					});
					createTable(matrix);
				}).appendTo(tool);

				$('<a href="#!">').html('<i class="fa fa-close tool-close">').click(function () {
					for (let t = 0; t < matrix.length; t++) {
						for (let y = 0; y < matrix[t].length; y++) {
							if (matrix.length > 1 && matrix[t].length > 1)
								if (matrix[t][y].refer == $(this).closest("td").get(0)) {
									if (matrix[t][y].colspan == 1)
										matrix[t].splice(y, 1);
									else
										matrix[t][y].colspan--;

									createTable(matrix, true);
								}
						}
					}

				}).appendTo(tool);

				if (j != matrix[i].length - 1) {
					let right = $("<a>").html('<i class="fa fa-arrow-right"></i>').click(function () {
						for (let t = 0; t < matrix.length; t++) {
							if (matrix[t][j + 1] && i - t == Number.parseInt(matrix[t][j + 1].rowspan) - 1) {
								matrix[t][j + 1].rowspan--;
							}
						}

						let next = matrix[i][j + 1];

						matrix[i][j].colspan = Number.parseInt(matrix[i][j].colspan) + Number.parseInt(next.colspan);

						for (let a = i; a <= i + Number.parseInt(matrix[i][j].rowspan) - 1; a++) {
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

						for (let a = i; a < i + Number.parseInt(matrix[i][j].rowspan); a++) {
							matrix[a].push({
								name: "",
								rowspan: 1,
								colspan: 1,
							});
						}

						createTable(matrix);
					}).appendTo(tool);
				}

				if (Number.parseInt(matrix[i][j].rowspan) > 1) {
					let up = $("<a>").html('<i class="fa fa-arrow-up"></i>').click(function () {
						matrix[i][j].rowspan--;
						for (let a = 0; a < Number.parseInt(matrix[i][j].colspan); a++) {
							matrix[i + Number.parseInt(matrix[i][j].rowspan)].push({
								name: "",
								rowspan: 1,
								colspan: 1,
							});
						}

						createTable(matrix);
					}).appendTo(tool);
				}

				if (i + Number.parseInt(matrix[i][j].rowspan) - 1 != matrix.length - 1) {
					let down = $("<a>").html('<i class="fa fa-arrow-down"></i>').click(function () {
						for (let a = 0; a < Number.parseInt(matrix[i][j].colspan); a++) {
							let element = matrix[i + Number.parseInt(matrix[i][j].rowspan)];
							if (element) {
								element.pop();
							}
						}

						matrix[i][j].rowspan++;

						createTable(matrix);
					}).appendTo(tool);
				}
			}

			tr.appendTo(tbody);
		}

		table.appendTo("div#table");

		let add_row = $('<a href="#!" class="btn btn-default">').html('Добавить строку <i class="fa fa-plus"></i>').click(function () {
			matrix.push([]);
			createTable(matrix);
		}).appendTo("div#table");
		let remove_row = $('<a href="#!" class="btn btn-default">').html('Удалить строку <i class="fa fa-close"></i>').click(function () {
			matrix.pop();
			createTable(matrix);
		}).appendTo("div#table");
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

	function custom_formula() {
		for (let i = 0; i < 2; i++)
			$(".custom-formula").each(function (i, el) {
				let formula = $(el).data("custom-formula") + "";

				if (formula.startsWith("=")) {
					formula = formula.replace("=", "");
				}

				while (formula.match(/SUM\((.*?)\)/)) {
					let sum = 0;
					let res = formula.match(/SUM\((.*?)\)/);

					if (res && res.length > 1) {
						let cellstring = res[1];

						let cells = cellstring.split(":");

						if (cells.length > 1) {
							let [first, second] = cells;

							let symbols = first.match(/[A-Z]+/) ? first.match(/[A-Z]+/)[0] : null;
							let begin = first.match(/[0-9]+/) ? first.match(/[0-9]+/)[0] : null;
							let end = second.match(/[0-9]+/) ? second.match(/[0-9]+/)[0] : null;

							for (let i = Number.parseInt(begin); i <= Number.parseInt(end); i++) {
								let value = $("input[data-cell-name=" + (symbols + i) + "]").val();

								if (value) {
									sum += Number.parseFloat(value);
								}
							}
						}
					}

					formula = formula.replace(/SUM\((.*?)\)/, sum);
				}

				$("[data-cell-name]").each(function (i, el) {
					let name = $(el).data("cell-name");

					if (name) {
						let letter = name.match(/[A-Z]+/) ? name.match(/[A-Z]+/)[0] : null;
						let num = name.match(/[0-9]+/) ? Number.parseInt(name.match(/[0-9]+/)[0]) - 1 : null;

						let variable = "";

						if (Number.parseInt(num / 26) > 0)
							variable = String.fromCharCode(97 + Number.parseInt(num / 26) - 1);
						else
							variable = "";

						variable += String.fromCharCode(97 + (num % 26));

						variable = letter + variable;

						var value = $(el).val();

						if (value) {
							parser.setVariable(variable, Number.parseFloat(value));
							formula = formula.replace(name, variable);
						}
					}
				});

				let answer = parser.parse(formula);

				if (!answer.error) {
					$(el).val(answer.result).trigger('change');
					let url_string = window.location.href;
					let url = new URL(url_string);

					let table_id = url.searchParams.get("table_id");
					let collection_id = url.searchParams.get("collection_id");

					$.ajax({
						method: "POST",
						url: "http://eko.md.uz/api/default/set-value",
						data: {
							[$(el).attr('name')]: $(el).val(),
							table_id,
							collection_id
						}
					}).done(function (res) {
					});
				} else {
					$(el).val("");
				}
			});
	}

	$(document).on('change', '.byhand', function () {
		custom_formula();
	});

	custom_formula();

	$('#cabinet-view .number-input').each(function (i, element) {
		let _this = element;

		$(this).closest("tr").find('.formula-input').each((i, el) => {
			$(_this).closest("tr").find('.number-input').each((i, el) => {
				let name = $(el).data("name");

				let value = $(el).val();

				if (name)
					parser.setVariable(name, value);
			});

			let formula = $(el).data("formula");

			if (formula) {
				let res = parser.parse(formula);

				if (!res.error){
					$(el).val(res.result);
					let url_string = window.location.href;
					let url = new URL(url_string);

					let table_id = url.searchParams.get("table_id");
					let collection_id = url.searchParams.get("collection_id");

					$.ajax({
						method: "POST",
						url: "http://eko.md.uz/api/default/set-value",
						data: {
							[$(el).attr('name')]: $(el).val(),
							table_id,
							collection_id
						}
					}).done(function (res) {
					});
				}
				else
					$(el).val("");
			}
		});

	});

	$(document).on('change', '.number-input', function () {
		let _this = this;

		$(this).closest("tr").find('.formula-input').each((i, el) => {
			$(_this).closest("tr").find('.number-input').each((i, el) => {
				let name = $(el).data("name");

				let value = $(el).val();

				if (name)
					parser.setVariable(name, value);
			});

			let formula = $(el).data("formula");

			if (formula) {
				let res = parser.parse(formula);

				if (!res.error){
					$(el).val(res.result);
					
					let url_string = window.location.href;
					let url = new URL(url_string);

					let table_id = url.searchParams.get("table_id");
					let collection_id = url.searchParams.get("collection_id");

					$.ajax({
						method: "POST",
						url: "http://eko.md.uz/api/default/set-value",
						data: {
							[$(el).attr('name')]: $(el).val(),
							table_id,
							collection_id
						}
					}).done(function (res) {
					});
				}
				else
					$(el).val("");
			}
		});

	});


});
