    /** Mouse Cursor **/
    function mouseCursor() {

        if (pageCursor == true) {

            let mouseCursor = $('#mouseCursor'),
                circle = $('#cursor'),
                dot = $('#dot'),
                cursorActive;

            gsap.set(mouseCursor, {
                xPercent: -50,
                yPercent: -50
            });

            let ball = mouseCursor
            let pos = {
                x: window.innerWidth / 2,
                y: window.innerHeight / 2
            };
            let mouse = {
                x: pos.x,
                y: pos.y
            };
            let speed = 0.1;

            cursorActive = true;

            let xSet = gsap.quickSetter(ball, "x", "px", "force3d");
            let ySet = gsap.quickSetter(ball, "y", "px", "force3d");

            window.addEventListener("mousemove", e => {
                mouse.x = e.x;
                mouse.y = e.y;
            });


            gsap.ticker.add(() => {

                if (cursorActive) {
                    let dt = 1.0 - Math.pow(1.0 - speed, gsap.ticker.deltaRatio());

                    pos.x += (mouse.x - pos.x) * dt;
                    pos.y += (mouse.y - pos.y) * dt;
                    xSet(pos.x);
                    ySet(pos.y);
                }

            });

            function cursorHovers() {

                var darkCircle = mouseCursor.data('dark-circle'),
                    darkDot = mouseCursor.data('dark-dot'),
                    lightCircle = mouseCursor.data('light-circle'),
                    lightDot = mouseCursor.data('light-dot'),
                    curBg,
                    iconColor;

                if ($('body').hasClass('dark')) {

                    gsap.set(cursor, {
                        borderColor: lightCircle
                    })

                    gsap.set(dot, {
                        background: lightDot
                    })

                    curBg = lightCircle;
                    iconColor = lightDot;

                } else {

                    gsap.set(cursor, {
                        borderColor: darkCircle
                    })

                    gsap.set(dot, {
                        background: darkDot
                    })

                    curBg = darkCircle;
                    iconColor = darkDot;

                }


                $('.section').on('mouseenter', function () {

                    let $this = $(this),
                        color = $this.css('background-color'),
                        hsl = gsap.utils.splitColor(color, true),
                        lightness = hsl[hsl.length - 1];

                    if ((lightness < 50) && (lightness != 0)) {

                        gsap.to(cursor, {
                            borderColor: lightCircle
                        })

                        gsap.to(dot, {
                            background: lightDot
                        })



                    } else if ((lightness > 50) && (lightness != 0)) {

                        gsap.to(cursor, {
                            borderColor: darkCircle
                        })

                        gsap.to(dot, {
                            background: darkDot
                        })



                    }
                })

                $('.section').on('mouseleave', function () {

                    if ($('body').hasClass('dark')) {

                        gsap.to(cursor, {
                            borderColor: lightCircle
                        })

                        gsap.to(dot, {
                            background: lightDot
                        })

                    } else {

                        gsap.to(cursor, {
                            borderColor: darkCircle
                        })

                        gsap.to(dot, {
                            background: darkDot
                        })

                    }

                })



                var defaultHovers = $('a, .service, button')

                defaultHovers.on('mouseenter', function (e) {

                    gsap.to(mouseCursor, {
                        width: 100,
                        height: 100
                    })

                    gsap.to(cursor, {
                        backgroundColor: curBg,
                        borderWidth: 0
                    })

                })

                defaultHovers.on('mouseleave', function (e) {

                    gsap.to(mouseCursor, {
                        width: 50,
                        height: 50
                    })

                    gsap.to(cursor, {
                        backgroundColor: 'transparent',
                        borderWidth: 2
                    })

                })


                var projectHovers = $('.ar-work, .fw-project, .cs-title, .sl-project, .wall-project, .a-single-project, .aw-project');

                projectHovers.on('mouseenter', function (e) {

                    gsap.to(mouseCursor, {
                        width: 120,
                        height: 120
                    })

                    gsap.to(cursor, {
                        backgroundColor: curBg,
                        borderWidth: 0
                    })

                })

                projectHovers.on('mouseleave', function (e) {



                    gsap.to(mouseCursor, {
                        width: 50,
                        height: 50
                    })

                    gsap.to(cursor, {
                        backgroundColor: 'transparent',
                        borderWidth: 2
                    })

                })

                var borderHovers = $('.menu-toggle, .fs-prev, .fs-next, .ss1-dots, .ss2-dot, .ss2-prev, .ss2-next, .ss1-prev, .ss1-next, .a-plus-button, .scroll-notice, .a-test-next, .a-test-prev, .cart-button, .cpq-reduce, .cpq-increase, .swiper-pagination-bullet');

                borderHovers.on('mouseenter', function (e) {

                    gsap.to(mouseCursor, {
                        width: 100,
                        height: 100
                    })

                    gsap.to(dot, {
                        opacity: 0
                    })

                })

                borderHovers.on('mouseleave', function (e) {

                    gsap.to(mouseCursor, {
                        width: 50,
                        height: 50
                    })
                    gsap.to(dot, {
                        opacity: 1
                    })

                })

                var dotHovers = $('ul.main-menu a, .a-button, .a-client, .fs-button, .a-latest-posts .post, .field-wrap');

                dotHovers.on('mouseenter', function (e) {

                    gsap.to(mouseCursor, {
                        width: 100,
                        height: 100
                    })

                    gsap.to(cursor, {
                        backgroundColor: curBg,
                        borderWidth: 0
                    })

                    gsap.to(dot, {
                        opacity: 0
                    })
                })

                dotHovers.on('mouseleave', function (e) {
                    gsap.to(mouseCursor, {
                        width: 50,
                        height: 50
                    })

                    gsap.to(cursor, {
                        backgroundColor: 'transparent',
                        borderWidth: 2
                    })

                    gsap.to(dot, {
                        opacity: 1
                    })
                })


                var imageHovers = $('.single-image.lightbox');

                imageHovers.on('mouseenter', function (e) {

                    mouseCursor.append('<i id="cursorIcon" class="icofont-search"></i>')

                    gsap.set('#cursorIcon', {
                        color: iconColor,
                        fontSize: 25
                    })

                    gsap.to('#cursorIcon', {
                        scale: 1
                    })

                    gsap.to(mouseCursor, {
                        width: 100,
                        height: 100
                    })

                    gsap.to(dot, {
                        opacity: 0
                    })

                })

                imageHovers.on('mouseleave', function (e) {

                    gsap.to('#cursorIcon', {
                        scale: 0,
                        onComplete: function () {
                            $('#cursorIcon').remove();
                        }
                    })

                    gsap.to(mouseCursor, {
                        width: 50,
                        height: 50
                    })

                    gsap.to(dot, {
                        opacity: 1
                    })

                })



            }

            cursorHovers();

            let cursorLoading;

            barba.hooks.before((data) => {

                cursorLoading = gsap.timeline({
                    overwrite: true
                });

                cursorLoading.to(mouseCursor, .3, {
                    width: 50,
                    height: 50,
                }, 0)

                cursorLoading.to(cursor, .3, {
                    backgroundColor: 'transparent',
                    borderWidth: 2,
                }, 0)

                cursorLoading.to(dot, .3, {
                    opacity: 1,
                    x: '0%',
                    y: '0%',
                    top: '0%',
                    left: '0%'
                }, 0)

                cursorLoading.to(dot, .3, {
                    opacity: 1,
                    x: 0,
                    y: 0,
                    top: 0,
                    left: 0
                }, 0)

                cursorLoading.to(mouseCursor, 1, {
                    rotate: 360,
                    repeat: -1,
                    ease: 'power2.inOut'
                }, 0)


            });

            barba.hooks.after((data) => {

                let cursorLoaded = gsap.timeline({
                    onStart: function () {


                    },
                    onComplete: function () {
                        gsap.set(mouseCursor, {
                            rotate: 0,
                        })

                        cursorHovers();



                    }
                });

                cursorLoading.pause();

                cursorLoaded.to(dot, .8, {
                    top: '50%',
                    left: '50%',
                    ease: 'power2.inOut'
                }, .4)

            });




        } else {

            $('#mouseCursor').hide();
        }


    }

    /** Mouse Cursor **/


