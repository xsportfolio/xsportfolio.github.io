    /** Site Header **/

    function siteHeaderSet() {

        siteHeader = $('.site-header');

        gsap.set(siteHeader, {
            clearProps: 'all'
        })

        var siteNav = $('.site-navigation'),
            headerHeight = siteHeader.outerHeight(),
            siteContent = $('#page'),
            headerWrapper = $('.header-wrapper');

        let mobileQuery = window.matchMedia('(max-width: 900px)');
        // Check if the media query is true
        if (mobileQuery.matches) {

            siteHeader.addClass('fullscreen_menu');
            siteNav.addClass('fullscreen')

        } else {

            if ((menuStyle === 'classic') || (menuStyle == null)) {

                siteHeader.addClass('classic_menu')
                siteNav.addClass('classic')

            } else if (menuStyle === 'overlay') {

                siteHeader.addClass('fullscreen_menu');
                siteNav.addClass('fullscreen')
            }

        }

        siteHeader.addClass(headerLayout)


        if ((headerStick == true) || (headerStick == null)) {

            siteHeader.addClass('sticky_header')

        } else if (headerStick === "always") {

            siteHeader.addClass('sticky_header always_stick')
        }


        if (siteHeader.hasClass('sticky_header')) {

            var showcaseScroll = ScrollTrigger.getById('showcaseScroll'),
                stickyStart = 500,
                stickyBg = '#fff';

            if (siteHeader.hasClass('light')) {
                var stickyBg = "rgba(19,19,19,1)"
            }

            if (showcaseScroll) {

                var stickyStart = showcaseScroll.end;

                gsap.set(siteHeader, {
                    position: 'fixed'
                })

                var sitkcyHdr = ScrollTrigger.create({
                    trigger: siteHeader,
                    start: stickyStart + 'bottom',
                    id: 'stickyHeader',
                    markers: false,
                    onLeaveBack: function () {

                        gsap.to(siteHeader, {
                            position: 'fixed',
                            y: '0%',
                            height: 150,
                            duration: .75,
                            backgroundColor: 'transparent',
                            delay: .5,
                            ease: 'power2.out'
                        })

                        gsap.to(headerWrapper, {
                            top: '60%',
                            delay: .5,
                            duration: .75,
                            ease: 'power2.out'
                        })


                    },
                    onEnter: function () {

                        gsap.set(siteHeader, {
                            position: 'absolute',
                            top: stickyStart
                        })

                        ScrollTrigger.create({
                            trigger: 'body',
                            markers: false,
                            start: stickyStart + 500 + 'top',
                            end: 'bottom bottom',
                            onEnter: function () {

                                gsap.set(siteHeader, {
                                    position: 'fixed',
                                    top: 0,
                                    y: '-100%',
                                    height: 100,
                                    backgroundColor: stickyBg,
                                })

                                gsap.set(headerWrapper, {
                                    top: '45%'
                                })



                            },
                            onUpdate: function (self, direction, progress) {

                                if (self.direction == -1) {

                                    gsap.to(siteHeader, {
                                        y: '0%',
                                    })
                                } else {
                                    gsap.to(siteHeader, {
                                        y: '-100%',
                                    })
                                }

                            },
                            onLeaveBack: function (self) {

                                self.kill();
                            }
                        })

                    },
                    onEnterBack: function () {

                        gsap.set(siteHeader, {
                            position: 'fixed',
                            top: 0
                        })

                    }

                })


            } else {

                gsap.set(siteHeader, {
                    position: 'absolute'
                })


                ScrollTrigger.create({
                    trigger: 'body',
                    start: 'top+=500 top',
                    end: 'bottom bottom',
                    id: 'stickyHeader',
                    markers: false,
                    onEnter: function () {

                        if (pageSet.hasClass('dark')) {
                            var curBg = 'rgba(19,19,19,1)'
                        } else {
                            var curBg = '#ebebeb'
                        }

                        gsap.set(siteHeader, {
                            position: 'fixed',
                            top: 0,
                            y: '-100%',
                            height: 100,
                            backgroundColor: curBg,
                        })

                        gsap.set(headerWrapper, {
                            top: '45%'
                        })

                        ScrollTrigger.create({
                            trigger: 'body',
                            markers: false,
                            start: 'top top',
                            end: 'bottom bottom',
                            onUpdate: function (self, direction, progress) {

                                if (self.direction == -1) {

                                    gsap.to(siteHeader, {
                                        y: '0%',
                                    })
                                } else {
                                    gsap.to(siteHeader, {
                                        y: '-100%',
                                    })
                                }

                            },
                            onLeaveBack: function (self) {

                                self.kill();
                                gsap.to(siteHeader, {
                                    position: 'absolute',
                                    y: '0%',
                                    height: 150,
                                    duration: .75,
                                    backgroundColor: 'transparent',
                                    delay: .5,
                                    clearProps: 'all',
                                    ease: 'power2.out'
                                })

                                gsap.to(headerWrapper, {
                                    top: '60%',
                                    delay: .5,
                                    duration: .75,
                                    clearProps: 'all',
                                    ease: 'power2.out'
                                })


                            }
                        })

                    },

                })




            };


        }


    }
    /** Site Header **/


    /** Classic Navigation **/

    var resizeTimer;

    function classicNavigation() {


        var siteNav = $('.site-navigation'),
            menu = siteNav.children('.menu'),
            menuItem = menu.children('li');


        if (siteNav.hasClass('classic')) {

            menuItem.each(function () {

                let $this = $(this),
                    menuItemA = $this.children('a');

                var classicSplit = new SplitText(menuItemA, {
                        tyoe: 'chars',
                        charsClass: 'menu-tit-char'
                    }),
                    mobileQuery = window.matchMedia('(max-width: 900px)')

                $(window).on('resize', function (e) {


                    if (mobileQuery.matches) {

                        classicSplit.revert();
                    }


                });

                let chars = menuItemA.find('.menu-tit-char'),
                    sHeadr = $('.site-header');

                if (sHeadr.hasClass('light')) {

                    var firstColor = 'hsla(0,0%,100%,.2)',
                        secondColor = '#fff'

                } else {

                    var firstColor = 'rgba(25, 27, 29, .6)',
                        secondColor = '#191b1d'

                }

                $this.on('mouseenter', function () {



                    gsap.fromTo(chars, {
                        opacity: 0,
                        y: 10
                    }, {
                        opacity: 1,
                        y: 0,
                        color: secondColor,
                        stagger: 0.025,

                    })
                })

                $this.on('mouseleave', function () {

                    gsap.to(chars, {
                        color: firstColor,
                        stagger: 0.025
                    })


                })

            })

        }

    }


    /** Classic Navigation **/




    function mobileMenu() {

        var mobileQuery = window.matchMedia('(max-width: 900px)'),
            desktopQuery = window.matchMedia('(min-width: 900px)');

        $(window).on('resize', function (e) {

            var siteNav = $('.site-navigation');

            if (siteNav.hasClass('classic')) {

                if (mobileQuery.matches) {

                    clearTimeout(resizeTimer);
                    resizeTimer = setTimeout(function () {

                        siteHeader.removeClass('classic_menu');
                        siteNav.removeClass('classic');
                        siteHeader.addClass('fullscreen_menu');
                        siteNav.addClass('fullscreen');

                        siteNav.addClass('desktop-classic');

                        fullscreenNavigation();

                    }, 250);


                }

            }

            if ((siteNav.hasClass('desktop-classic')) && (desktopQuery.matches)) {

                clearTimeout(resizeTimer);
                resizeTimer = setTimeout(function () {

                    $(".site-navigation > .fs-menu-wrapper").contents().unwrap();
                    siteHeader.addClass('classic_menu');
                    siteNav.addClass('classic');
                    siteHeader.removeClass('fullscreen_menu');
                    siteNav.removeClass('fullscreen');

                    siteNav.removeClass('desktop-classic');

                    gsap.set('.menu-item a', {
                        clearProps: 'all'
                    })

                    classicNavigation();


                }, 250);

            }


        });

    }

    mobileMenu();

    /** Fullscreen Navigation **/


    function fullscreenNavigation() {

        if ($('.site-navigation').hasClass('fullscreen')) {

            var siteNav = $('.site-navigation'),
                menuItemHasSub = $('.menu-item.has-children > a'),
                subMenu = $('.site-navigation .menu li .sub-menu'),
                headerWrapper = $('.header-wrapper'),
                mainMenu = $('.main-menu');

            siteHeader.addClass('menu_' + menuLayout)

            //
            //            $('.main-menu').attr('data-barba-namespace', 'fs-menu')


            siteNav.wrapInner("<div class='fs-menu-wrapper'></div>")

            var menuWrapper = $('.fs-menu-wrapper');

            menuItemHasSub.each(function () {
                let $this = $(this);
                $this.append('<span class="sub-toggle"><span class="sub-togg-line"></span><span class="sub-togg-line"></span></span>');

            });


            menuItemHasSub.on('click', function () {

                $('.sub-back').addClass('is-active');

                var $this = $(this);

                let parentLi = $this.parent('li'),
                    currentMenu = parentLi.parent('ul'),
                    menuItemLi = currentMenu.children('li'),
                    menuItemA = menuItemLi.children('a');

                var menuOut = gsap.fromTo(menuItemA, {
                    translateY: '0%',
                }, {
                    translateY: '-100%',
                    stagger: 0.03,
                    duration: .4,
                    ease: "power2.in",
                    overwrite: true,
                    onComplete: function () {
                        currentMenu.addClass('hidden');
                        currentMenu.removeClass('opened');
                        $('.sub-back').addClass('is-active')
                    }

                });


                let subMenu = parentLi.children('ul');
                let subMenuLi = subMenu.children('li');
                let subMenuLiA = subMenuLi.children('a')


                var subAnim = gsap.fromTo(subMenuLiA, {
                    translateY: "100%",
                }, {
                    translateY: "0%",
                    delay: .4,
                    stagger: .05,
                    overwrite: true,
                    ease: "power2.out",
                    onStart: function () {
                        subMenu.addClass('opened')
                    },

                });

            });

            $('.sub-back').on('click', function () {

                let currentMenu = $('.sub-menu.opened'),
                    currentMenuLi = currentMenu.children('li'),
                    currentMenuA = currentMenuLi.children('a');

                gsap.fromTo(currentMenuA, {
                    translateY: "0%",
                }, {
                    translateY: "100%",
                    stagger: -0.05,
                    overwrite: true,
                    ease: "power2.in",
                    onComplete: function () {
                        currentMenu.removeClass('opened')
                        currentMenu.addClass('hidden')
                    }


                })


                let parentMenu = currentMenu.parent('li').parent('ul')
                let parentMenuA = parentMenu.children('li').children('a');

                gsap.fromTo(parentMenuA, {
                    translateY: "-100%",
                }, {
                    translateY: "0%",
                    delay: .4,
                    stagger: -0.05,
                    overwrite: true,
                    ease: "power2.out",
                    onStart: function () {
                        parentMenu.removeClass('hidden');
                        parentMenu.addClass('opened');

                        if ($('.main-menu').hasClass('opened')) {
                            $('.sub-back').removeClass('is-active');

                        }
                    }
                })


            });


            var menuItemA = $('.menu.main-menu li a');

            menuItemA.each(function () {

                let $this = $(this),
                    text = $this.text();


                $this.attr('data-hover', text);

                let datHov = $this.data('hover');

                datHov.replace(/\s/g, "&nbsp;");
            })


            menuItemA.on('mouseenter', function (e) {

                let $this = $(this),
                    parentLi = $this.parent('li'),
                    miPosTop = parentLi.position().top;

                mainMenu.addClass('hovered')

                $this.addClass('hovered');

                gsap.to($this, .75, {
                    x: 15,
                    ease: 'CustomEase.create("cubic", "0.63,0.03,0.21,1")',

                })


            })

            menuItemA.on('mouseleave', function (e) {

                let $this = $(this);

                menuItemA.removeClass('hovered')
                mainMenu.removeClass('hovered');

                gsap.to($this, .75, {
                    x: 0,
                    ease: 'CustomEase.create("cubic", "0.63,0.03,0.21,1")',

                })

            })

            mainMenu.on('mouseleave', function () {




                if ($('.menu-item-active').css("visibility") === "visible") {


                }

            })

            var menuToggle = $('.menu-toggle'),
                toggleLine = $('.toggle-line');

            var menuAin = gsap.to('.main-menu > li > a', {
                translateY: 0,
                overwrite: true,
                stagger: .05,
                delay: .4,
                paused: true,
                onReverseComplete: function () {
                    siteNav.removeClass('menu-opened');
                    headerWrapper.removeClass('menu-opened');
                    menuToggle.removeClass('is-active');
                    $('.site-header').removeClass('menu-has-open');
                    enableScroll();
                    menuItemHasSub.removeClass('has-sub-in')

                },
                onComplete: function () {

                    menuItemHasSub.addClass('has-sub-in')
                }
            })

            var socialListAnim = gsap.fromTo('.social-list li a', {
                translateY: "100%",
                skewY: 10
            }, {
                translateY: "0%",
                skewY: 0,
                opacity: 1,
                overwrite: true,
                stagger: .05,
                paused: true,
                delay: 1
            })

            var gitButtonAnim = gsap.fromTo('.git-button', {
                translateY: "50%",

            }, {
                translateY: "0%",
                opacity: 1,
                paused: true,
                delay: 1.3

            })




            menuToggle.on('click', function () {


                siteNav.removeClass('open');
                var clicks = $(this).data('clicks');

                var $this = $(this);

                if (clicks) {

                    if ($('.sub-menu').hasClass('opened')) {

                        $('ul.opened > li > a').addClass('cakomako')

                        gsap.fromTo('ul.opened > li > a', {
                            translateY: "0%"
                        }, {
                            translateY: "100%",
                            overwrite: true,
                            stagger: -0.05,
                            ease: "power2.in",
                            onStart: function () {
                                $('.sub-back').removeClass('is-active')
                            },
                            onComplete: function () {
                                siteNav.removeClass('menu-opened');
                                headerWrapper.removeClass('menu-opened');
                                menuToggle.removeClass('is-active');
                                enableScroll();
                                $('.site-header').removeClass('menu-has-open');
                                $('.site-navigation ul').removeClass('hidden')
                                $('.site-navigation ul').removeClass('opened');
                            }


                        })

                    } else {
                        menuAin.reverse();
                    }


                    socialListAnim.reverse();
                    gitButtonAnim.reverse();

                } else {

                    if (pageLayout !== menuLayout) {

                        if (menuLayout === 'light') {
                            $('.site-header').removeClass('light')
                            $('.site-header').addClass('dark')
                        } else if (menuLayout === 'dark') {
                            $('.site-header').removeClass('dark')
                            $('.site-header').addClass('light')
                        }

                    }

                    disableScroll();

                    $this.addClass('is-active');

                    siteNav.addClass('menu-opened');
                    headerWrapper.addClass('menu-opened');
                    $('.site-header').addClass('menu-has-open');

                    var menuHeight = $('.main-menu').outerHeight(),
                        siteHeader = $('.site-header'),
                        winHeight = $(window).outerHeight(),
                        winWidth = $(window).outerWidth(),
                        plusHeight = winHeight / 100 * 25,
                        menuTop = $('.main-menu').position().top,
                        wWidth = $(window).outerWidth() / 100 * 17 / 2;


                    let mobileQuery = window.matchMedia('(max-width: 1024px)')

                    if (!mobileQuery.matches) {
                        gsap.set('.sub-back', {
                            top: menuTop
                        })


                    }




                    var rule = CSSRulePlugin.getRule(".site-header.fullscreen_menu.menu-has-open::before"); //get the rule

                    // Create a media condition that targets viewports at least 768px wide

                    // Check if the media query is true
                    if (mobileQuery.matches) {

                        gsap.set(rule, {
                            cssRule: {
                                height: '100vh'
                            }

                        });
                    } else {

                        gsap.set(menuWrapper, {
                            height: menuHeight + plusHeight
                        })

                        gsap.set(rule, {
                            cssRule: {
                                height: menuHeight + plusHeight + 50
                            }

                        });
                    }


                    let menuUls = $('.site-navigation').find('ul');

                    menuUls.each(function () {

                        let $this = $(this),
                            selfHeight = $this.outerHeight();

                        if (selfHeight > menuHeight) {

                            $this.addClass('ulcol')

                        }

                    })


                    menuAin.restart(true);
                    socialListAnim.restart(true);
                    gitButtonAnim.restart(true);




                }
                $(this).data("clicks", !clicks);




            });


        }



    }


    /** Fullscreen Navigation **/

