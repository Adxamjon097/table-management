$(document).ready(function() {

	$(document).on('click', "#types a.addInput", function() {
		$("<div class='form-group select active'> <input type='text' class='form-control' placeholder='variant'> </div>")
		.appendTo($(this).closest('td').find('div.addInput'));
	});

	$(document).on('change', '#select', function(){
		console.log(11);
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
		}
	});


});




