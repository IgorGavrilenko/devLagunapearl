;
(function () {
    "use strict";
    // isMobile
    $(isMobileFunc);
    function isMobileFunc() {
        var isMobile = {
            Android: function () {
                return navigator.userAgent.match(/Android/i);
            },
            BlackBerry: function () {
                return navigator.userAgent.match(/BlackBerry/i);
            },
            iOS: function () {
                return navigator.userAgent.match(/iPhone|iPad|iPod/i);
            },
            Opera: function () {
                return navigator.userAgent.match(/Opera Mini/i);
            },
            Windows: function () {
                return navigator.userAgent.match(/IEMobile/i);
            },
            any: function () {
                return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
            }
        };
        if (isMobile.any()) {
            var $htmlMobil = $('html');
            $htmlMobil.addClass('is-mobile');
        }
    }
// megaMenu
    $(megaMenuFunc);
    function megaMenuFunc() {
        var $subMenu = '.sub-menu';
        var $subMenuTrigger = $('.header-menu__item');
        $subMenuTrigger.hover(
                function (e) {
                    $(this).children($subMenu).fadeIn(250);
                    e.preventDefault();
                    e.stopPropagation();
                }, function (e) {
            $(this).children($subMenu).fadeOut(250);
            e.preventDefault();
            e.stopPropagation();
        }
        );
    }

// sticky
    $(stickyElFunc);
    function stickyElFunc() {
        var scroller = $('body,html');
        var $stickyheader = $('.header');
        var $stickyProduct1 = $('.sticky-product-1');
        var $stickyProduct2 = $('.sticky-product-2');
        var $stickyCheckout = $('.sticky-checkout');
        var $stickyFilter = $('.main-content__left');
        var $mediaMinLg = '(min-width: 1200px)';
        $stickyheader.stick_in_parent();
        if (window.matchMedia($mediaMinLg).matches) {
            $stickyCheckout.stick_in_parent({
                offset_top: 130,
                recalc_every: 1
            });
            $stickyProduct1.stick_in_parent({
                offset_top: 140,
                recalc_every: 1
            });
            $stickyProduct2.stick_in_parent({
                offset_top: 170,
                spacer: false,
                recalc_every: 1
            }).on("sticky_kit:bottom", function () {
                $stickyProduct1.css('position', 'absolute');
            });
            $(window).on("resize", (function () {
                return function () {
                    return $(document.body).trigger("sticky_kit:recalc");
                };
            })(this));
            (function () {
                var reset_scroll;
                return $stickyFilter.stick_in_parent({
                    offset_top: 380
                });
                reset_scroll = function () {
                    scroller.stop(true);
                    if ($(window).scrollTop() !== 0) {
                        scroller.animate({
                            scrollTop: 0
                        }, 400);
                    }
                    return scroller;
                };
                $('.main-content__left.is_stuck').each(function () {
                    var myheight = $(this).height();
                    var windowheight = $(window).resize(function () {
                        $(window).height();
                    });
                    if (myheight < windowheight) {
                        $(this).css({
                            'position': 'fixed',
                            'top': 380,
                            'bottom': 'auto'});
                    }
                });
            }).call(this);
        }
    }

// selectric
    $(selectricFunc);
    function selectricFunc() {
        var $langSwitch = $('.js-lang-switch');
        var $sortSwitch = $('.js-sort-switch');
        var $checkoutSelect = $('.js-checkout-select');
        var $cartQuantity = $('#cart-quantity');
        $langSwitch.selectric();
        $sortSwitch.selectric();
        $checkoutSelect.selectric();
        $cartQuantity.selectric();
    }

// mobMenu
    $(mobMenuFunc);
    function mobMenuFunc() {
        var $headerMenu = $('.header-menu__list');
        var $locationMobMenu = $('.top-line');
        $headerMenu.slicknav({
            label: '',
            closedSymbol: '',
            openedSymbol: '',
            appendTo: $locationMobMenu
        });
    }

// mobMenu button
    $(mobMenuButtonFunc);
    function mobMenuButtonFunc() {
        var $bodyEl = $('body');
        var $mobMenuOpen = 'mob-menu-open';
        var $slicknavNav = $('.slicknav_nav');
        var $mobMenubutton = $('.mob-menu-button');
        var $mobMenubuttonActive = 'mob-menu-button--active';
        var $htmlEl = $('html');
        $mobMenubutton.click(function (event) {
            event.stopPropagation();
            $slicknavNav.slideToggle(200);
            $mobMenubutton.toggleClass($mobMenubuttonActive);
            $bodyEl.toggleClass($mobMenuOpen);
        });
        $htmlEl.click(function (event) {
            if ($(event.target).closest($slicknavNav).size())
                return;
            $($slicknavNav).slideUp(200);
            $bodyEl.removeClass($mobMenuOpen);
            $mobMenubutton.removeClass($mobMenubuttonActive);
        });
    }

// spoiler
    $(spoilerFunc);
    function spoilerFunc() {
        var $targetActive = 'target-active';
        var $toggleActive = 'toggle-active';
        var $duration1 = 250;
        var spoiler = function (trigger) {
            $(trigger).click(function (event) {
                event.stopPropagation();
                $(this).toggleClass($toggleActive);
                $(this).next().slideToggle($duration1).toggleClass($targetActive);
            });
        };
        var $mediaMaxSm = '(max-width: 767px)';
        var $mediaMinSm = '(min-width: 768px)';
        if (window.matchMedia($mediaMaxSm).matches) {
            var $footerMenuTitle = '.footer-menu__title';
            var $footerMenuList = '.footer-menu__list';
            spoiler($footerMenuTitle, $footerMenuList);
            var $productFilterTitle = '.product-filter-title';
            var $productFilterBody = '.product-filter-body';
            spoiler($productFilterTitle, $productFilterBody);
        }
        if (window.matchMedia($mediaMinSm).matches) {
            var $titleList = '.title-list';
            var $optionList = '.option-list';
            spoiler($titleList, $optionList);
        }
        var $panelToggle = '.js-panel-toggle';
        var $panelTarget = '.js-panel-target';
        spoiler($panelToggle, $panelTarget);

// checkout
        var $buttonCheck_1 = $('#button-check-1');
        var $buttonCheck_2 = $('#button-check-2');
        var $panelAddressBottom = $('.panel--address').find('.js-panel-target');
        var $panelShMethodBottom = $('.panel--sh-method').find('.js-panel-target');
        var $panelPMethodBottom = $('.panel--p-method').find('.js-panel-target');
        var $panelAddressTop = $('.panel--address').find('.js-panel-toggle');
        var $panelShMethodTop = $('.panel--sh-method').find('.js-panel-toggle');
        var $panelPMethodTop = $('.panel--p-method').find('.js-panel-toggle');
        $buttonCheck_1.click(function () {
            $panelShMethodBottom.addClass($targetActive).slideDown($duration1);
            $panelAddressBottom.removeClass($targetActive).slideUp($duration1);
            $panelShMethodTop.removeClass($toggleActive);
            $panelAddressTop.addClass($toggleActive);
        });
        $buttonCheck_2.click(function () {
            $panelPMethodBottom.addClass($targetActive).slideDown($duration1);
            $panelShMethodBottom.removeClass($targetActive).slideUp($duration1);
            $panelPMethodTop.removeClass($toggleActive);
            $panelShMethodTop.addClass($toggleActive);
        });
    }

// range
    $(rangeFunc);
    function rangeFunc() {
        var $rangeAmount = $('.range_amount');
        var $range = $('.range');
        $range.slider({
            range: true,
            min: 5,
            max: 20000,
            values: [5, 20000],
            slide: function (event, ui) {
                $rangeAmount.val("($" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] + ")");
            }
        });
        $rangeAmount.val("($" + $range.slider("values", 0) + " - $" + $range.slider("values", 1) + ")");
    }

// upBtn
    $(upBtnFunc);
    function upBtnFunc() {
        var upBtn = function (el, duration) {
            var topEl = $('body, html');
            $(window).scroll(function () {
                if ($(this).scrollTop() !== 0) {
                    $(el).fadeIn();
                } else {
                    $(el).fadeOut();
                }
            });
            $(el).click(function () {
                topEl.animate({scrollTop: 0}, duration);
            });
        };
        upBtn('.up', 250);
    }

// scroll_to_element
    $(scrollElFunc);
    function scrollElFunc() {
        var $scrollToElement = function (toggle, anchor, duration, offset) {
            $(toggle).click(function (e) {
                e.preventDefault();
                var $baseEl = $('html, body');
                $baseEl.animate({
                    scrollTop: $(anchor).offset().top - offset
                }, duration);
            });
        };
        $scrollToElement('.js-about-tg-1', '.js-about-an-1', 600, 90);
    }

// checkbox custom
    $(iCheckFunc);
    function iCheckFunc() {
        var $checkboxEl_0 = $('.option__input');
        var $checkboxEl_1 = $('.checkout-options__input-radio');
        var $checkboxEl_2 = $('.checkout-options__input-checkbox');
        $checkboxEl_0.iCheck();
        $checkboxEl_1.iCheck();
        $checkboxEl_2.iCheck();
    }

// opt-select
    $(optSelectFunc);
    function optSelectFunc() {
        var $optSelectEl_0 = '.product-carousel-0';
        var $optSelectEl_1 = '.product-carousel-1';
        var $optSelectEl_2 = '.product-carousel-2';
        var $optSelectElActive = 'carousel-item--active';
        var $carouselOptLabel = '.opt-label';
        var $optSelect = function (optSelectEl) {
            var $optSelectClick = function () {
                $($carouselOptLabel, optSelectEl).parent().removeClass($optSelectElActive);
                $(this).parent().addClass($optSelectElActive);
            };
            $($carouselOptLabel, optSelectEl).on('click', $optSelectClick);
        };
        $optSelect($optSelectEl_0);
        $optSelect($optSelectEl_1);
        $optSelect($optSelectEl_2);
    }

// add to cart button
    $(addCartFunc);
    function addCartFunc() {
        var $optLabel = $('.opt-label');
        var $buttonResult = $('.button-result');
        var $buttonResultDone = 'button-result--done';
        $optLabel.on('click', function () {
            $buttonResult.addClass($buttonResultDone);
        });
    }
    ;
    $(btnHintFunc);
    function btnHintFunc() {
        var $buttonResult1 = $('.button-result');
        var $buttonResultAdd = $('.button-result__item--add');
        var $buttonResultHint = $('.button-result__item--hint');
        var $durationVal = 250;
        var $easingMethod = 'cubic-bezier(.77,0,.175,1)';
        $buttonResult1.hover(function (e) {
            e.stopPropagation();
            $buttonResultAdd.transition({
                y: '100%',
                duration: $durationVal,
                easing: $easingMethod
            });
            $buttonResultHint.transition({
                y: '100%',
                duration: $durationVal,
                easing: $easingMethod
            });
        });
        $buttonResult1.mouseleave(function (e) {
            e.stopPropagation();
            $buttonResultAdd.transition({
                y: '0',
                duration: $durationVal,
                easing: $easingMethod
            });
            $buttonResultHint.transition({
                y: '-100%',
                duration: $durationVal,
                easing: $easingMethod
            });
        });
    }

// product-carousels
    $(prodCarouselFunc);
    function prodCarouselFunc() {
        var $prodCarouselFor = $('.product-carousel-for');
        var $prodCarouselNav = $('.product-carousel-nav');
        var $slickOptsFor = {
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            fade: true,
            adaptiveHeight: true,
            asNavFor: '.product-carousel-nav'
        };
        var $slickOptsNav = {
            slidesToShow: 4,
            slidesToScroll: 1,
            arrows: true,
            asNavFor: '.product-carousel-for',
            centerMode: false,
            focusOnSelect: true,
            responsive: [
                {
                    breakpoint: 991,
                    settings: {
                        slidesToShow: 4
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 3
                    }
                },
                {
                    breakpoint: 330,
                    settings: {
                        slidesToShow: 2
                    }
                }
            ]
        };
        $prodCarouselFor.slick($slickOptsFor);
        $prodCarouselNav.slick($slickOptsNav);
    }

// product-page carousels
    $(function () {
        var productCarousel_1 = function (carouselClass, slidesVal, xs, sm, md) {
            var $slickOpts = {
                infinite: false,
                fade: false,
                adaptiveHeight: false,
                speed: 250,
                slidesToShow: slidesVal,
                cssEase: 'linear',
                responsive: [
                    {
                        breakpoint: 991,
                        settings: {
                            slidesToShow: md,
                            slidesToScroll: 1
                        }
                    },
                    {
                        breakpoint: 767,
                        settings: {
                            slidesToShow: sm,
                            slidesToScroll: 1
                        }
                    },
                    {
                        breakpoint: 575,
                        settings: {
                            slidesToShow: xs,
                            adaptiveHeight: true,
                            slidesToScroll: 1
                        }
                    }
                ]
            };
            $(carouselClass).slick($slickOpts);
        };
        productCarousel_1('.product-carousel-0', 6, 2, 4, 5);
        productCarousel_1('.product-carousel-1', 4, 2, 3, 4);
        productCarousel_1('.product-carousel-2', 3, 2, 3, 4);
    });
    $(function () {
        var productCarousel_2 = function (carouselClass, slidesVal) {
            var $slickOpts = {
                infinite: true,
                fade: false,
                adaptiveHeight: true,
                speed: 250,
                slidesToShow: slidesVal,
                cssEase: 'linear',
                dots: true,
                arrows: false,
                dotsClass: 'slick-dots',
                responsive: [
                    {
                        breakpoint: 991,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 1,
                            arrows: true,
                            dots: false
                        }
                    },
                    {
                        breakpoint: 767,
                        settings: {
                            slidesToShow: 1,
                            adaptiveHeight: true,
                            slidesToScroll: 1
                        }
                    }
                ]
            };
            $(carouselClass).slick($slickOpts);
        };
        productCarousel_2('.related-carousel', 4);
        productCarousel_2('.reviews-carousel', 4);
    });
    $(function () {
        var cartCarousel = function (carouselClass, slidesVal) {
            var $slickOpts = {
                infinite: true,
                fade: false,
                adaptiveHeight: false,
                speed: 250,
                slidesToShow: slidesVal,
                cssEase: 'linear',
                dots: true,
                arrows: true,
                dotsClass: 'slick-dots',
                responsive: [
                    {
                        breakpoint: 991,
                        settings: {
                            slidesToShow: 2,
                            dots: false,
                            slidesToScroll: 1
                        }
                    },
                    {
                        breakpoint: 767,
                        settings: {
                            slidesToShow: 1,
                            adaptiveHeight: true,
                            slidesToScroll: 1
                        }
                    }
                ]
            };
            $(carouselClass).slick($slickOpts);
        };
        cartCarousel('.cart-carousel', 3);
    });
    $(function () {
        var cartCarousel = function (carouselClass, slidesVal) {
            var $slickOpts = {
                infinite: true,
                fade: true,
                adaptiveHeight: false,
                speed: 250,
                slidesToShow: slidesVal,
                cssEase: 'linear',
                dots: false,
                arrows: false,
                autoplay: true,
                autoplaySpeed: 5000
            };
            $(carouselClass).slick($slickOpts);
        };
        cartCarousel('.main-carousel', 1);
    });
    (function () {
        var $mediaMinXs = '(min-width: 568px)';
        var $landingCarousel = $('.carousel-landing');
        var $slickOpts = {
            centerMode: false,
            infinite: false,
            draggable: true,
            speed: 250,
            arrows: false,
            dots: false,
            slidesToShow: 5,
            slidesToScroll: 1,
            responsive: [
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 2,
                        arrows: true,
                        dots: false
                    }
                },
                {
                    breakpoint: 1199,
                    settings: {
                        slidesToShow: 3,
                        arrows: true
                    }
                },
                {
                    breakpoint: 1599,
                    settings: {
                        slidesToShow: 4
                    }
                }
            ]
        };
        if (window.matchMedia($mediaMinXs).matches) {
            $landingCarousel.slick($slickOpts);
            $landingCarousel.on('wheel', (function (e) {
                e.preventDefault();
                if (e.originalEvent.deltaY < 0) {
                    $(this).slick('slickNext');
                } else {
                    $(this).slick('slickPrev');
                }
            }));
        }
    })();
    (function () {
        var $lengthsCarousel = $('.lengths-carousel');
        var $lengthsCarouselSlider = $('.lengths-carousel-slider');
        var $lengthsCarouselSliderInput = $('.lengths-carousel-slider__input');
        var $slickOpts = {
            autoplay: false,
            adaptiveHeight: true,
            centerMode: true,
            infinite: true,
            fade: true,
            speed: 250,
            cssEase: 'linear',
            draggable: false,
            dots: true,
            arrows: false,
            customPaging: function (slider, i) {
                var $slide = slider.$slides[i];
                var $title = $($slide).find('img').attr('title');
                return '<a href="javascript:;" class="slick-dots__link">' + '"' + $title + '"' + '</a>';
            }
        };
        $lengthsCarousel.slick($slickOpts);

        $lengthsCarouselSlider.each(function (i, el) {
            var sliderId = $(el).data('slider'),
                    $slider = $('#' + sliderId),
                    $sliderInput = $(el).find($lengthsCarouselSliderInput);
            $sliderInput.attr('max', $slider[0].slick.slideCount - 1);
            $slider.on('afterChange', function (event, slick, currentSlide) {
                $sliderInput.val(currentSlide);
            });
            $($sliderInput).on('input', function () {
                $slider.slick('slickGoTo', $(this).val());
            });
        });
        $('.slick-dots').append($('.lengths-carousel-slider'));
    })();

    (function () {
        var $testimonyCarousel = $('.testimony-carousel');
        var $slickOpts = {
            infinite: false,
            slidesToShow: 3,
            speed: 250,
            cssEase: 'linear',
            responsive: [
                {
                    breakpoint: 567,
                    settings: {
                        slidesToShow: 1,
                        arrows: true,
                        dots: true
                    }
                },
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 2,
                        arrows: true,
                        dots: false
                    }
                }
            ]
        };
        $testimonyCarousel.slick($slickOpts);
    })();
    (function () {
        $(window).on('load resize orientationchange', function () {
            var $respCarousel = function (argCarousel) {
                $(argCarousel).each(function () {
                    var argCarousel = $(this);
                    var $mediaMinSm = 768;
                    var $slickInitialized = 'slick-initialized';
                    var $unslick = 'unslick';
                    var $slickOpts = {
                        infinite: false,
                        speed: 250,
                        cssEase: 'linear',
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        dots: true,
                        arrows: false,
                        mobileFirst: true,
                        responsive: [
                            {
                                breakpoint: 479,
                                settings: {
                                    arrows: true,
                                    dots: false
                                }
                            }
                        ]
                    };
                    if ($(window).width() > $mediaMinSm) {
                        if (argCarousel.hasClass($slickInitialized)) {
                            argCarousel.slick($unslick);
                        }
                    } else {
                        if (!argCarousel.hasClass('slick-initialized')) {
                            argCarousel.slick($slickOpts);
                        }
                    }
                });
            };
            var $aboutCarousel = '.about-carousel';
            var $fillCardCarousel = $('.fill-card-list');
            $respCarousel($aboutCarousel);
            $respCarousel($fillCardCarousel);
        });
    })();

// popup
    $(popupFunc);
    function popupFunc() {
        var $popup = $('.popup');
        var $popupBox = '.box_popup';
        var $popupShowClass = 'popup--show';
        var $popupClose = ('.close_popup');
        var $popupOpacityOn = {'opacity': '1'};
        var $popupOpacityOff = {'opacity': '0'};
        $popup.find('.box_popup').click(function (e) {
            e.stopPropagation();
        });
        $popup.each(function () {
            $(this).click(function () {
                $(this).css($popupOpacityOff);
                setTimeout(function () {
                    $popup.removeClass($popupShowClass);
                }, 250);
            });
            $(this).find($popupClose).click(function () {
                $popup.css($popupOpacityOff);
                setTimeout(function () {
                    $popup.removeClass($popupShowClass);
                }, 250);
            });
            $(this).find($popupBox).click(function (e) {
                e.stopPropagation();
            });
        });
        function show_popup(popup) {
            if (popup.length > 0) {
                var $popup = $(popup);
                $popup.addClass($popupShowClass);
                setTimeout(function () {
                    $popup.css($popupOpacityOn);
                }, 50);
            }
        }
        function popup_handler(button, popup) {
            $(button).click(function () {
                show_popup(popup);
            });
        }
        popup_handler('.js-popup-toggle-prod-0', '.js-popup-prod-0');
        popup_handler('.js-popup-toggle-prod-1', '.js-popup-prod-1');
        popup_handler('.js-popup-toggle-prod-2', '.js-popup-prod-2');

        popup_handler('.js-popup-toggle-check-0', '.js-popup-check-0');

        popup_handler('.js-popup-toggle-panel-0', '.js-popup-panel-0');
        popup_handler('.js-popup-toggle-panel-1', '.js-popup-panel-1');
        popup_handler('.js-popup-toggle-panel-2', '.js-popup-panel-2');
        popup_handler('.js-popup-toggle-panel-3', '.js-popup-panel-3');

        popup_handler('.js-search', '.js-popup-search');
    }
// rating
    $(ratingFunc);
    function ratingFunc() {
        var $ratingUi = $('.js-rating-ui');
        var $ratingEmptyClass = 'icon-star-empty';
        var $ratingFullClass = 'icon-star-full';
        var $ratingStar = 5;
        $ratingUi.each(function () {
            $(this).starrr({
                emptyClass: $ratingEmptyClass,
                fullClass: $ratingFullClass,
                max: $ratingStar
            });
        });
    }

//  animFunc
    $(animFunc);
    function animFunc() {
        var $animTtrigger = 'animated';
        var $animOffset = 40;
        var $animElViewport = function (animEl, animMethod) {
            $(animEl).viewportChecker({
                classToAdd: ' ' + $animTtrigger + ' ' + animMethod,
                repeat: false,
                offset: $animOffset
            });
        };
        $animElViewport('.product-list__wrap', 'fadeIn');
        $animElViewport('.demo-descrpt__animated--in', 'fadeIn');
        $animElViewport('.demo-descrpt__animated--up', 'fadeInDown');
        $animElViewport('.demo-descrpt__animated--out', 'fadeInUp');
        $animElViewport('.demo-descrpt__animated--left', 'fadeInLeft');
        $animElViewport('.demo-descrpt__animated--right', 'fadeInRight');
    }

//scrollEffectHome
    $(scrollEffectHome);
    function scrollEffectHome() {
        var $timer = null;
        var $lastScrollTop = 0;
        var $topValMinus = '-=.08%';
        var $topValPlus = '+=.08%';
        var $easingMethod = 'cubic-bezier(0,0,0.60,1)';
        var $durationVal = 300;
        $(window).scroll(function () {
            var $el = $('.a-ratio__el--anim');
            var $st = $(this).scrollTop();
            if ($st > $lastScrollTop) {
                clearTimeout($timer);
                $timer = setTimeout(function () {
                    $el.transition({
                        y: $topValPlus,
                        duration: $durationVal,
                        easing: $easingMethod
                    });
                }, 50);
            } else {
                clearTimeout($timer);
                $timer = setTimeout(function () {
                    $el.transition({
                        y: $topValMinus,
                        duration: $durationVal,
                        easing: $easingMethod
                    });
                }, 50);
            }
            $lastScrollTop = $st;
            if ($el.length) {
                var $position = $el.position().top;
            }
            var $stopElTop = 'is-stop-top';
            var $stopElBottom = 'is-stop-bottom';
            var $posTopMax = 50;
            var $posTopMin = -50;
            if ($position >= $posTopMax) {
                $el.addClass($stopElTop);
            } else {
                $el.removeClass($stopElTop);
            }
            if ($position <= $posTopMin) {
                $el.addClass($stopElBottom);
            } else {
                $el.removeClass($stopElBottom);
            }
        });
    }
    //tabs
    ;
    $(tabFunc);
    function tabFunc() {
        var tab = function (tabToggle, tabTarget, tabToggleActive, tabTargetActive) {
            $(tabToggle).each(function (a) {
                $(this).click(function () {
                    $(tabTarget).removeClass(tabTargetActive).eq(a).addClass(tabTargetActive);
                });
            });
            $(tabToggle).each(function (a) {
                $(this).click(function () {
                    $(tabToggle).removeClass(tabToggleActive);
                    $(this).addClass(tabToggleActive);
                    $(tabToggle).removeClass(tabToggleActive).eq(a).addClass(tabToggleActive);
                });
            });
        };
        var $tabToggle = '.tab-toggle';
        var $tabTarget = '.tab-target';
        var $tabToggleActive = 'tab-toggle--active';
        var $tabTargetActive = 'fadeIn';
        tab(
                $tabToggle,
                $tabTarget,
                $tabToggleActive,
                $tabTargetActive
                );

// tab spoiler
        var $tabCaptionToggle = $('.tab-caption-toggle');
        var $tabCaptionTarget = $('.tab-caption-target');
        var $spoilerShow = function () {
            $tabCaptionTarget.slideToggle(250);
        };
        $tabCaptionToggle.on('click', $spoilerShow);
    }

    ;
    $(truncateFunc);
    function truncateFunc() {
        var $truncate = function (truncateEl) {
            $(truncateEl).dotdotdot({
                ellipsis: '\u2026 ',
                truncate: 'word',
                tolerance: 0
            });
        };
        var $truncateTestimony = '.js-truncate-testimony';
        var $truncateReview = '.js-truncate-review';
        var $productListTitle = '.product-list-info__title';
        var $cartProposText = '.cart-propos__text';
        $truncate($truncateTestimony);
        $truncate($truncateReview);
        $truncate($productListTitle);
        $truncate($cartProposText);
    }

//    contactFormFunc
    $(contactFormFunc);
    function contactFormFunc() {
        var $contactFormSubmit = $('#contact-form-submit');
        var $contactFormFieldset = $('.contact-form__inner');
        var $contactFormHideClass = 'contact-form__inner--hide';
        var $contactFormSuccess = $('.contact-form__mess--success');
        var $contactFormShowClass = 'contact-form__mess--show';
        var $successMessFunc = function () {
            $contactFormFieldset.addClass($contactFormHideClass);
            $contactFormSuccess.addClass($contactFormShowClass);
        };
        $contactFormSubmit.on('click', $successMessFunc);
    }
})();