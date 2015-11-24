$(function () {

    // DEMO DROPDOWN 1 ---------------------------------------------------------
    $("#demo_drop1").jui_dropdown({
        launcher_id: 'launcher1',
        launcher_container_id: 'launcher1_container',
        menu_id: 'menu1',
        containerClass: 'container1',
        menuClass: 'menu1',
        onSelect: function (event, data) {
            $("#result").text('index: ' + data.index + ' (id: ' + data.id + ')');
        }
    });




    // Vet Slider
    jQuery('.vet_slider .thumbs').autoscroll({
        scrollOnClick: false
    });
    jQuery('.vet_images ul').cycle({
        easing: 'easeOutBack',
        delay: -4000,
        pager: '.vet_slider .thumbs ul',
        pagerAnchorBuilder: function (id, slide) {
            var img = $("img", slide);
            return "<li><img src='" + img.attr("src") + "' /></li>";
        }
    });

    jQuery(".nav_bar .nav_next").click(function () {
        jQuery('.vet_images ul').cycle('next');
    });
    jQuery(".nav_bar .nav_prev").click(function () {
        jQuery('.vet_images ul').cycle('prev');
    });



    //watermark
    $('#SearchFormContainer input[type="text"]').watermark('Enter Your Search here');
    $('input[type="text"]#SubscripeField').watermark('Enter your e-mail to subscripe');
    $('#LightBox input[type="text"]').watermark('Enter your Username');
    $('#LightBox input[type="password"]').watermark('Enter your Password');


    //validate
    $("#SubcribeForm").validate();


    //tabs
    $('#tabs').tabs();

    //Countdown
    $(function () {
        var austDay = new Date();
        austDay = new Date(austDay.getFullYear() + 1, 1 - 1, 26);
        $('#defaultCountdown').countdown({ until: austDay });
    });

    
    //LightBox
    $(document).ready(function () {

        $('.lightbox').click(function () {
            $('.backdrop, .Light_box').animate({ 'opacity': '.50' }, 300, 'linear');
            $('.Light_box').animate({ 'opacity': '1.00' }, 300, 'linear');
            $('.backdrop, .Light_box').css('display', 'block');
        });

        $('.close').click(function () {
            close_box();
        });

        $('.backdrop').click(function () {
            close_box();
        });

    });

    function close_box() {
        $('.backdrop, .Light_box').animate({ 'opacity': '0' }, 300, 'linear', function () {
            $('.backdrop, .Light_box').css('display', 'none');
        });
    }



// End of the main functions
});