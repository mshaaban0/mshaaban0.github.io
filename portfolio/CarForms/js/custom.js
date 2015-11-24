$(document).ready(function() {

	docHeight = function(){
		$('body').height($(document).height());
	};

	initHelp = function (){
		$('#initHelpBtn').on('click', function(){
			$('.help-con').slideToggle();
		});
	};
	initHelp();
});