// Scroll - Nav_Fix
function NavScroll() {
    var header = $('.header');
    var sticky = $('#About').offset().top;

    if (window.pageYOffset > sticky) {
        $(header).addClass('sticky');
    } else {
        $(header).removeClass('sticky');
    }
}

// Scroll - When Scroll, Change Nav
function CurrentScroll() {
    var docScroll = $(document).scrollTop();
    var fixedHeight = Number($('.header').height()),
        tab01 = Number($('#About').offset().top - fixedHeight),
        tab02 = Number($('#Skill').offset().top - fixedHeight),
        tab03 = Number($('#Project').offset().top - fixedHeight),
        tab04 = Number($('#Call').offset().top - fixedHeight);

    if (docScroll > tab01 && docScroll < tab02) {
        $('.header__list--item').removeClass('active').eq(0).addClass('active');
    } else if (docScroll > tab02 && docScroll < tab03) {
        $('.header__list--item').removeClass('active').eq(1).addClass('active');
    } else if (docScroll > tab03 && docScroll < tab04 - 600) {
        $('.header__list--item').removeClass('active').eq(2).addClass('active');
    }
}

// INIT
function INIT() {
    // AOS
    AOS.init();

    // Slick
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

    // Scroll - Smooth Scroll
    $('.header__list--item').click(function () {
        var target = $(this).children('a');
        var element = target.attr('href');
        $('.header__list--item').removeClass('active');
        target.addClass('active');

        $('html, body').animate(
            {
                scrollTop: $(element).offset().top
            },
            700
        );
    });

    // Nav - Current Project
    $('.project-controls__item').click(function () {
        $('.project-controls__item').removeClass('active');
        $(this).addClass('active');
    });

    // Modal - Modal
    $('.openlayer').each(function () {
        $(this).on('click', function (e) {
            var return_focus = this;
            $('.curtain').remove();
            showLayer();
            $('#layer_portfolio').attr('tabindex', 0).focus();
            $('.closelayer, .curtain').on('click', function () {
                hideLayer(return_focus);
            });
        });
    });

    function showLayer() {
        $('body').css('overflow-y', 'hidden');
        $('.layer_wrap').append("<div class='curtain'></div>");
        $('.layer_wrap').show();
        $('.layer').hide();
        $('#layer_portfolio').fadeIn();
    }

    function hideLayer(return_focus) {
        $('#layer_portfolio').hide();
        $(return_focus).focus();
        $('.layer_wrap').hide();
        $('.curtain').remove();
        $('body').css('overflow-y', 'scroll');
    }
}

$(function () {
    INIT();

    $(window).on('scroll', function () {
        NavScroll();
        CurrentScroll();
    });
});
