var MixitUP = {
    init: function Init() {
        mixitup('.project-list', {
            controls: {
                toggleDefault: 'none'
            }
        });
    }
};

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
    });
}

function openLayer() {
    $('.openlayer').click(function () {
        var return_focus = this;
        $('.curtain').remove();
        $('body').css('overflow-y', 'hidden');
        $('.layer__background').append("<div class='curtain'></div>");
        $('.layer__background').show();
        $('.layer__wrap').hide();

        var data_call_id = $(this).attr('id');
        $.getJSON('../data/data.json', function (data) {
            var dataInfo = data.find((e) => e.id == data_call_id);
            $('.layer-description__title').text(dataInfo.name);
            $('.layer-description__content').html(dataInfo.description);

            // if (dataInfo.built) {
            //     var liHtml = '';
            //     liHtml += '<ul class="layer-built">';
            //     liHtml += '<li class="layer-built__title">Built With</li>';
            //     for (var i of dataInfo.built) {
            //         liHtml += '<li>' + i + '</li>';
            //     }
            //     liHtml += '</ul>';

            //     $('.layer-description__content').append(liHtml);
            // }

            if (dataInfo.image) {
                $('.layer-slide__wrap').remove();

                var p_liHtml = '';
                p_liHtml += '<ul class="layer-slide__wrap">';

                for (var i of dataInfo.image) {
                    p_liHtml += '<li class="layer-slide__item">' + '<img src="../img/project/' + i + '" alt="background" />' + '</li>';
                }

                p_liHtml += '</ul>';

                $('.layer-slide').prepend(p_liHtml);

                CustomSlick();
            }

            if (dataInfo.site.length > 0) {
                $('#layer_site').remove();

                var l_link = '';
                l_link += '<button type="button" id="layer_site" class="layer-close__button">';
                l_link += '<a target="_blank" href="' + dataInfo.site + '">Demo</a>';
                l_link += '</button>';
                $('.layer-close').prepend(l_link);
            } else {
                $('#layer_site').remove();
            }

            if (dataInfo.github.length > 0) {
                $('#layer_github').remove();

                var l_link = '';
                l_link += '<button type="button" id="layer_github" class="layer-close__button">';
                l_link += '<a target="_blank" href="' + dataInfo.github + '">Github</a>';
                l_link += '</button>';
                $('.layer-close').prepend(l_link);
            } else {
                $('#layer_github').remove();
            }
        });

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

function CircleMove() {
    var circlePositions = [
        [
            { x: '-6%', y: '-6%', scale: 1 },
            { x: '69%', y: '55%', scale: 1 },
            { x: 127, y: '48%', scale: 1 },
            { x: '72%', y: '35%', scale: 1 },
            { x: '90%', y: '36%', scale: 1 }
        ],
        [
            { x: '15%', y: '58%', scale: 0.7 },
            { x: '72%', y: '88%', scale: 1 },
            { x: '22%', y: '85%', scale: 1 },
            { x: '80%', y: '70%', scale: 1 },
            { x: '90%', y: '80%', scale: 1 }
        ],
        [
            { x: '2%', y: '12%', scale: 1 },
            { x: '78%', y: '31%', scale: 1.5 },
            { x: '20%', y: '31%', scale: 1 },
            { x: '73%', y: '26%', scale: 1 },
            { x: '95%', y: '30%', scale: 1 }
        ],
        [
            { x: '23%', y: '35%', scale: 0.8 },
            { x: '54%', y: '40%', scale: 1 },
            { x: '50%', y: '40%', scale: 1 },
            { x: '75%', y: '38%', scale: 1 },
            { x: '50%', y: '40%', scale: 1 }
        ]
    ];

    var controller = new ScrollMagic.Controller();

    function Scroll(num) {
        TweenMax.to('.spacer1', 3.4, {
            top: circlePositions[num][0].y,
            left: circlePositions[num][0].x,
            ease: Quint.easeOut
        });

        TweenMax.to('.spacer2', 3.2, {
            top: circlePositions[num][1].y,
            left: circlePositions[num][1].x,
            delay: 0.15,
            ease: Quint.easeOut
        });
        TweenMax.to('.spacer3', 3.7, {
            top: circlePositions[num][2].y,
            left: circlePositions[num][2].x,
            delay: 0.24,
            ease: Quint.easeOut
        });

        TweenMax.to('.spacer4', 3.5, {
            top: circlePositions[num][3].y,
            left: circlePositions[num][3].x,
            delay: 0.32,
            ease: Quint.easeOut
        });

        TweenMax.to('.spacer', 3.8, {
            top: circlePositions[num][4].y,
            left: circlePositions[num][4].x,
            delay: 0.42,
            ease: Quint.easeOut
        });
    }

    new ScrollMagic.Scene({
        triggerElement: '#home',
        duration: 936,
        offset: -15
    })
        .addTo(controller)
        .on('enter leave', function (e) {
            if (e.type == 'enter') Scroll(0);
        });

    new ScrollMagic.Scene({
        triggerElement: '#about',
        duration: 936,
        offset: 0
    })
        .addTo(controller)
        .on('enter leave', function (e) {
            if (e.type == 'enter') Scroll(1);
        });

    new ScrollMagic.Scene({
        triggerElement: '#skill',
        duration: 1348,
        offset: 0
    })
        .addTo(controller)
        .on('enter leave', function (e) {
            if (e.type == 'enter') Scroll(2);
        });

    new ScrollMagic.Scene({
        triggerElement: '#project',
        duration: 482,
        offset: 0
    })
        .addTo(controller)
        .on('enter leave', function (e) {
            if (e.type == 'enter') Scroll(1);
        });

    new ScrollMagic.Scene({
        triggerElement: '#contact',
        duration: 936,
        offset: 0
    })
        .addTo(controller)
        .on('enter leave', function (e) {
            if (e.type == 'enter') Scroll(0);
        });
}

function SmoothScroll() {
    $('.header-item__name').click(function () {
        var target = $(this);
        var element = target.attr('href');
        $('.header-item__name').removeClass('active');
        target.addClass('active');

        $('html, body').animate(
            {
                scrollTop: $(element).offset().top
            },
            700
        );
    });
}

$(function () {
    // MixitUP
    MixitUP.init();

    // Layer
    openLayer();

    // Slick
    // CustomSlick();

    // Circle Animation
    CircleMove();

    // Scroll - Smooth Scroll
    SmoothScroll();
});
