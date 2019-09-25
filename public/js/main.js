$(document).ready(function () {

	$(document).on('click', "#types a.addInput", function () {
		$(this).closest('td').find(".item").first().clone(true, true).removeClass("first").insertAfter($(this).closest('td').find(".item").last()).find("input").val("");
	});

	$(document).on('click', "#table div.icons span", function () {
		$(this).parent("div.icons").fadeOut(300);
	});

	$(document).on('focus', '#table table tr td input', function () {
		$(this).siblings('div.icons').fadeIn(300);
		$('div.icons').not($(this).siblings('div.icons')).fadeOut(300);
	});

	$("#types button.btn").click(function () {
		$(this).closest(".item").remove();
	});

	$(document).on('change', '.type-select', function () {
		initSelect(this);
	});

	$(document).on('blur', '#table input', function (){
		if ($(this).val() == "") {
			$(this).css({
				border: "1px solid red"
			});
		} else {
			$(this).css({
				border: "1px solid transparent"
			});
		}
	})

	$(document).on('blur', '#types input', function (){
		if ($(this).val() == "") {
			$(this).css({
				border: "1px solid red"
			});
		} else {
			$(this).css({
				border: "1px solid #ccc"
			});
		}
	})

	function initSelect(_this) {

		var data = $(_this).val();
		switch (+data) {
			case 1:
				$(_this).closest('td').find("div.form-group.select").removeClass('active');
				$(_this).closest('td').find("div.form-group.formula").removeClass('active');
				$(_this).closest('td').find("div.form-group.table").removeClass('active');
				break;
			case 2:
				$(_this).closest('td').find("div.form-group.select").addClass('active');
				$(_this).closest('td').find("div.form-group.formula").removeClass('active');
				$(_this).closest('td').find("div.form-group.table").removeClass('active');
				break;
			case 3:
				$(_this).closest('td').find("div.form-group.select").removeClass('active');
				$(_this).closest('td').find("div.form-group.formula").removeClass('active');
				$(_this).closest('td').find("div.form-group.table").removeClass('active');
				break;
			case 4:
				$(_this).closest('td').find("div.form-group.formula").addClass('active');
				$(_this).closest('td').find("div.form-group.select").removeClass('active');
				$(_this).closest('td').find("div.form-group.table").removeClass('active');
				break;
			case 5:
				$(_this).closest('td').find("div.form-group.table").addClass('active');
				$(_this).closest('td').find("div.form-group.select").removeClass('active');
				$(_this).closest('td').find("div.form-group.formula").removeClass('active');
				break;
			case 6:
				$(_this).closest('td').find("div.form-group.select").removeClass('active');
				$(_this).closest('td').find("div.form-group.formula").removeClass('active');
				$(_this).closest('td').find("div.form-group.table").removeClass('active');
				break;
			case 7:
				$(_this).closest('td').find("div.form-group.select").removeClass('active');
				$(_this).closest('td').find("div.form-group.formula").removeClass('active');
				$(_this).closest('td').find("div.form-group.table").removeClass('active');
				break;
		}
	}


});




