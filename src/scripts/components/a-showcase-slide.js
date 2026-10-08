    function aShowcaseSlide() {

        var showcaseSlideshow = $('.showcase-slideshow'),
            wrapper = showcaseSlideshow.children('.showcase-slideshow-wrapper'),
            projects = wrapper.find('.ss-project'),
            imagesWrapper = showcaseSlideshow.children('.ss1-images'),
            images = $('.ss1-images .ss1-image-wrap'),
            currentSlide,
            activeDets,
            date,
            lines,
            chars,
            projectURL,
            catChars,
            sumLines,
            slideOut,
            nextSlide,
            nextImage,
            prevSlide,
            prevImage,
            ssImage,
            ssImg;



        function slideCheck() {

            currentSlide = $('.swiper-slide-active');
            nextSlide = $('.swiper-slide-next')
            prevSlide = $('.swiper-slide-prev')

            activeDets = '.' + $(currentSlide).data('project');


            $('.ss-project').removeClass('active')
            $(activeDets).addClass('active');

            lines = $(activeDets).find('.st-line');
            chars = lines.find('.st-char');
            sumLines = $(activeDets).find('.suml-wrap');
            date = $(activeDets).find('.ss1-date');
            catChars = $(activeDets).find('.cat_char');

            projectURL = $(activeDets).find('.ss1-url').attr('href');

            $('.ss1-button a').attr('href', projectURL)

            ssImage = $(currentSlide).find('.ss1-sl-image');
            ssImg = $(currentSlide).find('img');

            nextImage = $(nextSlide).find('img')
            prevImage = $(prevSlide).find('img')

        }



        projects.each(function (i) {

            i++

            let $this = $(this),
                title = $this.find('.ss1-title'),
                image = $this.children('.ss1-image'),
                video = $this.find('.showcase-video'),
                img = image.children('img'),
                src = img.attr('src'),
                cat = $this.find('.ss1-cat'),
                date = $this.find('.ss1-date'),
                summary = $this.find('.ss1-summary'),
                width = imagesWrapper.outerWidth();

            $this.attr('data-title', title.text());

            if (video.length) {

                imagesWrapper.append('<div class="ss1-image-wrap swiper-slide ss_slid_' + i + '" data-project="slide_' + i + '"><div class="ss1-sl-image"></div></div>');

                let targetSlid = $('.ss_slid_' + i).find('.ss1-sl-image');

                video.appendTo(targetSlid)

            } else {

                imagesWrapper.append('<div class="ss1-image-wrap swiper-slide ss_slid_' + i + '" data-project="slide_' + i + '"><div class="ss1-sl-image"><img src="' + src + '"/></div></div>');

            }


            new SplitText(summary, {
                type: 'lines',
                linesClass: 'ssum-line'
            });

            new SplitText(cat, {
                type: 'chars',
                charsClass: 'cat_char'
            });

            new SplitText(title, {
                type: 'lines , chars',
                linesClass: 'st-line',
                charsClass: 'st-char'
            });

            title.find('.st-line').wrapInner('<div class="tl-wrap"></div>');
            summary.find('.ssum-line').wrapInner('<div class="suml-wrap"></div>');


            new SplitText(date, {
                type: 'chars',
                charsClass: 'sd-char'
            });

            $this.attr('data-slide', i);
            $this.addClass('slide_' + i)



        })


        $('.ss1-images').wrapInner('<div class="swiper-wrapper"></div>')



        var prjectsSlider = new Swiper('.ss1-images', {
            slidesPerView: 1,
            speed: 1000,
            navigation: {
                nextEl: '.ss1-next',
                prevEl: '.ss1-prev',
            },
            pagination: {
                el: '.ss1-dots',
                type: 'bullets',
                clickable: true,
                renderBullet: function (index, className) {
                    return '<span class="' + className + '">0' + (index + 1) + '</span>';
                }
            },
            mousewheel: {
                invert: false,
                eventsTarget: '.showcase-slideshow'
            },
            loop: true,
            direction: 'vertical',
            on: {
                progress: function (swiper, progress) {


                },
                slideChange: function () {

                    slideCheck();

                },
                slidePrevTransitionStart: function () {

                    let slidePrevOut = gsap.timeline({
                        yoyo: true
                    });

                    slidePrevOut.fromTo(prevImage, 1.5, {
                        rotate: -5,
                        scale: 1.2
                    }, {
                        rotate: 0,
                        scale: 1,
                        ease: 'power2.out'
                    }, 0)


                    slidePrevOut.fromTo(catChars, .5, {
                        y: '0%',
                    }, {
                        y: '100%',
                        ease: 'power2.in',
                        stagger: -0.01
                    }, 0)

                    slidePrevOut.fromTo(sumLines, .6, {
                        y: "0%"
                    }, {
                        y: "100%",
                        stagger: -.02,
                        ease: 'power2.in'
                    }, .3)

                    lines.each(function () {

                        slidePrevOut.fromTo(chars, .6, {
                            y: '0%'
                        }, {
                            y: '110%',
                            ease: 'power2.in',
                            stagger: -.01
                        }, 0)

                    })
                },
                slidePrevTransitionEnd: function () {

                    slideCheck();

                    let slidePrevIn = gsap.timeline({
                        yoyo: true
                    });

                    slidePrevIn.fromTo(catChars, .5, {
                        y: '-100%',
                    }, {
                        y: '0%',
                        ease: 'power2.out',
                        stagger: 0.01
                    }, 0)

                    slidePrevIn.fromTo(sumLines, .6, {
                        y: "-100%"
                    }, {
                        y: "0%",
                        stagger: -.02,
                        ease: 'power2.out'
                    }, .3)

                    lines.each(function () {

                        slidePrevIn.fromTo(chars, .6, {
                            y: '-110%'
                        }, {
                            y: '0%',
                            ease: 'power2.out',
                            stagger: -.01
                        }, 0)

                    })

                },
                slideNextTransitionStart: function () {


                    let slideNextOut = gsap.timeline({
                        yoyo: true
                    });

                    slideNextOut.fromTo(nextImage, 1.5, {
                        rotate: 5,
                        scale: 1.2
                    }, {
                        rotate: 0,
                        scale: 1,
                        ease: 'power2.out'
                    }, 0)


                    slideNextOut.fromTo(catChars, .5, {
                        y: '0%',
                    }, {
                        y: '-100%',
                        ease: 'power2.in',
                        stagger: 0.01
                    }, 0)

                    slideNextOut.fromTo(sumLines, .6, {
                        y: "0%"
                    }, {
                        y: "-100%",
                        stagger: .02,
                        ease: 'power2.in'
                    }, .3)

                    lines.each(function () {

                        slideNextOut.fromTo(chars, .6, {
                            y: '0%',

                        }, {
                            y: '-110%',

                            ease: 'power2.in',
                            stagger: .01
                        }, 0)

                    })

                },
                slideNextTransitionEnd: function () {

                    slideCheck();

                    let slideNextIn = gsap.timeline({
                        yoyo: true
                    });

                    slideNextIn.fromTo(catChars, .5, {
                        y: '100%',
                    }, {
                        y: '0%',
                        ease: 'power2.out',
                        stagger: -0.01
                    }, 0)

                    slideNextIn.fromTo(sumLines, .6, {
                        y: "100%"
                    }, {
                        y: "0%",
                        stagger: .02,
                        ease: 'power2.out'
                    }, .3)

                    lines.each(function () {

                        slideNextIn.fromTo(chars, .6, {
                            y: '110%'
                        }, {
                            y: '0%',
                            opacity: 1,
                            ease: 'power2.out',
                            stagger: .01
                        }, 0)

                    })

                }
            }

        });


        slideCheck();



    }
    /* Showcase Slideshow */



    /* Showcase Slideshow V2 */

