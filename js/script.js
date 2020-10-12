$(function () {
    // swiper
    new Swiper(".swiper-container", {
        slidesPerView: 3,
        spaceBetween: 30,
        slidesPerGroup: 3,
        loop: true,
        loopFillGroupWithBlank: true,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 20,
            },
            // when window width is >= 480px
            480: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            // when window width is >= 640px
            640: {
                slidesPerView: 3,
                spaceBetween: 30,
            },
        },
    });

    // fixed header navigation bar
    const header = document.querySelector(".nav_box");
    const sticky = header.offsetTop - 70;

    function navScroll() {
        if (window.pageYOffset > sticky) {
            $(header).addClass("sticky");
        } else {
            $(header).removeClass("sticky");
        }
    }

    window.onscroll = function () {
        navScroll();
    };

    // smooth scorll
    $(".nav_box li").click(function (e) {
        var target = $(this).children("a");
        var element = target.attr("href");
        $(".nav_box li a").removeClass("active");
        target.addClass("active");

        $("html, body").animate(
            {
                scrollTop: $(element).offset().top,
            },
            800,
        );
    });

    // skill navi
    $(".area_nav .nav_link").click(function () {
        $(".area_nav .nav_link").removeClass("active");
        $(this).addClass("active");
        $(".side_area").hide();
        $("#" + $(this).attr("id") + "_box").fadeIn();
    });

    // skill percent animation
    $(window).scroll(
        $.throttle(500, function () {
            var sct = $(window).scrollTop();
            var skill = $(".additional_box").offset();

            if (sct > skill.top) {
                $(".chart_bar span").addClass("animation"); // 한 번만
            } else {
                // $(".chart_bar span").removeClass("animation"); // 여러 번
            }
        }),
    );

    // project navi
    $(".project_nav li").click(function () {
        $(".project_nav li").removeClass("is_checked");
        $(this).addClass("is_checked");
    });
});
