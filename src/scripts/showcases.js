    /** Showcase Layouts **/



    /* Showcase Videos */

    function showCaseVideos() {

        var showCaseVideo = $('.showcase-video');

        showCaseVideo.each(function () {

            let $this = $(this);

            const showCaseplayer = new Plyr($this, {
                controls: false,
                autoplay: true,
                clickToPlay: false,
                muted: true,
                autopause: false,
                volume: 0,
                loop: {
                    active: true
                }
            });

            //            showCaseplayer.restart();


        })

    }


    /* Showcase Videos */


    /* Scroll Notice */

    function aScrollNotice() {

        var scrollNot = $('.scroll-notice');

        if (scrollNot.length) {

            var scLine = scrollNot.find('.sn_bef'),
                scTim = gsap.timeline({
                    repeat: -1
                });

            scTim.fromTo(scLine, {
                height: 40,

            }, {
                height: 0,
                duration: 1,
                onStart: function () {

                    gsap.set(scLine, {
                        top: 'unset',
                        bottom: '140%'
                    })
                }
            })

            scTim.fromTo(scLine, {
                height: 0,

            }, {
                height: 40,
                duration: 1,
                onStart: function () {

                    gsap.set(scLine, {
                        bottom: 'unset',
                        top: '-125%'
                    })

                }
            })

        }

    }


    /* Scroll Notice */


    /** Showcase Layouts **/



    /** Showcase Fullscreen Carousel **/


    function showcaseFullscreenCarousel() {


        var aServSlider1 = new Swiper('.fullscreen-carousel-showcase', {
            slidesPerView: 3,
            navigation: {
                nextEl: '.slide-next',
                prevEl: '.slide-prev',
            },
            mousewheel: {
                invert: false
            }

        });



        let projects = $('.cs-project');

        projects.each(function (i) {
            i++

            let $this = $(this),
                image = $this.children('.cs-project-image').html();

            $this.attr('data-image', i)

            $('.cs-images').append('<div class="cs-project-image image_' + i + '">' + image + '</div>')
            $('.cs-project-image').hide();

            let imgCheck = $this.data('image'),
                findImg = '.image_' + imgCheck;

            $this.on('mouseenter', function () {


                $this.addClass('hovered');

                gsap.fromTo(findImg, {
                    scale: 1.1,
                    opacity: 0
                }, {
                    scale: 1,
                    opacity: 1,
                    onStart: function () {

                        $(findImg).show();

                        gsap.set('.cs-project-image', {
                            zIndex: -1
                        })


                        gsap.set(findImg, {
                            zIndex: 1
                        })
                    },

                })

            });

            $this.on('mouseleave', function () {

                $this.removeClass('hovered');

                gsap.to(findImg, {
                    opacity: 0,
                    delay: .3,
                    onComplete: function () {

                        $(findImg).hide();

                    }
                })

            })

        })

    }


    /** Showcase Fullscreen Carousel **/

    /** Showcase Fullscreen Wall **/

    function showcaseFullscreenWall() {

        var projects = $('.fw-projects'),
            project = projects.find('.fw-project');

        project.each(function (i) {

            i++
            let $this = $(this),
                imageURL = $this.data('image-url'),
                videoID = $this.data('plyr-embed-id');



            if (imageURL != null) {

                $('.fw-images').append('<div class="fw-project-image image_' + i + '"><div class="fw-project-image-wrap"><img src="' + imageURL + '"></div></div>')

                $this.attr('data-image', '.image_' + i);

            } else {

                $('.fw-images').append('<div class="fw-project-image image_' + i + '"><div class="fw-project-image-wrap"> <div class="showcase-video" data-plyr-provider="vimeo" data-plyr-embed-id="' + videoID + '"></div></div></div>')

                $this.attr('data-image', '.image_' + i);

            }


        })

        new SplitText('.fw-projects', {
            type: 'lines',
            linesClass: 'fwt-line'
        })

        projects.on('mouseenter', function () {

            project.addClass('opdown');


        })

        projects.on('mouseleave', function () {

            project.removeClass('opdown')


        })


        project.on('mouseenter', function () {

            let $this = $(this),
                findImage = $this.data('image'),
                imgWrap = $(findImage).find('.fw-project-image-wrap'),
                img = imgWrap.find('img'),
                cat = $this.find('.fw-project-category').text();

            $('.fw-cat').html('<span>' + cat + '</span>');

            new SplitText('.fw-cat', {
                type: 'chars',
                charsClass: 'fw-cat-char'
            })

            gsap.fromTo('.fw-cat-char', {

                y: '100%'
            }, {

                y: '0%',
                stagger: 0.02
            })

            $this.addClass('active')

            gsap.to(imgWrap, {
                duration: 1,
                overwrite: true,
                ease: 'expo.out',
                width: '100%',
                onStart: function () {

                    gsap.set(imgWrap, {
                        left: 'unset',
                        right: 0
                    })

                }
            })

            gsap.fromTo(img, {
                duration: .7,
                x: '30%',
                scale: 1.1
            }, {
                x: '0%',
                scale: 1
            })
        })

        project.on('mouseleave', function () {

            let $this = $(this),
                findImage = $this.data('image'),
                imgWrap = $(findImage).children('.fw-project-image-wrap'),
                img = imgWrap.children('img');

            $this.removeClass('active')

            gsap.to(imgWrap, {
                duration: 1,
                ease: 'expo.out',
                width: '0%',
                overwrite: true,
                onStart: function () {

                    gsap.set(imgWrap, {
                        right: 'unset',
                        left: 0
                    })

                }
            })

            gsap.fromTo(img, {
                duration: .7,
                x: '0%',
                scale: 1
            }, {
                x: '-30%',
                scale: 1.1
            })

            gsap.to('.fw-cat-char', {
                y: '-100%',
                stagger: 0.02
            })


        })




    }

    /** Showcase Fullscreen Wall **/

    /** Showcase Wall **/

    function showcaseWall() {

        var wallProject = $('.wall-project'),
            wallParent = $('.wall-projects'),
            parentSec = wallParent.parents('.section'),
            wallProjectsTop = document.getElementsByClassName('wall-projects-top')[0],
            wallProjectsBottom = document.getElementsByClassName('wall-projects-bottom')[0],
            topWidth = wallProjectsTop.offsetWidth,
            bottomWidth = wallProjectsBottom.offsetWidth,
            winWidth = window.outerWidth,
            topTrans = topWidth - winWidth,
            bottomTrans = bottomWidth - winWidth;


        wallProject.each(function (i) {

            i++

            let $this = $(this);

            $this.attr('data-image', '.image-' + i)
            $this.find('.project-title').attr('data-index', '0' + i)

            let wallImage = $this.children('.project-image').find('img').attr('src'),
                wallVideo = $this.find('.showcase-video'),
                wallImages = $('.wall-images');



            if (wallImage != null) {

                wallImages.append('<div class="wall-image-fix image-' + i + '"><img src="' + wallImage + '"></div>');

            } else {

                wallVideo.appendTo(wallImages).wrap('<div class="wall-image-fix image-' + i + '"></div>')
            }

        });

        var wallImages = $('.wall-image-fix'),
            wallImagesWidth = wallImages.outerWidth(),
            wallImg = wallImages.find('img, .plyr');

        gsap.set(wallImg, {
            width: wallImagesWidth
        })


        wallProject.on('mouseenter', function () {

            let $this = $(this);

            wallParent.addClass('on-hover');

            wallProject.removeClass('hovered');
            $this.addClass('hovered');

            let findImage = $this.data('image'),
                findImg = $(findImage).children('img, .plyr');


            gsap.fromTo(findImg, {
                scale: 1.5,
                rotate: 15
            }, {
                scale: 1,
                rotate: 0,
                overwrite: true,
                duration: .7,
                ease: 'power2.Out',

            })

            gsap.fromTo(findImage, {
                opacity: 0
            }, {
                opacity: 1,
                overwrite: true,
                duration: .7,
                ease: 'power2.Out',
                onStart: function () {

                    gsap.set(findImage, {
                        visibility: 'visible',

                    })

                }
            })


        })

        wallProject.on('mouseleave', function () {

            var $this = $(this),
                findImage = $this.data('image'),
                findImg = $(findImage).children('img');



            gsap.fromTo(findImage, {
                opacity: 1
            }, {
                opacity: 0,
                duration: .7,
                overwrite: true,
                ease: 'power2.In',
                onComplete: function () {

                    gsap.set(findImage, {
                        visibility: 'hidden'
                    })
                }
            })


        })

        wallProject.on('click', function () {
            let $this = $(this),
                findImage = $this.data('image'),
                findImg = $(findImage).children('img, .plyr');

            $(findImage).addClass('trans_image')


        })


        wallParent.on('mouseleave', function () {

            wallParent.removeClass('on-hover');

        });



        let wpTop = gsap.to('.wall-projects-top', {
            x: -topTrans - 400,

        })
        let wpBottom = gsap.to('.wall-projects-bottom', {
            x: bottomTrans + 400,

        })

        var stickyHeader = ScrollTrigger.getById("stickyHeader")



        ScrollTrigger.create({
            animation: wpTop,
            trigger: ".showcase-wall",
            start: "top top",
            scrub: 1,
            end: 'bottom+=2000 top',
            pin: true,
            id: 'showcaseScroll',
            onUpdate: function (self, progress) {

                let prog = self.progress * 100 + '%',
                    clamp = gsap.utils.clamp(-50, 50),
                    skew = clamp(self.getVelocity() / -100);

                gsap.to('.wall-prog', {
                    width: prog
                })

            }

        });

        ScrollTrigger.create({
            animation: wpBottom,
            trigger: ".showcase-wall",
            start: "top top",
            end: 'bottom+=2000 top',
            scrub: 1,
            pin: true,
            onUpdate: function (self) {

            }
        });



    }


    /** Showcase Wall **/

