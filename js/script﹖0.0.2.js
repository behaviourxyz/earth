/*! project-name v0.0.1 | (c) 2019 YOUR NAME | MIT License | http://link-to-your-git-repo.com */
(function (root, $, undefined) {
    /*------------------------------------*\
        VARIABLE DECLARATION
    \*------------------------------------*/
    var $c_div = $('.circle-cursor');
    var cursor_timer;
    var resize_small_once = true;

    var $landing_text = $('.header-info, .header-menu');
    var $project_title = $('.header-project-name');
    var $project_c_slide = $('.header-project-counter-c-slide');
    var $project_t_slides = $('.header-project-counter-t-slides');

    var myFullpage;

    var can_resize = true;

    var cursor_size = 20;

    /*------------------------------------*\
        CALL TO FUNCTIONS
    \*------------------------------------*/
    $((function () {

        console.log(
            '<!-- ----------------------------------------------------- -->\n' +
            '<!-- Code by David Penuela, http://davidpenuela.com (2019) -->\n' +
            '<!-- ----------------------------------------------------- -->');

        if(isSmallScreen() || isMobile()){

        }else{
            setupCursorInteraction();
        }

        setupFullPage();
    }));

    /*------------------------------------*\
    GENERAL
    \*------------------------------------*/

    function setupCursorInteraction() {
        $(window).on('mousemove', (function (ev) {
            // console.log(ev.pageX,ev.pageY);

            $c_div.css({
                "top": (ev.pageY),
                "left": (ev.pageX)
                // "transform": "translate("+ (ev.pageX-15) + "px, " + (ev.pageY-15) + "px)"

            });

            if (resize_small_once) {
                resize_small_once = false;
                setCursorSize(cursor_size, cursor_size);
            }

            clearTimeout(cursor_timer);
            cursor_timer = setTimeout((function () {

                setCursorSize($(window).width() * 0.8, $(window).width() * 0.8);
                //
                resize_small_once = true;

                setTimeout((function () {
                    // $c_div.css({
                    //     "top": "50%",
                    //     "left": "50%",
                    // });
                }), 1000);

            }), 3000);

        })).on('mouseleave', (function () {
            // console.log(ev);
        }));

        $(window).on('click', (function (ev) {
            // console.log(ev.pageX,ev.pageY);

            $c_div.css({
                "top": (ev.pageY),
                "left": (ev.pageX)

                 // "transform": "translate3d("+ (ev.pageX-45) + ", " + (ev.pageY-45) + ",0)"

            });

            if (resize_small_once) {
                resize_small_once = false;
                setCursorSize(cursor_size, cursor_size);
            }

            clearTimeout(cursor_timer);
            cursor_timer = setTimeout((function () {

                setCursorSize($(window).width() * 0.8, $(window).width() * 0.8);
                //
                resize_small_once = true;

                setTimeout((function () {
                    // $c_div.css({
                    //     "top": "50%",
                    //     "left": "50%",
                    // });
                }), 1000);

            }), 3000);
        }));

        setTimeout((function(){
            $('.fp-controlArrow').on('mouseover', (function (ev) {
                $c_div.css({
                    'background-color':'black'
                });

            })).on('mouseleave', (function () {
                $c_div.css({
                    'background-color':'#ebff00'
                });

            }));
        }),2000);

    }

    function setCursorSize(wid, hei) {
        // console.log('setSize', wid, hei);
        if(can_resize){
            $c_div.css({
                width: wid,
                height: hei
            });
        }else{
            $c_div.css({
                width: cursor_size,
                height: cursor_size
            });

        }
    }

    function setupFullPage() {
        myFullpage = new fullpage('#fullpage', {
            licenseKey: '0C56F670-8E5745EA-A2A43A92-D15A60F9',
            //anchors: ['firstPage', 'secondPage', '3rdPage'],
            sectionsColor: ['#ffffff', '#ffffff', '#ffffff'],
            css3: true,
            scrollingSpeed: 700,
            //events
            onLeave: function (origin, destination, direction) {
                // console.log(origin, destination);
                clearTimeout(cursor_timer);
                if (destination.index == 0) {
                    showLanding();
                    can_resize = true;

                    cursor_timer = setTimeout((function () {
                        setCursorSize($(window).width() * 0.8, $(window).width() * 0.8);
                        resize_small_once = true;
                    }), 3000);
                }
                if(destination.index != 0){
                    setProjectTitle(destination);
                    setCursorSize(cursor_size, cursor_size);
                    can_resize = false;
                }else{
                   hideProjectTitle();
                }
                if (origin.index == 0) {
                    hideLanding();
                }


            },
            afterLoad: function (origin, destination, direction) {
            },
            afterRender: function () {
            },
            afterResize: function (width, height) {
            },
            afterReBuild: function () {
            },
            afterResponsive: function (isResponsive) {
            },
            afterSlideLoad: function (section, origin, destination, direction) {

            },
            onSlideLeave: function (section, origin, destination, direction) {
                clearTimeout(cursor_timer);
                $project_c_slide.html(destination.index+1);
            },

            fadingEffect: 'slides',
            fadingEffectKey: 'c3RodXRoaXJhbWVzaC5jb21fblNXWm1Ga2FXNW5SV1ptWldOMFk2dg=='
        });

        $('.header-name').on('click',(function(){
            myFullpage.moveTo(1);
        }));

        $('.header-menu-toggle').on('click',(function(){
            myFullpage.moveTo(2);
        }));
    }

    /*------------------------------------*\
    Secondary Methods
    \*------------------------------------*/

    function showLanding(){
        $landing_text.removeClass('hide');
    }

    function hideLanding(){
        $landing_text.addClass('hide');
    }

    function setProjectTitle(destination){
        // console.log($(destination.item).find('.fp-slidesContainer').find('.active'));
        // console.log($(destination.item).find('.fp-slidesContainer').find('.active').index());
        // console.log($(destination.item).find('.slide').length);
        // console.log($(destination.item).data('project-title'));
        $project_title.html($(destination.item).data('project-title'));
        $project_c_slide.html(($(destination.item).find('.fp-slides').find('.active').index()+1));
        $project_t_slides.html($(destination.item).find('.slide').length);
        setTimeout((function(){
            $('.header-project').addClass('active');
        }),300);

    }

    function hideProjectTitle(){
        $('.header-project').removeClass('active');
    }

    function resetSliderToZero(origin){
        // console.log(origin);
        // console.log(origin.index);

        setTimeout((function () {
            // var section = origin;
            //if the section we are leaving has slides...
            // if (section.find('.slide').length) {
                //moving to slide 0

                // silentMoveTo('firstSlide', 2);
            // }
        }), 800);
    }

    /*------------------------------------*\
    JQUERY Events
    \*------------------------------------*/


    //Resize
    $(document).resize((function () {
    }));
    //Scroll
    $(document).scroll((function () {

    }));


    /*------------------------------------*\
    Extra Methods
    \*------------------------------------*/


    function isSmallScreen() {
        if ($(window).width() > 991) {
            return false;
        } else {
            return true;
        }
    }

    function isMobile() {
        if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4)))
        // if(/Mobi/.test(navigator.userAgent))
        {
            return true;
        }
        else {
            return false;
        }
    }

}(this, jQuery));
