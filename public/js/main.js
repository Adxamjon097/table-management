$(document).ready(function() {

	var addInput = $("#types a.addInput");
	addInput.click(function() {
		$("<div class='form-group select active'> <input type='text' class='form-control' placeholder='variant'> </div>").appendTo('#types div.addInput');
	});

	$("#select").change(function() {
		var data = $(this).val();
		switch (+data) {
			case 1:
				$("#types div.form-group.select").removeClass('active');
				$("#types div.form-group.formula").removeClass('active');
				$("#types div.form-group.table").removeClass('active');
				break;
			case 2:
				$("#types div.form-group.select").addClass('active');
				$("#types div.form-group.formula").removeClass('active');
				$("#types div.form-group.table").removeClass('active');
				break;
			case 3: 
				$("#types div.form-group.select").removeClass('active');
				$("#types div.form-group.formula").removeClass('active');
				$("#types div.form-group.table").removeClass('active');
				break;
			case 4:
				$("#types div.form-group.formula").addClass('active');
				$("#types div.form-group.select").removeClass('active');
				$("#types div.form-group.table").removeClass('active');
				break;
			case 5:
				$("#types div.form-group.table").addClass('active');
				$("#types div.form-group.select").removeClass('active');
				$("#types div.form-group.formula").removeClass('active');
				break;
		}
	});

});




