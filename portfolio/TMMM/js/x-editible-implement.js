$(document).ready(function() {
    //toggle `popup` / `inline` mode
    $.fn.editable.defaults.mode = 'inline';     
    
    //make username editable
    //$('#username').editable({showbuttons: true, inputclass: "input-medium form-control"});
	//editables 
    $('#username').editable({
			showbuttons: true, inputclass: "input-medium form-control",
           url: '/post',
           type: 'text',
           pk: 1,
           name: 'username',
           title: 'Enter username'
    });
});