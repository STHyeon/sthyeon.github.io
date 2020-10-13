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
            630: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            // when window width is >= 640px
            989: {
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

    // change current scroll position
    function CurrentScroll() {
        var doc_scroll = $(document).scrollTop();
        var fixed_height = Number($(".nav_box").height()),
            tabcon01_top = Number($("#about").offset().top - fixed_height),
            tabcon02_top = Number($("#skill").offset().top - fixed_height),
            tabcon03_top = Number($("#project").offset().top - fixed_height),
            tabcon04_top = Number($("#call").offset().top - fixed_height);

        if (doc_scroll < tabcon01_top) {
            $(".nav_box li").removeClass("active").eq(0).addClass("active");
        } else if (doc_scroll > tabcon01_top && doc_scroll < tabcon02_top) {
            $(".nav_box li").removeClass("active").eq(1).addClass("active");
        } else if (doc_scroll > tabcon02_top && doc_scroll < tabcon03_top) {
            $(".nav_box li").removeClass("active").eq(2).addClass("active");
        } else if (doc_scroll > tabcon03_top && doc_scroll < tabcon04_top - 600) {
            $(".nav_box li").removeClass("active").eq(3).addClass("active");
        } else if (doc_scroll > tabcon04_top - 600) {
            $(".nav_box li").removeClass("active").eq(4).addClass("active");
        }
    }

    // skill navi
    $(".nav_area .nav_link").click(function () {
        $(".nav_area .nav_link").removeClass("active");
        $(this).addClass("active");
        $(".side_area").hide();
        $("#" + $(this).attr("id") + "_box").fadeIn();
    });

    // skill percent animation
    function SkillPercent() {
        var sct = $(window).scrollTop();
        var skill = $("#box_type01").offset().top;
        console.log(skill);

        if (sct > skill) {
            $(".chart_bar span").addClass("animation"); // 한 번만
            console.log("hie");
        } else {
            // $(".chart_bar span").removeClass("animation"); // 여러 번
        }
    }

    function open_layer() {
        $(".openlayer").each(function () {
            $(this).on("click", function (e) {
                var return_focus = this;
                var layer_id = $(this).attr("id");
                $(".curtain").remove();
                show_layer(layer_id);
                $("#layer_" + layer_id)
                    .attr("tabindex", 0)
                    .focus();
                $(".closelayer").on("click", function () {
                    hide_layer(layer_id, return_focus);
                });
            });
        });
    }

    function show_layer(layer_id) {
        $("body").css("overflow-y", "hidden");
        $("body").append("<div class='curtain'></div>");
        $(".layer_wrap").show();
        $(".layer").hide();
        $("#layer_" + layer_id).fadeIn();
    }

    function hide_layer(layer_id, return_focus) {
        if (layer_id == "") {
            $(".layer").hide();
        } else {
            $("#layer_" + layer_id).hide();
            $(return_focus).focus();
        }
        $(".layer_wrap").hide();
        $(".curtain").remove();
        $("body").css("overflow-y", "scroll");
    }

    // smooth scorll
    $(".nav_box li").click(function () {
        var target = $(this).children("a");
        var element = target.attr("href");
        $(".nav_box li").removeClass("active");
        target.parent().addClass("active");

        $("html, body").animate(
            {
                scrollTop: $(element).offset().top,
            },
            800,
        );
    });

    // project navi
    $(".nav_project li").click(function () {
        $(".nav_project li").removeClass("is_checked");
        $(this).addClass("is_checked");
    });

    open_layer();

    $(window).on("scroll", function () {
        navScroll();
        CurrentScroll();
    });

    $(window).scroll(
        $.throttle(500, function () {
            SkillPercent();
        }),
    );
});
