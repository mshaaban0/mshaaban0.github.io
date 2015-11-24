$(document).ready(function(){
	$('.social-top a').tooltip();

	positionHeader = function(){
		headrPosition = ($(document).width() - $('header').width() ) / 2  - 15;
		$('header,.top_header').css('left', headrPosition + 'px');
	};
	
	positionHeader();
    
	var conWidth = document.body.clientWidth;
	var animateWidth = conWidth / 2.3;

	var animationOne = function(){
		$('.png-animate').animate({top:'16%',right:headrPosition}, 700, 'easeOutBack', function(){
                $('.animate-step-1').animate({opacity:1},500, function(){
                    $('.animate-step-2').animate({left:0},500, function(){
                        $('.animate-step-3').animate({opacity:1},500,function(){
                            $('.animate-step-4').animate({opacity:1,top:155},500,'easeOutBack');
                        });
                    });     
                }); 
            });
	};
	

	$('.animate-style-scale').animate({opacity:1, width: 360, height: 360},1000,'easeOutBounce');

	$('.bxslider').bxSlider({
        mode:'horizontal',
        onSliderLoad: function(){
            animationOne();
        }//End of onSliderLoad
    });//End of bxSlider


});
//End of Doc.Ready

$(window).resize(function(){
	positionHeader();
});


