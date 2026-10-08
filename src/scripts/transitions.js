    barba.hooks.after((data) => {

        let Alltrigger = ScrollTrigger.getAll()
        for (let i = 0; i < Alltrigger.length; i++) {
            Alltrigger[i].kill(true)
        }


        window.scrollTo(0, 0);

        initShowcases();
        siteHeaderSet();

        if ($('.section.fullscreen').length) {

            $('#footer').hide()

        } else {
            $('#footer').show()

        }

        initShortcodes();
        initPages();

        let mobileQuery = window.matchMedia('(max-width: 900px)');

        if (!mobileQuery.matches) {

            aParallaxScroll();
        }

        showcaseOpenings();

        enableScroll()
        aScrollAnimations();

        ScrollTrigger.refresh(true);


    })


    barba.init({
        debug: false,
        cacheIgnore: true,
        transitions: [
            {
                name: 'default-transition',
                leave() {

                    return new Promise(function (resolve, reject) {

                        var trans = $('.a-page-transitions'),
                            bg = $('.apt-bg'),
                            siteHeader = $('.site-header');


                        if (siteHeader.hasClass('menu-has-open')) {

                            var fsMenuTrans = gsap.timeline({
                                onComplete: function () {
                                    resolve();
                                },
                            });

                            let subMenu = $('.sub-menu');

                            if (subMenu.hasClass('opened')) {
                                var menuItems = $('.sub-menu.opened > li > a');

                                $('.sub-back').removeClass('is-active')


                            } else {
                                var menuItems = $('.main-menu > li > a');
                            }



                            gsap.set(trans, {
                                visibility: 'visible'
                            })


                            fsMenuTrans.to(menuItems, 1, {
                                y: '-100%',
                                stagger: 0.05,
                                ease: 'power2.in',
                            }, 0)

                            fsMenuTrans.to('.menu-widget .social-list li a', 1, {
                                y: '-100%',
                                opacity: 0,
                                stagger: 0.05,
                                ease: 'power2.in'
                            }, 0)

                            fsMenuTrans.fromTo('.trans_char', .75, {
                                y: "100%"
                            }, {
                                ease: 'power2.out',
                                y: '0%',
                                stagger: 0.01,
                                onStart: function () {

                                    if ($('.a-page-transitions').hasClass('dark')) {
                                        var firstColor = 'hsla(0, 0%, 100%, .2)',
                                            secondColor = '#fff';
                                    } else {
                                        var firstColor = 'rgba(25,27,29,.6)',
                                            secondColor = '#000';
                                    }

                                    let tl = gsap.timeline({
                                        once: true,
                                        delay: .5
                                    });


                                    tl.to('.trans_char', {
                                        color: secondColor,
                                        duration: .3,
                                        stagger: .02,
                                        ease: 'none'
                                    })

                                    tl.to('.trans_char', {
                                        color: firstColor,
                                        duration: .3,
                                        stagger: .02,

                                        ease: 'none'
                                    })

                                },
                                onComplete: function () {

                                    gsap.to(siteHeader, 1, {
                                        height: 150,
                                        ease: 'power2.inOut'
                                    })

                                    gsap.to('.header-wrapper', 1, {
                                        top: '60%',
                                        ease: 'power2.inOut'
                                    })

                                }
                            }, 1)

                            fsMenuTrans.to('.git-button', 1, {
                                y: '-100%',
                                opacity: 0,
                                stagger: 0.05,
                                ease: 'power2.in'
                            }, 0)


                            fsMenuTrans.to(menuOv, .5, {
                                cssRule: {
                                    height: '100vh'
                                },
                                ease: 'none'
                            }, .1)


                        } else {

                            var defaultTransOut = gsap.timeline({
                                once: 'true',
                                onStart: function () {
                                    gsap.set(trans, {
                                        visibility: 'visible'
                                    })

                                },
                                onComplete: function () {

                                    resolve();
                                }
                            })


                            defaultTransOut.fromTo(bg, .6, {
                                height: '0%'
                            }, {
                                height: '100%',
                                duration: .7,
                                ease: 'power2.inOut',
                                onStart: function () {

                                    gsap.set(bg, {
                                        top: 'unset',
                                        bottom: 0
                                    })
                                },
                            }, 0)

                            defaultTransOut.fromTo('.trans_char', .75, {
                                y: "100%"
                            }, {
                                ease: 'power2.out',
                                y: '0%',
                                stagger: 0.01,
                                onStart: function () {

                                    if ($('.a-page-transitions').hasClass('dark')) {
                                        var firstColor = 'hsla(0, 0%, 100%, .2)',
                                            secondColor = '#fff';
                                    } else {
                                        var firstColor = 'rgba(25,27,29,.6)',
                                            secondColor = '#000';
                                    }

                                    let tl = gsap.timeline({
                                        once: true,
                                        delay: .5
                                    });

                                    tl.to('.trans_char', {
                                        color: secondColor,
                                        duration: .3,
                                        stagger: .02,
                                        ease: 'none'
                                    })

                                    tl.to('.trans_char', {
                                        color: firstColor,
                                        duration: .3,
                                        stagger: .02,

                                        ease: 'none'
                                    })

                                }
                            }, .3)

                        }

                    })

                },
                enter() {

                    return new Promise(function (resolve, reject) {

                        var trans = $('.a-page-transitions'),
                            bg = $('.apt-bg'),
                            text = $('.trans-text');

                        if (siteHeader.hasClass('menu-has-open')) {

                            gsap.fromTo('.trans_char', .75, {
                                y: "0%"
                            }, {
                                ease: 'power2.in',
                                y: '-100%',
                                stagger: 0.01,
                                delay: .35
                            })

                            gsap.set(menuBackOv, {
                                display: 'none'
                            })


                            gsap.to(menuOv, .75, {
                                delay: 1,
                                cssRule: {
                                    height: 0
                                },
                                ease: 'power2.inOut',
                                onStart: function () {


                                    resolve();

                                },
                                onComplete: function () {

                                    gsap.set(trans, {
                                        visibility: 'hidden'
                                    })



                                    siteHeader.removeClass('menu-has-open');
                                    $('.menu-toggle').removeClass('is-active');
                                    $('.site-navigation, .header-wrapper').removeClass('menu-opened')



                                    $('.site-navigation ul').removeClass('hidden')
                                    $('.site-navigation ul').removeClass('opened');
                                    $('.sub-back').removeClass('is-active');

                                    enableScroll();

                                    gsap.set(menuBackOv, {
                                        display: 'block'
                                    })



                                    $('.menu-toggle').data('clicks', false);

                                }
                            })


                        } else {

                            var transOut = gsap.timeline({
                                delay: 1,
                                onStart: function () {
                                    resolve()

                                },
                                onComplete: function () {

                                    gsap.set(trans, {
                                        visibility: 'hidden'
                                    })
                                }
                            });

                            transOut.fromTo(bg, .7, {
                                height: '100%'
                            }, {
                                height: '0%',
                                onStart: function () {
                                    gsap.set(bg, {
                                        top: 0,
                                        bottom: 'unset'
                                    })


                                },
                                ease: 'power2.inOut',
                            }, .5)

                            transOut.fromTo('.trans_char', .75, {
                                y: "0%"
                            }, {
                                ease: 'power2.in',
                                y: '-100%',
                                stagger: 0.01
                            }, 0)

                        }
                    })



                }
                    }, {
                name: 'fs-image-trans',
                from: {
                    namespace: [
                                    'fs-slider'
                                ]
                },
                to: {
                    namespace: [
                                    'pph2'
                                ]
                },
                leave() {

                    return new Promise(function (resolve, reject) {

                        var project = $('.fs-project.active'),
                            titChars = project.find('.fs-tit-char span'),
                            mets = project.find('.fs-meta > span'),
                            fsImageTrans = gsap.timeline({
                                onComplete: function () {
                                    resolve()

                                }
                            });

                        fsImageTrans.fromTo(titChars, .6, {
                            x: 0,

                        }, {
                            x: -100,
                            stagger: 0.01,
                            ease: 'power1.in',

                        }, 0)


                        fsImageTrans.fromTo('.fs-fraction span', .6, {
                            x: 0,
                            opacity: 1
                        }, {
                            x: -30,
                            opacity: 0,
                            ease: 'power2.in',
                        }, .6)

                        fsImageTrans.fromTo(mets, .6, {
                            x: 0,
                            opacity: 1
                        }, {
                            x: -30,
                            opacity: 0,
                            ease: 'power2.in',
                        }, .3);

                        fsImageTrans.fromTo('.fs-button a', 1, {
                            x: '0%',
                        }, {
                            x: '-100%',
                            opacity: 0,
                            ease: 'power2.in',
                        }, 0)

                        fsImageTrans.fromTo('.showcase-footer', 1, {
                            opacity: 1
                        }, {
                            opacity: 0,
                            ease: 'power2.in',
                            onComplete: function () {


                                // get the image

                                var project = $('.fs-project-image.swiper-slide-active'),
                                    imageURL = project.find('img').attr('src');


                                $('body').append('<div class="trans-image"><div class="trans-image-wrap"><img src="' + imageURL + '"></div></div>');

                                gsap.set('.trans-image', {
                                    width: '100%',
                                    height: '100%'
                                })
                                // get the image

                            }
                        }, .3)


                    })

                },
                enter() {


                    return new Promise(function (resolve, reject) {

                        gsap.to('.trans-image', {
                            height: '100vh',
                            duration: 1,
                            ease: 'power2.out',
                            onComplete: function () {

                                resolve();
                                $('.trans-image').remove();

                            }
                        })

                    })





                }

                    }, {
                name: 'fs-image-trans-half',
                from: {
                    namespace: [
                                    'fs-slider'
                                ]
                },
                to: {
                    namespace: [
                                    'pph1'
                                ]
                },
                leave() {

                    return new Promise(function (resolve, reject) {


                        var project = $('.fs-project.active'),
                            titChars = project.find('.fs-tit-char span'),
                            mets = project.find('.fs-meta > span'),
                            fsImageTrans = gsap.timeline({
                                once: true,
                                onComplete: function () {
                                    resolve();
                                }
                            });

                        fsImageTrans.fromTo(titChars, .6, {
                            x: 0,

                        }, {
                            x: -100,
                            stagger: 0.01,
                            ease: 'power1.in',

                        }, 0)


                        fsImageTrans.fromTo('.fs-fraction span', .6, {
                            x: 0,
                            opacity: 1
                        }, {
                            x: -30,
                            opacity: 0,
                            ease: 'power2.in',
                        }, .6)

                        fsImageTrans.fromTo(mets, .6, {
                            x: 0,
                            opacity: 1
                        }, {
                            x: -30,
                            opacity: 0,
                            ease: 'power2.in',
                        }, .3);

                        fsImageTrans.fromTo('.fs-button a', 1, {
                            x: '0%',
                        }, {
                            x: '-100%',
                            opacity: 0,
                            ease: 'power2.in',
                        }, 0)

                        fsImageTrans.fromTo('.showcase-footer', 1, {
                            opacity: 1
                        }, {
                            opacity: 0,
                            ease: 'power2.in',
                            onComplete: function () {


                                // get the image

                                var project = $('.fs-project-image.swiper-slide-active'),
                                    imageURL = project.find('img').attr('src');


                                $('body').append('<div class="trans-image"><div class="trans-image-wrap"><img src="' + imageURL + '"></div></div>');

                                gsap.set('.trans-image', {
                                    width: '100%',
                                    height: '100%'
                                })
                                // get the image

                            }
                        }, .3)
                    })


                },
                enter() {

                    return new Promise(function (resolve, reject) {

                        gsap.set('#page', {
                            visibility: 'hidden'
                        })

                        const mobileQuery = window.matchMedia('(max-width: 450px)')
                        if (mobileQuery.matches) {
                            var projHeg = '65vh'

                        } else {
                            var projHeg = '55vh'
                        }

                        gsap.to('.trans-image', {
                            height: projHeg,
                            duration: 1.5,
                            delay: 1,
                            ease: 'power2.inOut',
                            onStart: function () {

                                gsap.set('#page', {
                                    visibility: 'hidden'
                                })
                            },
                            onComplete: function () {

                                $('.trans-image').remove();
                                resolve();
                                gsap.set('#page', {
                                    visibility: 'visible'
                                })

                            }
                        })

                    })

                }

                    }, {
                name: 'sc-image-trans',
                from: {
                    namespace: [
                                    'sc-carousel'
                                ]
                },
                to: {
                    namespace: [
                                    'pph2'
                                ]
                },
                leave() {

                    return new Promise(function (resolve, reject) {

                        disableScroll();

                        var project = $('.cs-title.active').data('project'),
                            img = $(project).find('img'),
                            imgURL = img.attr('src'),
                            ofLeft = $(project).offset().left;




                        new SplitText('.cs-title a', {
                            type: 'chars',
                            charsClass: 'cst_char'
                        })


                        var scImageTrans = gsap.timeline({

                        });

                        scImageTrans.fromTo('.cst_char', 1, {
                            y: '0%',

                        }, {
                            y: '-110%',
                            stagger: 0.01,
                            ease: 'power1.in',

                        }, 0)

                        scImageTrans.fromTo('.cas-progress', 1, {
                            width: '50%',

                        }, {
                            width: '0%',
                            ease: 'power1.in',

                        }, 0)


                        scImageTrans.fromTo('.showcase-footer', 1, {
                            opacity: 1
                        }, {
                            opacity: 0,
                            ease: 'power2.in',
                            onComplete: function () {


                                // get the image



                                $('body').append('<div class="trans-image"><div class="trans-image-wrap"><img src="' + imgURL + '"></div></div>');


                                const mobileQuery = window.matchMedia('(max-width: 450px)')
                                if (mobileQuery.matches) {

                                    gsap.set('.trans-image', {
                                        width: '80vw',
                                        height: '60vh',
                                        top: '50%',
                                        y: '-50%',
                                        left: ofLeft
                                    })
                                    // get the image


                                } else {

                                    gsap.set('.trans-image', {
                                        width: '50vw',
                                        height: '50vh',
                                        top: '50%',
                                        y: '-50%',
                                        left: ofLeft
                                    })
                                    // get the image

                                }


                                let imageHalf = gsap.timeline();

                                imageHalf.to('.trans-image', 1, {
                                    width: '100%',
                                    left: 0,
                                    ease: 'power2.inOut',

                                    height: '100vh',
                                    onComplete: function () {
                                        resolve()

                                    }
                                })



                            }
                        }, .3)



                    })

                },
                enter() {

                    $('.trans-image').remove();
                    enableScroll();

                }

                    }, {
                name: 'sc-image-trans-half',
                from: {
                    namespace: [
                                    'sc-carousel'
                                ]
                },
                to: {
                    namespace: [
                                    'pph1'
                                ]
                },
                leave() {

                    return new Promise(function (resolve, reject) {

                        disableScroll();

                        var project = $('.cs-title.active').data('project'),
                            img = $(project).find('img'),
                            imgURL = img.attr('src'),
                            ofLeft = $(project).offset().left;


                        new SplitText('.cs-title a', {
                            type: 'chars',
                            charsClass: 'cst_char'
                        })

                        var scImageTrans = gsap.timeline();

                        scImageTrans.fromTo('.cst_char', 1, {
                            y: '0%',

                        }, {
                            y: '-110%',
                            stagger: 0.01,
                            ease: 'power1.in',

                        }, 0)

                        scImageTrans.fromTo('.cas-progress', 1, {
                            width: '50%',

                        }, {
                            width: '0%',
                            ease: 'power1.in',

                        }, 0)


                        scImageTrans.fromTo('.showcase-footer', 1, {
                            opacity: 1
                        }, {
                            opacity: 0,
                            ease: 'power2.in',
                            onComplete: function () {


                                // get the image

                                $('body').append('<div class="trans-image"><div class="trans-image-wrap"><img src="' + imgURL + '"></div></div>');


                                const mobileQuery = window.matchMedia('(max-width: 450px)')
                                if (mobileQuery.matches) {

                                    gsap.set('.trans-image', {
                                        width: '80vw',
                                        height: '60vh',
                                        top: '50%',
                                        y: '-50%',
                                        left: ofLeft
                                    })
                                    // get the image


                                } else {

                                    gsap.set('.trans-image', {
                                        width: '50vw',
                                        height: '50vh',
                                        top: '50%',
                                        y: '-50%',
                                        left: ofLeft
                                    })
                                    // get the image

                                }

                                let imageHalf = gsap.timeline();

                                imageHalf.to('.trans-image', 1, {
                                    width: '100%',
                                    left: 0,
                                    ease: 'power2.inOut',
                                    height: '100%',
                                    onComplete: function () {

                                        gsap.set('.trans-image', {
                                            y: '0%',
                                            top: '0%'
                                        })
                                        resolve()

                                    }
                                })



                            }
                        }, .3)



                    })

                },
                enter() {

                    return new Promise(function (resolve, reject) {

                        gsap.set('#page', {
                            visibility: 'hidden'
                        })

                        const mobileQuery = window.matchMedia('(max-width: 450px)')
                        if (mobileQuery.matches) {
                            var projHeg = '65vh'

                        } else {
                            var projHeg = '55vh'
                        }


                        gsap.to('.trans-image', {
                            height: projHeg,
                            duration: 1.5,
                            delay: 1,
                            ease: 'power2.inOut',
                            onComplete: function () {

                                $('.trans-image').remove();

                                resolve();

                                gsap.set('#page', {
                                    visibility: 'visible'
                                })



                                enableScroll();
                            }
                        })

                    })



                }

                    }, {
                name: 'fss-image-trans',
                from: {
                    namespace: [
                                    'fs-slideshow'
                                ]
                },
                to: {
                    namespace: [
                                    'pph2'
                                ]
                },
                leave() {


                    return new Promise(function (resolve, reject) {

                        disableScroll();

                        var project = $('.ss1-image-wrap.swiper-slide-active'),
                            activeProj = $('.ss-project.active'),
                            activeChars = activeProj.find('.st-char'),
                            catChars = activeProj.find('.cat_char'),
                            sumLines = activeProj.find('.suml-wrap'),
                            img = project.find('img'),
                            imgURL = img.attr('src');


                        var scImageTrans = gsap.timeline();

                        scImageTrans.fromTo(activeChars, 1, {
                            y: '0%',

                        }, {
                            y: '-110%',
                            stagger: 0.01,
                            ease: 'power1.in',

                        }, 0)

                        scImageTrans.fromTo(catChars, 1, {
                            y: '0%',

                        }, {
                            y: '-110%',
                            stagger: 0.01,
                            ease: 'power1.in',

                        }, 0)

                        scImageTrans.fromTo(sumLines, 1, {
                            y: '0%',

                        }, {
                            y: '-110%',
                            stagger: 0.01,
                            ease: 'power1.in',

                        }, 0)

                        scImageTrans.fromTo('.ss1-nav', 1, {
                            opacity: 1,

                        }, {
                            opacity: 0,
                            ease: 'power1.in',

                        }, 0)

                        scImageTrans.fromTo('.ss1-fraction', 1, {
                            opacity: 1,

                        }, {
                            opacity: 0,
                            ease: 'power1.in',

                        }, 0)

                        scImageTrans.fromTo('.ss1-dots .swiper-pagination-bullet', 1, {
                            opacity: 1,
                            x: 0,

                        }, {
                            x: -50,
                            opacity: 0,
                            stagger: 0.02,
                            ease: 'power1.in',
                            onComplete: function () {

                                // get the image

                                $('body').append('<div class="trans-image"><div class="trans-image-wrap"><img src="' + imgURL + '"></div></div>');

                                const mobileQuery = window.matchMedia('(max-width: 450px)')
                                if (mobileQuery.matches) {

                                    gsap.set('.trans-image', {
                                        width: '100%',
                                        height: '100%',
                                        top: '0%',
                                        left: '0%',
                                        y: '0%',

                                    })


                                } else {

                                    gsap.set('.trans-image', {
                                        width: '50%',
                                        height: '62%',
                                        top: '50%',
                                        left: '15%',
                                        y: '-50%',

                                    })

                                }


                                // get the image

                                let imageHalf = gsap.timeline();

                                imageHalf.to('.trans-image', 1, {
                                    height: '100%',
                                    width: '100%',
                                    left: 0,
                                    ease: 'power2.inOut',
                                    onComplete: function () {
                                        gsap.set('.trans-image', {
                                            y: '0%',
                                            top: '0%'
                                        })
                                        resolve()

                                    }
                                })

                            }

                        }, 0)



                    })

                },
                enter() {

                    return new Promise(function (resolve, reject) {

                        gsap.to('.trans-image', {
                            height: '100vh',
                            duration: 1,
                            ease: 'power2.out',
                            onComplete: function () {

                                resolve();
                                $('.trans-image').remove();

                            }
                        })

                    })

                }

                    }, {
                name: 'fss-image-trans-half',
                from: {
                    namespace: [
                                    'fs-slideshow'
                                ]
                },
                to: {
                    namespace: [
                                    'pph1'
                                ]
                },
                leave() {

                    return new Promise(function (resolve, reject) {

                        disableScroll();

                        var project = $('.ss1-image-wrap.swiper-slide-active'),
                            activeProj = $('.ss-project.active'),
                            activeChars = activeProj.find('.st-char'),
                            catChars = activeProj.find('.cat_char'),
                            sumLines = activeProj.find('.suml-wrap'),
                            img = project.find('img'),
                            imgURL = img.attr('src');


                        var scImageTrans = gsap.timeline();

                        scImageTrans.fromTo(activeChars, 1, {
                            y: '0%',

                        }, {
                            y: '-110%',
                            stagger: 0.01,
                            ease: 'power1.in',

                        }, 0)

                        scImageTrans.fromTo(catChars, 1, {
                            y: '0%',

                        }, {
                            y: '-110%',
                            stagger: 0.01,
                            ease: 'power1.in',

                        }, 0)

                        scImageTrans.fromTo(sumLines, 1, {
                            y: '0%',

                        }, {
                            y: '-110%',
                            stagger: 0.01,
                            ease: 'power1.in',

                        }, 0)

                        scImageTrans.fromTo('.ss1-nav', 1, {
                            opacity: 1,

                        }, {
                            opacity: 0,
                            ease: 'power1.in',

                        }, 0)

                        scImageTrans.fromTo('.ss1-fraction', 1, {
                            opacity: 1,

                        }, {
                            opacity: 0,
                            ease: 'power1.in',

                        }, 0)

                        scImageTrans.fromTo('.ss1-dots .swiper-pagination-bullet', 1, {
                            opacity: 1,
                            x: 0,

                        }, {
                            x: -50,
                            opacity: 0,
                            stagger: 0.02,
                            ease: 'power1.in',
                            onComplete: function () {

                                // get the image

                                $('body').append('<div class="trans-image"><div class="trans-image-wrap"><img src="' + imgURL + '"></div></div>');

                                const mobileQuery = window.matchMedia('(max-width: 450px)')
                                if (mobileQuery.matches) {

                                    gsap.set('.trans-image', {
                                        width: '100%',
                                        height: '100%',
                                        top: '0%',
                                        left: '0%',
                                        y: '0%',

                                    })


                                } else {

                                    gsap.set('.trans-image', {
                                        width: '50%',
                                        height: '62%',
                                        top: '50%',
                                        left: '15%',
                                        y: '-50%',

                                    })

                                }

                                // get the image

                                let imageHalf = gsap.timeline();

                                imageHalf.to('.trans-image', 1, {
                                    height: '100%',
                                    width: '100%',
                                    left: 0,
                                    ease: 'power2.inOut',
                                    onComplete: function () {
                                        gsap.set('.trans-image', {
                                            y: '0%',
                                            top: '0%'
                                        })
                                        resolve()

                                    }
                                })

                            }

                        }, 0)



                    })

                },
                enter() {

                    return new Promise(function (resolve, reject) {

                        gsap.set('#page', {
                            visibility: 'hidden'
                        })

                        const mobileQuery = window.matchMedia('(max-width: 450px)')
                        if (mobileQuery.matches) {
                            var projHeg = '65vh'

                        } else {
                            var projHeg = '55vh'
                        }

                        gsap.to('.trans-image', {
                            height: projHeg,
                            duration: 1.5,
                            delay: .5,
                            ease: 'power2.inOut',
                            onComplete: function () {

                                $('.trans-image').remove();

                                resolve();
                                gsap.set('#page', {
                                    visibility: 'visible'
                                })

                                enableScroll();
                            }
                        })

                    })



                }

                    }, {
                name: 'fswall-image-trans-half',
                from: {
                    namespace: [
                                    'fs-wall'
                                ]
                },
                to: {
                    namespace: [
                                    'pph1'
                                ]
                },
                leave() {

                    return new Promise(function (resolve, reject) {

                        disableScroll();

                        var project = $('.fw-project.active').data('image'),
                            img = $(project).find('img'),
                            imgURL = img.attr('src'),
                            dashs = CSSRulePlugin.getRule('.fw-project::after');



                        var scImageTrans = gsap.timeline();

                        scImageTrans.fromTo('.fw-project a', 1, {
                            y: '0%',

                        }, {
                            y: '-150%',
                            stagger: 0.05,
                            ease: 'power1.in',
                            onStart: function () {
                                // get the image

                                $('body').append('<div class="trans-image"><div class="trans-image-wrap"><img src="' + imgURL + '"></div></div>');

                                $('.fw-images').hide();

                                const mobileQuery = window.matchMedia('(max-width: 450px)')
                                if (mobileQuery.matches) {
                                    gsap.set('.trans-image', {
                                        width: '100%',
                                        height: '100%',
                                        top: '0',
                                        right: '0',
                                        left: 'unset',
                                        zIndex: -1

                                    })
                                    // get the image

                                } else {
                                    gsap.set('.trans-image', {
                                        width: '50%',
                                        height: '100%',
                                        top: '0',
                                        right: '0',
                                        left: 'unset',
                                        zIndex: -1

                                    })
                                    // get the image
                                }




                            }

                        }, 0)

                        scImageTrans.fromTo(dashs, 1, {
                            cssRule: {
                                y: '0%',
                            }

                        }, {
                            cssRule: {
                                y: '-150%',
                            },
                            stagger: 0.05,
                            ease: 'power1.in',

                        }, .2)


                        scImageTrans.fromTo('.showcase-footer', .5, {
                            opacity: 1
                        }, {
                            opacity: 0,
                            ease: 'power1.in',
                            onComplete: function () {

                                let imageHalf = gsap.timeline();

                                imageHalf.to('.trans-image', 1, {
                                    width: '100%',
                                    ease: 'power2.inOut',
                                    onComplete: function () {

                                        gsap.set('.trans-image', {
                                            y: '0%',
                                            top: '0%'
                                        })
                                        resolve()

                                    }
                                })


                            }

                        }, 0)



                    })

                },
                enter() {

                    return new Promise(function (resolve, reject) {

                        gsap.set('#page', {
                            visibility: 'hidden'
                        })

                        const mobileQuery = window.matchMedia('(max-width: 450px)')
                        if (mobileQuery.matches) {
                            var projHeg = '65vh'

                        } else {
                            var projHeg = '55vh'
                        }


                        gsap.to('.trans-image', {
                            height: projHeg,
                            duration: 1.5,
                            delay: .5,
                            ease: 'power2.inOut',
                            onComplete: function () {

                                $('.trans-image').remove();

                                resolve();

                                gsap.set('#page', {
                                    visibility: 'visible'
                                })

                                enableScroll();
                            }
                        })

                    })



                }

                    }, {
                name: 'fswall-image-trans',
                from: {
                    namespace: [
                                    'fs-wall'
                                ]
                },
                to: {
                    namespace: [
                                    'pph2'
                                ]
                },
                leave() {

                    return new Promise(function (resolve, reject) {

                        disableScroll();

                        var project = $('.fw-project.active').data('image'),
                            img = $(project).find('img'),
                            imgURL = img.attr('src'),
                            dashs = CSSRulePlugin.getRule('.fw-project::after');



                        var scImageTrans = gsap.timeline();

                        scImageTrans.fromTo('.fw-project a', 1, {
                            y: '0%',

                        }, {
                            y: '-150%',
                            stagger: 0.05,
                            ease: 'power1.in',
                            onStart: function () {
                                // get the image

                                $('body').append('<div class="trans-image"><div class="trans-image-wrap"><img src="' + imgURL + '"></div></div>');

                                $('.fw-images').hide();

                                const mobileQuery = window.matchMedia('(max-width: 450px)')
                                if (mobileQuery.matches) {
                                    gsap.set('.trans-image', {
                                        width: '100%',
                                        height: '100%',
                                        top: '0',
                                        right: '0',
                                        left: 'unset',
                                        zIndex: -1

                                    })

                                } else {
                                    gsap.set('.trans-image', {
                                        width: '50%',
                                        height: '100%',
                                        top: '0',
                                        right: '0',
                                        left: 'unset',
                                        zIndex: -1

                                    })
                                    // get the image
                                }

                            }

                        }, 0)

                        scImageTrans.fromTo(dashs, 1, {
                            cssRule: {
                                y: '0%',
                            }

                        }, {
                            cssRule: {
                                y: '-150%',
                            },
                            stagger: 0.05,
                            ease: 'power1.in',

                        }, .2)


                        scImageTrans.fromTo('.showcase-footer', .5, {
                            opacity: 1
                        }, {
                            opacity: 0,
                            ease: 'power1.in',
                            onComplete: function () {

                                let imageHalf = gsap.timeline();

                                imageHalf.to('.trans-image', 1, {
                                    width: '100%',
                                    ease: 'power2.inOut',
                                    onComplete: function () {

                                        gsap.set('.trans-image', {
                                            y: '0%',
                                            top: '0%'
                                        })
                                        resolve()

                                    }
                                })


                            }

                        }, 0)
                    })

                },
                enter() {

                    return new Promise(function (resolve, reject) {

                        gsap.to('.trans-image', {
                            height: '100vh',
                            duration: 1,
                            ease: 'power2.out',
                            onComplete: function () {

                                resolve();
                                $('.trans-image').remove();

                            }
                        })

                    })
                }

                    }, {
                name: 'scwall-image-trans',
                from: {
                    namespace: [
                                    'sc-wall'
                                ]
                },
                to: {
                    namespace: [
                                    'pph2'
                                ]
                },
                leave() {

                    return new Promise(function (resolve, reject) {

                        disableScroll();

                        var project = $('.wall-project.hovered').data('image'),
                            img = $(project).find('img'),
                            imgURL = img.attr('src');



                        var scImageTrans = gsap.timeline();

                        scImageTrans.to('.wall-projects-top', 2, {
                            x: '100%',
                            stagger: 0.05,
                            ease: 'power2.inOut',
                            onStart: function () {
                                // get the image

                                $('body').addClass('loading');

                                $('body').append('<div class="trans-image"><div class="trans-image-wrap"><img src="' + imgURL + '"></div></div>');

                                const mobileQuery = window.matchMedia('(max-width: 450px)')

                                if (mobileQuery.matches) {

                                    gsap.set('.trans-image', {
                                        width: '84%',
                                        height: '70%',
                                        top: '50%',
                                        left: '50%',
                                        y: '-50%',
                                        x: '-50%',
                                        zIndex: -1
                                    })

                                    $('.wall-images').remove();


                                } else {


                                    gsap.set('.trans-image', {
                                        width: '30%',
                                        height: '70%',
                                        top: '50%',
                                        left: '50%',
                                        y: '-50%',
                                        x: '-50%',
                                        zIndex: -1
                                    })

                                    $('.wall-images').remove();



                                }

                                // get the image


                            }

                        }, 0)

                        scImageTrans.to('.wall-projects-bottom', 2, {
                            x: '-100%',
                            stagger: 0.05,
                            ease: 'power2.inOut',

                        }, 0)

                        scImageTrans.to('.wall-drag', 1, {
                            width: '0%',
                            ease: 'power2.inOut',

                        }, 0)

                        scImageTrans.fromTo('.showcase-footer', .5, {
                            opacity: 1
                        }, {
                            opacity: 0,
                            ease: 'power1.in',
                            onComplete: function () {


                                let imageHalf = gsap.timeline();

                                imageHalf.to('.trans-image', 1, {
                                    width: '100%',
                                    height: '100%',
                                    ease: 'power2.inOut',
                                    onComplete: function () {

                                        gsap.set('.trans-image', {
                                            y: '0%',
                                            top: '0%',
                                            zIndex: 'unset'
                                        })
                                        resolve()

                                    }
                                })


                            }

                        }, 0)
                    })

                },
                enter() {

                    return new Promise(function (resolve, reject) {

                        gsap.to('.trans-image', {
                            height: '100vh',
                            duration: 1,
                            ease: 'power2.out',
                            onComplete: function () {

                                resolve();
                                $('.trans-image').remove();
                                $('body').removeClass('loading');

                            }
                        })

                    })

                }

                    }, {
                name: 'scwall-image-trans-half',
                from: {
                    namespace: [
                                    'sc-wall'
                                ]
                },
                to: {
                    namespace: [
                                    'pph1'
                                ]
                },
                leave() {

                    return new Promise(function (resolve, reject) {

                        disableScroll();

                        var project = $('.wall-project.hovered').data('image'),
                            img = $(project).find('img'),
                            imgURL = img.attr('src');



                        var scImageTrans = gsap.timeline();

                        scImageTrans.to('.wall-projects-top', 2, {
                            x: '100%',
                            stagger: 0.05,
                            ease: 'power2.inOut',
                            onStart: function () {
                                // get the image

                                $('body').addClass('loading');

                                $('body').append('<div class="trans-image"><div class="trans-image-wrap"><img src="' + imgURL + '"></div></div>');

                                const mobileQuery = window.matchMedia('(max-width: 450px)')

                                if (mobileQuery.matches) {

                                    gsap.set('.trans-image', {
                                        width: '84%',
                                        height: '70%',
                                        top: '50%',
                                        left: '50%',
                                        y: '-50%',
                                        x: '-50%',
                                        zIndex: -1
                                    })

                                    $('.wall-images').remove();


                                } else {


                                    gsap.set('.trans-image', {
                                        width: '30%',
                                        height: '70%',
                                        top: '50%',
                                        left: '50%',
                                        y: '-50%',
                                        x: '-50%',
                                        zIndex: -1
                                    })

                                    $('.wall-images').remove();



                                }

                                // get the image


                            }

                        }, 0)

                        scImageTrans.to('.wall-projects-bottom', 2, {
                            x: '-100%',
                            stagger: 0.05,
                            ease: 'power2.inOut',

                        }, 0)

                        scImageTrans.to('.wall-drag', 1, {
                            width: '0%',
                            ease: 'power2.inOut',

                        }, 0)


                        scImageTrans.fromTo('.showcase-footer', .5, {
                            opacity: 1
                        }, {
                            opacity: 0,
                            ease: 'power1.in',
                            onComplete: function () {

                                $('body').removeClass('loading');

                                let imageHalf = gsap.timeline();


                                imageHalf.to('.trans-image', 1, {
                                    width: '100%',
                                    height: '100%',
                                    ease: 'power2.inOut',
                                    onComplete: function () {

                                        gsap.set('.trans-image', {
                                            y: '0%',
                                            top: '0%',
                                            zIndex: 'unset'
                                        })
                                        resolve()

                                    }
                                })


                            }

                        }, 0)
                    })

                },
                enter() {
                    return new Promise(function (resolve, reject) {

                        gsap.set('#page', {
                            visibility: 'hidden'
                        })

                        const mobileQuery = window.matchMedia('(max-width: 450px)')
                        if (mobileQuery.matches) {
                            var projHeg = '65vh'

                        } else {
                            var projHeg = '55vh'
                        }


                        gsap.to('.trans-image', {
                            height: projHeg,
                            duration: 1.5,
                            delay: 1,
                            ease: 'power2.inOut',
                            onComplete: function () {

                                $('.trans-image').remove();

                                resolve();

                                gsap.set('#page', {
                                    visibility: 'visible'
                                })



                                enableScroll();
                            }
                        })

                    })

                }

                    }, {
                name: 'scslideshow-image-trans',
                from: {
                    namespace: [
                                    'sc-slideshow'
                                ]
                },
                to: {
                    namespace: [
                                    'pph2'
                                ]
                },
                leave() {

                    return new Promise(function (resolve, reject) {

                        disableScroll();

                        var project = $('.swiper-slide.swiper-slide-active'),
                            img = project.find('img'),
                            activeProj = $('.ss2-project.active'),
                            titChars = activeProj.find('.title-char'),
                            cat = activeProj.find('.ss2-project-cat span'),
                            summLines = activeProj.find('.excerpt-line span'),
                            imgURL = img.attr('src');

                        var scImageTrans = gsap.timeline();

                        scImageTrans.to(titChars, 1, {
                            y: '-100%',
                            stagger: 0.02,
                            ease: 'power2.in',
                            onStart: function () {
                                // get the image

                                $('body').append('<div class="trans-image"><div class="trans-image-wrap"><img src="' + imgURL + '"></div></div>');

                                const mobileQuery = window.matchMedia('(max-width: 450px)')
                                if (mobileQuery.matches) {

                                    gsap.set('.trans-image', {
                                        width: '100%',
                                        height: '100%',
                                        top: '0',
                                        right: '0',
                                        y: '0',
                                        zIndex: -1

                                    })


                                } else {


                                    gsap.set('.trans-image', {
                                        width: '35%',
                                        height: '70%',
                                        top: '50%',
                                        left: 'unset',
                                        right: '8.5%',
                                        y: '-50%'

                                    })

                                }
                                // get the image


                            }
                        }, 0)

                        scImageTrans.to(cat, .4, {
                            y: '-100%',
                            ease: 'power2.in',
                        }, 0)

                        scImageTrans.to(summLines, .75, {
                            y: '-100%',
                            stagger: 0.05,
                            ease: 'power2.in',
                        }, 0)

                        scImageTrans.to('.ss2-dot', .5, {
                            x: '-30',
                            opacity: 0,
                            stagger: 0.05,
                            ease: 'power2.in',
                        }, 0)

                        scImageTrans.to('.ss2-nav', .5, {
                            opacity: 0,
                            ease: 'power2.in',
                        }, 0)

                        scImageTrans.fromTo('.showcase-footer', .5, {
                            opacity: 1
                        }, {
                            opacity: 0,
                            ease: 'power1.in',
                            onComplete: function () {

                                let imageHalf = gsap.timeline();

                                imageHalf.to('.trans-image', 1, {
                                    width: '100%',
                                    height: '100%',
                                    right: '0%',
                                    ease: 'power2.inOut',
                                    onComplete: function () {

                                        gsap.set('.trans-image', {
                                            y: '0%',
                                            top: '0%'
                                        })
                                        resolve()

                                    }
                                })


                            }

                        }, 0)
                    })

                },
                enter() {

                    $('.trans-image').remove();

                    enableScroll();

                }

                    }, {
                name: 'scslideshow-image-trans-half',
                from: {
                    namespace: [
                                    'sc-slideshow'
                                ]
                },
                to: {
                    namespace: [
                                    'pph1'
                                ]
                },
                leave() {

                    return new Promise(function (resolve, reject) {

                        disableScroll();

                        var project = $('.swiper-slide.swiper-slide-active'),
                            img = project.find('img'),
                            activeProj = $('.ss2-project.active'),
                            titChars = activeProj.find('.title-char'),
                            cat = activeProj.find('.ss2-project-cat span'),
                            summLines = activeProj.find('.excerpt-line span'),
                            imgURL = img.attr('src');

                        var scImageTrans = gsap.timeline();

                        scImageTrans.to(titChars, 1, {
                            y: '-100%',
                            stagger: 0.02,
                            ease: 'power2.in',
                            onStart: function () {
                                // get the image

                                $('body').append('<div class="trans-image"><div class="trans-image-wrap"><img src="' + imgURL + '"></div></div>');

                                const mobileQuery = window.matchMedia('(max-width: 450px)')
                                if (mobileQuery.matches) {

                                    gsap.set('.trans-image', {
                                        width: '100%',
                                        height: '100%',
                                        top: '0',
                                        right: '0',
                                        y: '0',
                                        zIndex: -1

                                    })

                                } else {


                                    gsap.set('.trans-image', {
                                        width: '35%',
                                        height: '70%',
                                        top: '50%',
                                        left: 'unset',
                                        right: '8.5%',
                                        y: '-50%'

                                    })

                                }

                                // get the image


                            }
                        }, 0)

                        scImageTrans.to(cat, .4, {
                            y: '-100%',
                            ease: 'power2.in',
                        }, 0)

                        scImageTrans.to(summLines, .75, {
                            y: '-100%',
                            stagger: 0.05,
                            ease: 'power2.in',
                        }, 0)

                        scImageTrans.to('.ss2-dot', .5, {
                            x: '-30',
                            opacity: 0,
                            stagger: 0.05,
                            ease: 'power2.in',
                        }, 0)

                        scImageTrans.to('.ss2-nav', .5, {
                            opacity: 0,
                            ease: 'power2.in',
                        }, 0)

                        scImageTrans.fromTo('.showcase-footer', .5, {
                            opacity: 1
                        }, {
                            opacity: 0,
                            ease: 'power1.in',
                            onComplete: function () {

                                let imageHalf = gsap.timeline();

                                imageHalf.to('.trans-image', 1, {
                                    width: '100%',
                                    height: '100%',
                                    right: '0%',
                                    ease: 'power2.inOut',
                                    onComplete: function () {

                                        gsap.set('.trans-image', {
                                            y: '0%',
                                            top: '0%'
                                        })
                                        resolve()

                                    }
                                })


                            }

                        }, 0)
                    })

                },
                enter() {

                    return new Promise(function (resolve, reject) {

                        gsap.set('#page', {
                            visibility: 'hidden'
                        })

                        const mobileQuery = window.matchMedia('(max-width: 450px)')
                        if (mobileQuery.matches) {
                            var projHeg = '65vh'

                        } else {
                            var projHeg = '55vh'
                        }


                        gsap.to('.trans-image', {
                            height: projHeg,
                            duration: 1.5,
                            delay: 1,
                            ease: 'power2.inOut',
                            onComplete: function () {

                                $('.trans-image').remove();

                                resolve();

                                gsap.set('#page', {
                                    visibility: 'visible'
                                })



                                enableScroll();
                            }
                        })

                    })

                }

                    }, {
                name: 'sclist-image-trans',
                from: {
                    namespace: [
                                    'sc-list'
                                ]
                },
                to: {
                    namespace: [
                                    'pph2'
                                ]
                },
                leave() {

                    return new Promise(function (resolve, reject) {

                        disableScroll();

                        var project = $('.sl-project-image.active'),
                            ofLeft = $('.sl-images').position().left,
                            ofTop = $('.sl-images').position().top,
                            img = project.find('img'),
                            imgURL = img.attr('src');

                        var scImageTrans = gsap.timeline();

                        scImageTrans.to('.sl-project-title', 1, {
                            y: '-110%',
                            ease: 'power2.in',
                            stagger: 0.05,
                            onStart: function () {


                                // get the image
                                $('body').append('<div class="trans-image"><div class="trans-image-wrap"><img src="' + imgURL + '"></div></div>');

                                const mobileQuery = window.matchMedia('(max-width: 450px)')
                                if (mobileQuery.matches) {

                                    gsap.set('.trans-image', {
                                        position: 'fixed',
                                        width: '90vw',
                                        top: ofTop,
                                        left: ofLeft,
                                        y: '-50%',
                                        x: '-50%',
                                        zIndex: -1

                                    })


                                } else {

                                    gsap.set('.trans-image', {
                                        position: 'fixed',
                                        width: '50vw',
                                        top: ofTop,
                                        left: ofLeft,
                                        y: '-50%',
                                        x: '-50%',
                                        zIndex: -1
                                    })

                                }
                                // get the image

                                $('.sl-images').hide();
                            }

                        }, 0)

                        scImageTrans.to('.sl-project-meta', .6, {
                            y: '100%',
                            ease: 'power2.in',
                            stagger: 0.05,
                        }, 0)

                        var slBef = CSSRulePlugin.getRule('.sl-project::before');

                        scImageTrans.to(slBef, .4, {
                            cssRule: {
                                opacity: 0,
                            },
                        }, 0)

                        scImageTrans.to('.showcase-footer', .4, {
                            opacity: 0,
                            onComplete: function () {

                                let imageHalf = gsap.timeline();

                                imageHalf.to('.trans-image', 1, {
                                    right: '0%',
                                    left: 'unset',
                                    x: '0%',
                                    top: '0%',
                                    y: '0%',
                                    left: '0%',
                                    width: '100%',
                                    height: '100%',
                                    ease: 'power2.inOut',
                                    onComplete: function () {
                                        resolve()

                                    }
                                })




                            }
                        }, 0)

                    })

                },
                enter() {

                    $('.trans-image').remove();

                    enableScroll();

                }

                    }, {
                name: 'sclist-image-trans-half',
                from: {
                    namespace: [
                                    'sc-list'
                                ]
                },
                to: {
                    namespace: [
                                    'pph1'
                                ]
                },
                leave() {

                    return new Promise(function (resolve, reject) {

                        disableScroll();

                        var project = $('.sl-project-image.active'),
                            ofLeft = $('.sl-images').position().left,
                            ofTop = $('.sl-images').position().top,
                            img = project.find('img'),
                            imgURL = img.attr('src');

                        var scImageTrans = gsap.timeline();

                        scImageTrans.to('.sl-project-title', 1, {
                            y: '-110%',
                            ease: 'power2.in',
                            stagger: 0.05,
                            onStart: function () {


                                // get the image
                                $('body').append('<div class="trans-image"><div class="trans-image-wrap"><img src="' + imgURL + '"></div></div>');

                                const mobileQuery = window.matchMedia('(max-width: 450px)')
                                if (mobileQuery.matches) {

                                    gsap.set('.trans-image', {
                                        position: 'fixed',
                                        width: '90vw',
                                        top: ofTop,
                                        left: ofLeft,
                                        y: '-50%',
                                        x: '-50%',
                                        zIndex: -1

                                    })


                                } else {

                                    gsap.set('.trans-image', {
                                        position: 'fixed',
                                        width: '50vw',
                                        top: ofTop,
                                        left: ofLeft,
                                        y: '-50%',
                                        x: '-50%',
                                        zIndex: -1

                                    })

                                }
                                // get the image

                                $('.sl-images').hide();
                            }

                        }, 0)

                        scImageTrans.to('.sl-project-meta', .6, {
                            y: '100%',
                            ease: 'power2.in',
                            stagger: 0.05,
                        }, 0)

                        var slBef = CSSRulePlugin.getRule('.sl-project::before');

                        scImageTrans.to(slBef, .4, {
                            cssRule: {
                                opacity: 0,
                            },
                        }, 0)

                        scImageTrans.to('.showcase-footer', .4, {
                            opacity: 0,
                            onComplete: function () {

                                let imageHalf = gsap.timeline();

                                imageHalf.to('.trans-image', 1, {
                                    right: '0%',
                                    left: 'unset',
                                    x: '0%',
                                    top: '0%',
                                    y: '0%',
                                    left: '0%',
                                    width: '100%',
                                    height: '100%',
                                    ease: 'power2.inOut',
                                    onComplete: function () {
                                        resolve()

                                    }
                                })




                            }
                        }, 0)

                    })

                },
                enter() {

                    return new Promise(function (resolve, reject) {
                        gsap.to('.trans-image', {
                            height: '55vh',
                            duration: 1.5,
                            delay: .5,
                            ease: 'power2.inOut',
                            onComplete: function () {

                                $('.trans-image').remove();

                                resolve();
                                enableScroll();
                            }
                        })

                    })

                }

                    }, {
                name: 'title-trans',
                from: {
                    namespace: [
                        'fs-slider',
                        'fs-slideshow',
                        'fs-wall',
                        'sc-wall',
                        'sc-carousel',
                        'sc-slideshow',
                        'sc-list'
                    ]
                },
                to: {
                    namespace: [
                        'pph3',
                        'pph-video'
                    ]
                },
                leave() {

                    return new Promise(function (resolve, reject) {

                        if ($('.fs-project.active').length) {
                            var activeProject = $('.fs-project.active'),
                                title = activeProject.attr('data-title');

                        } else if ($('.cs-title').length) {

                            var activeProject = $('.cs-title.active'),
                                title = activeProject.find('a').text();

                        } else if ($('.ss-project').length) {

                            var activeProject = $('.ss-project.active'),
                                title = activeProject.data('title');

                        } else if ($('.fw-project').length) {

                            var activeProject = $('.fw-project.active'),
                                title = activeProject.find('.fw-project-title').text();

                        } else if ($('.wall-project').length) {

                            var activeProject = $('.wall-project.hovered'),
                                title = activeProject.find('.project-title').text();

                        } else if ($('.ss2-project').length) {

                            var activeProject = $('.ss2-project.active'),
                                title = activeProject.attr('data-title');

                        } else if ($('.sl-project').length) {

                            var activeProject = $('.sl-project').not('.opdown'),
                                title = activeProject.find('.sl-project-title').text();

                        } else if ($('.next-project-section').length) {

                            var title = $('.next-project-title').text();

                        }

                        var trans = $('.a-page-transitions'),
                            bg = $('.apt-bg'),
                            image = $('.apt-image'),
                            transText = $('.trans-text');

                        transText.html(title)


                        new SplitText('.trans-text', {
                            tyoe: 'chars',
                            charsClass: 'trans-text-char'
                        })
                        // Get the title

                        var ppTitleOut = gsap.timeline({
                            onComplete: function () {
                                resolve();



                            }
                        });

                        ppTitleOut.fromTo(bg, .7, {
                            height: '0%'
                        }, {
                            height: '100%',
                            duration: .7,
                            ease: 'power2.inOut',
                            onStart: function () {

                                gsap.set(trans, {
                                    visibility: 'visible'
                                })

                                gsap.set(bg, {
                                    top: 'unset',
                                    bottom: 0
                                })
                            },
                        }, 0)

                        ppTitleOut.fromTo('.trans-text-char', .75, {
                            y: '100%'
                        }, {
                            y: '0%',
                            ease: 'power2.out',
                            y: '0%',
                            stagger: 0.01,

                        }, .45)

                    })

                },
                enter() {

                    return new Promise(function (resolve, reject) {

                        var ppTitleEnd = gsap.timeline({

                        });

                        ppTitleEnd.fromTo(bg, .7, {
                            height: '100%'
                        }, {
                            height: '0%',
                            ease: 'power2.inOut',

                            onStart: function () {

                                resolve();

                                gsap.set(bg, {
                                    top: 0,
                                    bottom: 'unset'
                                })



                            },
                        }, 0)

                        ppTitleEnd.fromTo('.trans-text-char', .75, {
                            y: '0%'
                        }, {
                            y: '-100%',
                            stagger: 0.01,
                            ease: 'power2.in',
                            onComplete: function () {

                                $('.trans-text').html(defTransText);

                                gsap.set(trans, {
                                    visibility: 'hidden'
                                })

                                new SplitText('.trans-text', {
                                    type: 'chars',
                                    charsClass: 'trans_char'
                                })



                            }
                        }, 0)



                    })

                }

                    }, {
                name: 'title-next-trans',
                from: {
                    namespace: [
                        'pph1',
                        'pph2',
                        'pph3',
                        'pph-video'
                    ]
                },
                to: {
                    namespace: [
                        'pph1',
                        'pph2',
                        'pph3',
                        'pph-video'
                    ]
                },
                leave() {

                    return new Promise(function (resolve, reject) {

                        var title = $('.next-project-title').text();


                        // Get the title
                        var trans = $('.a-page-transitions'),
                            bg = $('.apt-bg'),
                            image = $('.apt-image'),
                            transText = $('.trans-text');

                        transText.html(title)

                        new SplitText('.trans-text', {
                            tyoe: 'chars',
                            charsClass: 'trans-text-char'
                        })
                        // Get the title

                        var ppTitleOut = gsap.timeline({
                            onComplete: function () {
                                resolve();

                            }
                        });

                        ppTitleOut.fromTo(bg, .7, {
                            height: '0%'
                        }, {
                            height: '100%',
                            duration: .7,
                            ease: 'power2.inOut',
                            onStart: function () {

                                gsap.set(trans, {
                                    visibility: 'visible'
                                })

                                gsap.set(bg, {
                                    top: 'unset',
                                    bottom: 0
                                })
                            },
                        }, 0)

                        ppTitleOut.fromTo('.trans-text-char', 1, {
                            y: '100%'
                        }, {
                            y: '0%',
                            stagger: 0.025,
                            ease: 'power2.out'
                        }, .45)

                    })

                },
                enter() {

                    var ppTitleEnd = gsap.timeline({

                    });

                    ppTitleEnd.fromTo(bg, .7, {
                        height: '100%'
                    }, {
                        height: '0%',
                        ease: 'power2.inOut',
                        onStart: function () {

                            gsap.set(bg, {
                                top: 0,
                                bottom: 'unset'
                            })
                        },
                    }, 0)

                    ppTitleEnd.fromTo('.trans-text-char', .4, {
                        y: '00%'
                    }, {
                        y: '-100%',
                        stagger: 0.02,
                        ease: 'power2.in',
                        onComplete: function () {

                            $('.trans-text').html(defTransText);

                            new SplitText('.trans-text', {
                                type: 'chars',
                                charsClass: 'trans_char'
                            })


                            gsap.set(trans, {
                                visibility: 'hidden'
                            })
                        }
                    }, 0)

                }

                    }]
    });


    if (history.scrollRestoration) {
        history.scrollRestoration = 'manual';
    };

}(jQuery));

 