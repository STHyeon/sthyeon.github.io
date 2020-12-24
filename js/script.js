$(function () {
    // slick
    $('.slick-wrapper').slick({
        // centerMode: true,
        // centerPadding: 30,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: true,
        prevArrow: $('.btn_slick_prev'),
        nextArrow: $('.btn_slick_next'),
        responsive: [
            // 반응형 웹 구현 옵션
            {
                breakpoint: 1100, //화면 사이즈 960px
                settings: {
                    //위에 옵션이 디폴트 , 여기에 추가하면 그걸로 변경
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 694, //화면 사이즈 768px
                settings: {
                    //위에 옵션이 디폴트 , 여기에 추가하면 그걸로 변경
                    slidesToShow: 1
                }
            }
        ]
    });

    $('.layer_slide ul').slick({
        dots: false,
        infinite: true,
        slidesToShow: 1,
        arrows: true,
        autoplay: false,
        prevArrow: $('#layer_prev'),
        nextArrow: $('#layer_next'),
        responsive: [
            // 반응형 웹 구현 옵션
            {
                breakpoint: 1100, //화면 사이즈 960px
                settings: {
                    //위에 옵션이 디폴트 , 여기에 추가하면 그걸로 변경
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 694, //화면 사이즈 768px
                settings: {
                    //위에 옵션이 디폴트 , 여기에 추가하면 그걸로 변경
                    slidesToShow: 1
                }
            }
        ]
    });

    // parallax
    function Parallax() {
        var scrollPos = $(document).scrollTop();
        var homePos = $('#home').height() / 2;

        $('#home .home_title').css({
            top: homePos + scrollPos + 'px'
        });
    }

    // fixed header navigation bar
    var header = $('.nav_box');
    var sticky = header.offset().top - 70;

    function navScroll() {
        if (window.pageYOffset > sticky) {
            $(header).addClass('sticky');
        } else {
            $(header).removeClass('sticky');
        }
    }

    // change current scroll position
    function CurrentScroll() {
        var doc_scroll = $(document).scrollTop();
        var fixed_height = Number($('.nav_box').height()),
            tabcon01_top = Number($('#about').offset().top - fixed_height),
            tabcon02_top = Number($('#skill').offset().top - fixed_height),
            tabcon03_top = Number($('#project').offset().top - fixed_height),
            tabcon04_top = Number($('#call').offset().top - fixed_height);

        if (doc_scroll < tabcon01_top) {
            $('.nav_box li').removeClass('active').eq(0).addClass('active');
        } else if (doc_scroll > tabcon01_top && doc_scroll < tabcon02_top) {
            $('.nav_box li').removeClass('active').eq(1).addClass('active');
        } else if (doc_scroll > tabcon02_top && doc_scroll < tabcon03_top) {
            $('.nav_box li').removeClass('active').eq(2).addClass('active');
        } else if (doc_scroll > tabcon03_top && doc_scroll < tabcon04_top - 600) {
            $('.nav_box li').removeClass('active').eq(3).addClass('active');
        } else if (doc_scroll > tabcon04_top - 600) {
            $('.nav_box li').removeClass('active').eq(4).addClass('active');
        }
    }

    // skill navi
    $('.nav_area .nav_link').click(function () {
        $('.nav_area .nav_link').removeClass('active');
        $(this).addClass('active');
        $('.side_area').hide();
        $('#' + $(this).attr('id') + '_box').fadeIn();
    });

    // skill percent animation
    function SkillPercent() {
        var sct = $(window).scrollTop();
        var skill = $('#box_type01').offset().top;

        if (sct > skill) {
            $('.chart_bar span').addClass('animation'); // 한 번만
            $('.box_type04:nth-child(2) .chart_bar span').css('width', '60%'); // ie 9 때문에
            $('.box_type04:nth-child(3) .chart_bar span').css('width', '40%'); // ie 9 때문에
        } else {
            // $(".chart_bar span").removeClass("animation"); // 여러 번
        }
    }

    function open_layer() {
        $('.openlayer').each(function () {
            $(this).on('click', function (e) {
                var return_focus = this;
                var layer_id = $(this).attr('id');
                $('.curtain').remove();
                console.log('a');
                show_layer(layer_id);
                $('#layer_' + layer_id)
                    .attr('tabindex', 0)
                    .focus();
                $('.closelayer, .curtain').on('click', function () {
                    hide_layer(layer_id, return_focus);
                });
            });
        });
    }

    function show_layer(layer_id) {
        $('body').css('overflow-y', 'hidden');
        $('.layer_wrap').append("<div class='curtain'></div>");
        $('.layer_wrap').show();
        $('.layer').hide();
        $('#layer_' + layer_id).fadeIn();
    }

    function hide_layer(layer_id, return_focus) {
        if (layer_id == '') {
            $('.layer').hide();
        } else {
            $('#layer_' + layer_id).hide();
            $(return_focus).focus();
        }
        $('.layer_wrap').hide();
        $('.curtain').remove();
        $('body').css('overflow-y', 'scroll');
    }

    // smooth scorll
    $('.nav_box li').click(function () {
        var target = $(this).children('a');
        var element = target.attr('href');
        $('.nav_box li').removeClass('active');
        target.parent().addClass('active');

        $('html, body').animate(
            {
                scrollTop: $(element).offset().top
            },
            800
        );
    });

    // project navi
    $('.nav_project li').click(function () {
        $('.nav_project li').removeClass('is_checked');
        $(this).addClass('is_checked');
    });

    open_layer();

    $(window).on('scroll', function () {
        navScroll();
        CurrentScroll();
        Parallax();
    });

    $(window).scroll(
        $.throttle(500, function () {
            SkillPercent();
        })
    );
});
