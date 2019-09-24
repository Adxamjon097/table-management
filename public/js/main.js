$(document).ready(function () {

	$(document).on('click', "#types a.addInput", function () {
		$(this).closest('td').find(".item").first().clone(true, true).insertAfter($(this).closest('td').find(".item").last());
	});

	$(document).on('click', "#table div.icons span", function() {
		$(this).parent("div.icons").fadeOut(300);
	});

	$(document).on('focus', '#table table tr td input', function() {
		$(this).siblings('div.icons').fadeIn(300);
		$('div.icons').not($(this).siblings('div.icons')).fadeOut(300);
	});

	$(document).on('change', '#select', function(){

		var data = $(this).val();
		switch (+data) {
			case 1:
				$(this).closest('td').find("div.form-group.select").removeClass('active');
				$(this).closest('td').find("div.form-group.formula").removeClass('active');
				$(this).closest('td').find("div.form-group.table").removeClass('active');
				break;
			case 2:
				$(this).closest('td').find("div.form-group.select").addClass('active');
				$(this).closest('td').find("div.form-group.formula").removeClass('active');
				$(this).closest('td').find("div.form-group.table").removeClass('active');
				break;
			case 3:
				$(this).closest('td').find("div.form-group.select").removeClass('active');
				$(this).closest('td').find("div.form-group.formula").removeClass('active');
				$(this).closest('td').find("div.form-group.table").removeClass('active');
				break;
			case 4:
				$(this).closest('td').find("div.form-group.formula").addClass('active');
				$(this).closest('td').find("div.form-group.select").removeClass('active');
				$(this).closest('td').find("div.form-group.table").removeClass('active');
				break;
			case 5:
				$(this).closest('td').find("div.form-group.table").addClass('active');
				$(this).closest('td').find("div.form-group.select").removeClass('active');
				$(this).closest('td').find("div.form-group.formula").removeClass('active');
				break;
			case 6:
				$(this).closest('td').find("div.form-group.select").removeClass('active');
				$(this).closest('td').find("div.form-group.formula").removeClass('active');
				$(this).closest('td').find("div.form-group.table").removeClass('active');
				break;
		}
	});


});




