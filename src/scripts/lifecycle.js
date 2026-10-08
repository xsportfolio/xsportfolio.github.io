    /**** Responsive ****/

    function mobileOpt() {

        // Create a media condition that targets viewports at least 768px wide
        var siteHeader = $('.site-header'),
            siteNav = $('.site-navigation'),
            mobileQuery = window.matchMedia('(max-width: 450px)');


        $(window).on('resize', function () {


            // Check if the media query is true
            if (mobileQuery.matches) {


                siteHeader.removeClass('classic_menu');
                siteHeader.addClass('fullscreen_menu');
                siteNav.removeClass('classic');
                siteNav.addClass('fullscreen');

                fullscreenNavigation();

            }

        })

    }

    /**** Responsive ****/

    function initShowcases() {

        var showcaseCheck = $('.portfolio-showcase');

        if (showcaseCheck.length > 0) {

            if (showcaseCheck.hasClass('showcase-list')) {

                aShowcaseList();

            } else if (showcaseCheck.hasClass('showcase-wall')) {
                showcaseWall();

            } else if (showcaseCheck.hasClass('showcase-slideshow-v2')) {

                aShowcaseSlideV2();

            } else if (showcaseCheck.hasClass('showcase-slideshow')) {

                aShowcaseSlide();

            } else if (showcaseCheck.hasClass('carousel-showcase')) {

                aShowcaseCarousel();

            } else if (showcaseCheck.hasClass('fullscreen-slider-showcase')) {

                aShowcaseFullscrenSlider()

            } else if (showcaseCheck.hasClass('fullscreen-wall-showcase')) {

                showcaseFullscreenWall()

            }

        }

    }


    function showcaseOpenings() {

        var showcaseCheck = $('.portfolio-showcase');

        if (showcaseCheck.length > 0) {

            if (showcaseCheck.hasClass('showcase-list')) {
                //Welcome Animation

                var scWelcome = gsap.timeline();

                scWelcome.fromTo('.sl-project-title', 2, {
                    y: '110%'
                }, {
                    y: '0%',
                    ease: 'power2.out',
                    stagger: 0.1,
                }, 0)

                scWelcome.fromTo('.sl-project-meta', 1, {
                    y: '100%'
                }, {
                    y: '0%',
                    ease: 'power2.out',
                    stagger: 0.05,
                }, 1)

                var slBef = CSSRulePlugin.getRule('.sl-project::before');

                scWelcome.to(slBef, .4, {
                    cssRule: {
                        opacity: 1,
                    },
                }, 1.3)

                scWelcome.fromTo('.showcase-footer', .6, {
                    opacity: 0
                }, {
                    opacity: 1,

                }, 2)


                //Welcome Animation



            } else if (showcaseCheck.hasClass('showcase-wall')) {

                var wallOpen = gsap.timeline({
                    once: true,
                    delay: 0,
                    onStart: function () {

                        $('body').addClass('loading')
                    },
                    onComplete: function () {

                        $('body').removeClass('loading')
                    }
                })

                wallOpen.fromTo('.wall-projects-top', 4, {
                    x: '-110%'
                }, {
                    x: '10%',
                    ease: 'power4.out'
                }, 0)

                wallOpen.fromTo('.wall-projects-bottom', 4, {
                    x: '110%'
                }, {
                    x: '-10%',
                    ease: 'power4.out'

                }, 0)

                wallOpen.fromTo('.wall-drag', 2, {
                    width: '0%'
                }, {
                    width: '50%',
                    ease: 'power2.out'

                }, 2)

                wallOpen.fromTo('.showcase-footer', 1, {
                    opacity: 0
                }, {
                    opacity: 1,
                    ease: 'power2.out'

                }, 3)


            } else if (showcaseCheck.hasClass('showcase-slideshow-v2')) {


                // Welcome Animation

                var ss2Welcome = gsap.timeline({
                    once: true
                });

                ss2Welcome.fromTo('.title-char', 1, {
                    y: '100%'
                }, {
                    y: '0%',
                    stagger: 0.02,
                    ease: 'power2.out',
                }, 0)

                ss2Welcome.fromTo('.ss2-project-cat span', .75, {
                    y: '100%'
                }, {
                    y: '0%',
                    ease: 'power2.out',
                }, 1)

                ss2Welcome.fromTo('.excerpt-line span', 1, {
                    y: '100%'
                }, {
                    y: '0%',
                    stagger: 0.05,
                    ease: 'power2.out',
                }, 1)

                ss2Welcome.fromTo('.ss2-dot', .5, {
                    x: -30,
                    opacity: 0
                }, {
                    x: 0,
                    opacity: 1,
                    stagger: 0.05,
                    ease: 'power2.out',
                }, 1)

                ss2Welcome.fromTo('.ss2-nav', .5, {
                    opacity: 0
                }, {
                    opacity: 1,
                }, 1)

                ss2Welcome.fromTo('.showcase-footer', .5, {
                    opacity: 0
                }, {
                    opacity: 1,
                    ease: 'power1.out',

                }, 1)

                // Welcome Animation


            } else if (showcaseCheck.hasClass('showcase-slideshow')) {

                //Welcome Animation

                let ssWelcome = gsap.timeline({
                    once: true,
                    onStart: function () {
                        disableScroll();

                        gsap.set('.ss-project.active .ss1-cat', {
                            visibility: 'hidden'
                        })

                        gsap.set('.ss-project.active .ss1-summary', {
                            visibility: 'hidden'
                        })


                    }
                });

                let butWidth = $('.ss1-button').outerWidth();



                ssWelcome.fromTo('.st-char', 1.5, {
                    y: '110%',

                }, {
                    y: '0%',
                    stagger: 0.02,
                    ease: 'power2.out',

                }, 0)

                ssWelcome.fromTo('.cat_char', 1, {
                    y: '110%',

                }, {
                    y: '0%',
                    stagger: 0.02,
                    ease: 'power2.out',
                    onStart: function () {

                        gsap.set('.ss-project.active .ss1-cat', {
                            visibility: 'visible',
                            delay: .2
                        })

                    }

                }, 1)

                ssWelcome.fromTo('.ss1-button', .7, {
                    width: 0,

                }, {
                    width: butWidth,
                    ease: 'power2.inOut',
                }, 1.3)

                ssWelcome.fromTo('.ssum-line', 1.5, {
                    y: '110%',

                }, {
                    y: '0%',
                    stagger: 0.02,
                    ease: 'power2.out',
                    onStart: function () {


                        gsap.set('.ss-project.active .ss1-summary', {
                            visibility: 'visible',
                            delay: .1
                        })

                    }

                }, 1)

                ssWelcome.fromTo('.ss1-nav', 1, {
                    opacity: 0,

                }, {
                    opacity: 1,
                    ease: 'power2.out',

                }, 2)

                ssWelcome.fromTo('.ss1-fraction', 1, {
                    opacity: 0,

                }, {
                    opacity: 1,
                    ease: 'power2.out',

                }, 2.5)

                ssWelcome.fromTo('.ss1-dots .swiper-pagination-bullet', 1.5, {
                    opacity: 0,
                    x: 50,

                }, {
                    x: 0,
                    opacity: 1,
                    stagger: 0.05,
                    ease: 'power2.out',
                    onComplete: function () {

                        gsap.to('.ss1-dots .swiper-pagination-bullet', {
                            clearProps: 'opacity'
                        })

                    }


                }, 1.55)


                //Welcome Animation

            } else if (showcaseCheck.hasClass('carousel-showcase')) {

                //Welcome Animation

                let sCarouselWelcome = gsap.timeline({
                        onStart: function () {
                            disableScroll();
                        },
                        onComplete: function () {

                            enableScroll();
                        }

                    }),
                    wrapper = $('.cas-project-wrapper'),
                    wrapFirstTrans = $(window).outerWidth() / 100 * 90,
                    wrapWidth = -wrapper.outerWidth();

                sCarouselWelcome.fromTo('.cas-line span', 1, {
                    y: '100%'
                }, {
                    y: '0%',
                    stagger: 0.1,
                    ease: 'power3.out'
                }, 2)


                sCarouselWelcome.fromTo(wrapper, 2.5, {
                    x: wrapWidth
                }, {
                    x: wrapFirstTrans,
                    ease: 'circ.inOut',
                }, .2)

                sCarouselWelcome.fromTo('.cas-bg-text', 1.5, {
                    x: '-100%'
                }, {
                    x: '100%',
                    ease: 'power2.out',


                }, .7)

                sCarouselWelcome.fromTo('.cas-progress', 1.5, {
                    width: '0%'
                }, {
                    width: '50%',
                    ease: 'power2.out',


                }, 2.2)

                sCarouselWelcome.fromTo('.showcase-footer', 1, {
                    opacity: 0,
                }, {
                    opacity: 1
                }, 2.7)





                //Welcome Animation

            } else if (showcaseCheck.hasClass('fullscreen-slider-showcase')) {
                // Welcome Animation


                let welcomeAnim = gsap.timeline({
                        once: true
                    }),
                    currentSlide = $('.swiper-slide-active'),
                    nextSlide = $('.swiper-slide-next'),
                    prevSlide = $('.swiper-slide-prev'),

                    actImg = $(currentSlide).find('img'),
                    nextImg = $(nextSlide).find('img'),
                    prevImg = $(prevSlide).find('img'),

                    activeProj = $(currentSlide).data('project'),
                    actIndex = $(currentSlide).data('index'),

                    titLines = $(activeProj).find('.fs-tit-char > span');


                welcomeAnim.fromTo(titLines, 1.5, {
                    x: -100,

                }, {
                    x: -0,
                    stagger: 0.01,
                    ease: 'power2.out',

                }, .3)

                welcomeAnim.fromTo('.fs-fraction span', .6, {
                    x: -30,
                    opacity: 0
                }, {
                    x: 0,
                    opacity: 1,
                    ease: 'power2.out',
                }, 1)

                welcomeAnim.fromTo('.fs-meta > span', 1, {
                    x: -30,
                    opacity: 0
                }, {
                    x: 0,
                    opacity: 1,
                    ease: 'power2.out',
                }, 1);

                welcomeAnim.fromTo('.fs-button a', 1.5, {
                    x: '-100%',
                    opacity: 0
                }, {
                    x: '0%',
                    opacity: 1,
                    ease: 'power2.out',
                }, 1.5)

                welcomeAnim.fromTo('.showcase-footer', 1, {
                    opacity: 0
                }, {
                    opacity: 1,
                    ease: 'power2.out',

                }, 1.7)



                // Welcome Animation


            } else if (showcaseCheck.hasClass('fullscreen-wall-showcase')) {

                //Welcome Animation

                let fsWallWelcome = gsap.timeline({
                        once: true
                    }),
                    dashs = CSSRulePlugin.getRule('.fw-project::after');



                fsWallWelcome.fromTo('.fw-project a', 1.5, {
                    y: '150%',

                }, {
                    y: '0%',
                    stagger: 0.1,
                    ease: 'power2.out',

                }, 0)


                fsWallWelcome.fromTo(dashs, 1.5, {
                    cssRule: {
                        y: '150%',
                    }

                }, {
                    cssRule: {
                        y: '0%',
                    },
                    stagger: 0.1,
                    ease: 'power2.out',

                }, 1)

                fsWallWelcome.fromTo('.showcase-footer', .75, {
                    opacity: 0

                }, {
                    opacity: 1,
                    ease: 'power2.out',

                }, 2)

                //Welcome Animation

            }

        }

    }

    function initPages() {

        aPageHeader()

        if ($('.project-page').length) {

            aProjectPage();

        };

        if ($('.a-blog').length) {

            aBlog();

        }

        if ($('.a-works').length) {

            aWorks();

        }

        if ($('.cart-page').length) {

            aShoppingCart()

        }

        if ($('.a-products').length) {

            aShop();

        }


    }

    function initShortcodes() {

        showCaseVideos();
        aSingleImage();
        aSingleProject();
        alitohImageCarousel();
        aPageNav();
        aSeperator();
        aButtons();
        aEmbedVideo();
        aLinkedText();
        aTeamCarousel();
        aScrollableText()
        aServicesS2();
        aTestimonials();
        aImageCarousel();
        aHeading();
        aClients();
        aAwards();
        alitohServicesS1();
        aPersonalHead();
        aForms();
        alitohNumberCt();
        aScrollNotice();
        aProductsCarousel();
        aSingleProduct();
        aRecentWorks();

    }

    let mobileQuery = window.matchMedia('(max-width: 450px)');
    // Check if the media query is true
    if (!mobileQuery.matches) {
        mouseCursor();

    }



    $(window).on('load', function () {
        initShowcases();
        siteHeaderSet();
        fullscreenNavigation();
        classicNavigation();


        if ($('.section.fullscreen').length) {

            $('#footer').hide()

        } else {
            $('#footer').show()
        }

        pageLoader();

        if (siteLoader == true) {


            loadAn.eventCallback('onComplete', function () {

                $('body').removeClass('loading');
                gsap.set('#page', {
                    visibility: 'visible'
                })

                gsap.to('.apl-background', .7, {
                    height: '0%',
                    ease: 'power2.inOut',
                    onComplete: function () {
                        loader.hide();
                    }
                })


                showcaseOpenings();
                initShortcodes();
                initPages();

                let mobileQuery = window.matchMedia('(max-width: 900px)');
                // Check if the media query is true
                if (!mobileQuery.matches) {

                    aParallaxScroll();
                }


                enableScroll()
                aScrollAnimations();


                ScrollTrigger.refresh(true)


            })




        } else {

            loader.hide();

            if ($('.section.fullscreen').length) {

                $('#footer').hide()


            } else {
                $('#footer').show()

            }
            showcaseOpenings();
            initShortcodes();
            initPages();

            let mobileQuery = window.matchMedia('(max-width: 900px)');
            // Check if the media query is true
            if (!mobileQuery.matches) {

                aParallaxScroll();
            }


            enableScroll()
            aScrollAnimations();


            ScrollTrigger.refresh(true)

        }


    })


    /** Scroll Animations **/


    var trans = $('.a-page-transitions'),
        transLayout = trans.data('layout'),
        text = $('.trans-text'),
        defTransText = text.html(),
        bg = $('.apt-bg'),
        menuOv = CSSRulePlugin.getRule('.site-header.fullscreen_menu.menu-has-open::before'),
        menuBackOv = CSSRulePlugin.getRule('.site-header.fullscreen_menu.menu-has-open::after');

    trans.addClass(transLayout)

    new SplitText(text, {
        type: 'chars',
        charsClass: 'trans_char'
    })


