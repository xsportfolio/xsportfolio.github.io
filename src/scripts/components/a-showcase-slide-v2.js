    function aShowcaseSlideV2() {

        var showcaseSlideV2 = $('.showcase-slideshow-v2'),
            ss2Project = showcaseSlideV2.find('.ss2-project'),
            totSlides = ss2Project.length,
            dots = $('.ss2-dot'),
            backText = $('.ss2-back-text'),
            totSlides = ss2Project.length,
            activeURL,
            currentSlide,
            titleChar,
            excerptLine,
            catSpan,
            backChars,
            activeIndex,
            activeDets;

        $('.ss2-tot').text('0' + totSlides)


        new SplitText(backText, {
            type: 'chars',
            charsClass: 'bt-char'
        });

        $('.bt-char').wrapInner('<span></span>')


        ss2Project.each(function (i) {

            i++

            let $this = $(this),
                meta = $this.find('.ss2-project-meta'),
                cat = meta.children('.ss2-project-cat'),
                title = meta.children('.ss2-project-title'),
                excerpt = meta.find('.ss2-project-excerpt'),
                image = $this.children('.ss2-project-image'),
                img = image.children('img'),
                index = $this.data('index');

            $this.attr('data-title', title.text());


            $('.ss2-back-texts').append('<div class="ss2-back-text back_' + i + '">' + title.text() + '</div>')

            $('.ss2-images').append(image);

            $this.attr('data-index', i);
            $this.addClass('slide_' + i);

            new SplitText(excerpt, {
                type: 'lines',
                linesClass: 'excerpt-line'
            });

            let lines = excerpt.find('.excerpt-line')

            lines.wrapInner('<span></span>');

            cat.wrapInner('<span></span>');

            new SplitText(title, {
                type: 'chars, lines',
                linesClass: 'title-line',
                charsClass: 'title-char'
            });

        });

        new SplitText('.ss2-back-text', {
            type: 'chars',
            charsClass: 'bt-char'
        })

        $('.bt-char').wrapInner('<span></span>')

        let ss2Images = $('.ss2-images'),
            ss2Image = ss2Images.find('.ss2-project-image')

        ss2Images.wrapInner('<div class="swiper-wrapper"></div>');


        ss2Image.each(function (i) {

            i++

            let $this = $(this);

            $this.wrapInner('<div class="slide-bgimg"></div>')
            $this.wrap('<div class="swiper-slide"></div>')

            $this.parent('.swiper-slide').attr('data-slide', '.slide_' + i)

        })




        var interleaveOffset = 0.5;

        var ss2ImagesSlider = new Swiper('.ss2-images', {
            mousewheel: {
                invert: false,
                eventsTarget: '.showcase-slideshow-v2'
            },
            allowTouchMove: false,
            pagination: {
                el: '.ss2-dots',
                type: 'bullets',
                clickable: true,
                renderBullet: function (index, className) {
                    return '<span class="ss2-dot ' + className + '">0' + (index + 1) + '</span>';
                }
            },
            slidesPerView: 1,
            navigation: {
                nextEl: '.ss2-next',
                prevEl: '.ss2-prev',
            },
            speed: 1000,
            parallax: true,
            watchSlidesProgress: true,
            on: {

                progress: function () {
                    let swiper = this;
                    for (let i = 0; i < swiper.slides.length; i++) {
                        let slideProgress = swiper.slides[i].progress,
                            innerOffset = swiper.width * interleaveOffset,
                            innerTranslate = slideProgress * innerOffset;

                        swiper.slides[i].querySelector(".slide-bgimg").style.transform =
                            "translateX(" + innerTranslate + "px)";
                    }
                },
                setTransition: function (speed) {
                    let swiper = this;
                    for (let i = 0; i < swiper.slides.length; i++) {
                        swiper.slides[i].style.transition = speed + "ms";
                        swiper.slides[i].querySelector(".slide-bgimg").style.transition =
                            1000 + "ms";
                    }
                },

            }


        });

        var rule = CSSRulePlugin.getRule(".portfolio-showcaseCheck.showcase-slideshow-v2::before"); //get the rule


        var ss2ScrollAnim = gsap.timeline({
            yoyo: true
        })

        ss2ScrollAnim.to('.ss2-images', {
            y: -150
        }, 0)

        ss2ScrollAnim.to('.ss2-button', {
            y: -50
        }, 0)

        ss2ScrollAnim.to('.ss2-back-texts', {
            y: -100
        }, 0)

        ss2ScrollAnim.to('.showcase-slideshow-2-wrapper', {
            y: -200
        }, 0)

        ss2ScrollAnim.to('.ss2-dots', {
            y: -100
        }, 0)


        let scrolla = new ScrollTrigger({
            trigger: showcaseSlideV2,
            animation: ss2ScrollAnim,
            id: 'showcaseScroll',
            pin: true,
            pinType: 'fixed',
            pinSpacing: false,
            start: 'top+=220 top',
            scrub: 0.5,
            end: 'bottom top',
            markers: false,
            onUpdate: function (self, progress) {

                var boxSet = gsap.quickSetter(rule, "css");
                boxSet({
                    cssRule: {
                        opacity: self.progress
                    }
                });

            },
            onLeaveBack: function () {



            }
        })







        function slideChecko() {

            currentSlide = $('.swiper-slide-active');

            activeDets = currentSlide.data('slide');

            titleChar = $(activeDets).find('.title-char');
            excerptLine = $(activeDets).find('.excerpt-line span');
            catSpan = $(activeDets).find('.ss2-project-cat span');


            backText = '.back_' + $(activeDets).data('index');

            backChars = $(backText).find('.bt-char span')

            activeURL = $(activeDets).find('a').attr('href');

            activeIndex = $(activeDets).data('index');


        }

        slideChecko();

        $('.ss2-button a').attr('href', activeURL);
        $('.ss2-curr').text('0' + activeIndex);

        $(activeDets).addClass('active');
        $(backText).addClass('active');

        ss2ImagesSlider.on('slideChange', function () {

            slideChecko();

            let slideOut = gsap.timeline({
                yoyo: true,
                onComplete: function () {
                    $(activeDets).removeClass('active')
                    $(backText).removeClass('active');

                }
            })

            slideOut.fromTo(catSpan, {
                y: '0%'
            }, {
                y: '-100%',
                ease: 'power2.in',
            }, 0)

            slideOut.fromTo(titleChar, {
                y: '0%'
            }, {
                y: '-100%',
                stagger: 0.01,
                ease: 'power2.in',
            }, .1)

            slideOut.fromTo(excerptLine, {
                y: '0%'
            }, {
                y: '-100%',
                stagger: 0.02,
                ease: 'power2.in',
            }, .3)


            slideOut.fromTo(backChars, {
                x: 0
            }, {
                x: -150,
                stagger: 0.02,
                ease: 'power2.in',
            }, 0)



        })

        ss2ImagesSlider.on('slideChangeTransitionEnd', function () {

            slideChecko();

            $('.ss2-button a').attr('href', activeURL);
            $('.ss2-curr').text('0' + activeIndex);


            let slideIn = gsap.timeline({
                yoyo: true,
                onStart: function () {

                    $(activeDets).addClass('active');
                    $(backText).addClass('active');
                }
            })

            slideIn.fromTo(titleChar, {
                y: '100%'
            }, {
                y: '0%',
                ease: 'power2.out',
                stagger: 0.01
            }, 0)

            slideIn.fromTo(excerptLine, {
                y: '100%'
            }, {
                y: '0%',
                stagger: 0.01,
                ease: 'power2.out',
            }, 0)

            slideIn.fromTo(catSpan, {
                y: '100%'
            }, {
                y: '0%',
                ease: 'power2.out',
            }, 0)


            slideIn.fromTo(backChars, {
                x: 150
            }, {
                x: 0,
                stagger: 0.02,
                ease: 'power2.out',
            }, 0)

        })



        ss2ImagesSlider.on('transitionEnd', function () {

            let activeSlid = $('.swiper-slide-active'),
                activeIn = activeSlid.data('slide'),
                totSlid = $('.ss2-images .swiper-slide').length,
                lastSlid = '.slide_' + totSlid;

            if (activeIn === lastSlid) {

                this.mousewheel.disable();

            }


        })

        ScrollTrigger.create({
            trigger: 'body',
            start: 'top top',
            end: 'bottom bottom',
            onLeaveBack: function () {
                ss2ImagesSlider.mousewheel.enable();
            }
        })






    }
    /* Showcase Slideshow V2 */



