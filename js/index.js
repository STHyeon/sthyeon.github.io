var MixitUP = {
    init: function Init() {
        mixitup('.project-list', {
            controls: {
                toggleDefault: 'none'
            }
        });
    }
};

function openLayer() {
    $('.openlayer').click(function () {
        var return_focus = this;
        $('.curtain').remove();
        $('body').css('overflow-y', 'hidden');
        $('.layer__background').append("<div class='curtain'></div>");
        $('.layer__background').show();
        $('.layer__wrap').hide();
        $('#layer_portfolio').fadeIn();

        $('.closelayer, .curtain').on('click', function () {
            hideLayer(return_focus);
        });
    });
}

function hideLayer(return_focus) {
    $('#layer_portfolio').hide();
    $(return_focus).focus();
    $('.layer__background').hide();
    $('.curtain').remove();
    $('body').css('overflow-y', 'scroll');
}

// Slick
function CustomSlick() {
    $('.layer-slide__wrap').slick({
        dots: false,
        infinite: true,
        slidesToShow: 1,
        arrows: true,
        autoplay: false,
        prevArrow: $('#layer_prev'),
        nextArrow: $('#layer_next')
        // responsive: [
        //     // 반응형 웹 구현 옵션
        //     {
        //         breakpoint: 1100, //화면 사이즈 960px
        //         settings: {
        //             //위에 옵션이 디폴트 , 여기에 추가하면 그걸로 변경
        //             slidesToShow: 2
        //         }
        //     },
        //     {
        //         breakpoint: 694, //화면 사이즈 768px
        //         settings: {
        //             //위에 옵션이 디폴트 , 여기에 추가하면 그걸로 변경
        //             slidesToShow: 1
        //         }
        //     }
        // ]
    });
}

$(function () {
    // MixitUP
    MixitUP.init();

    // Layer
    openLayer();

    // Slick
    CustomSlick();
});
