    function aTestimonials() {

        var testimonials = $('.a-testimonials'),
            activeTest,
            activeIndex,
            nextTest,
            prevTest,
            lastTest,
            firstTest,
            testSpans;


        testimonials.each(function () {

            let $this = $(this),
                testimonial = $this.find('.a-testimonial'),
                controls = $this.children('.a-testimonials-control'),
                wrapper = $this.children('.a-testimonials-wrapper'),
                prev = $this.find('.a-test-prev'),
                next = $this.find('.a-test-next'),
                total = testimonial.length;

            testimonial.first().addClass('active');

            $('.a-test-total').html('0' + total)

            testimonial.each(function (i) {

                i++

                let $this = $(this),
                    text = $this.children('.testimonial-text');


                $this.attr('data-testimonial', i);
                $this.addClass('testm_' + i);

                new SplitText(text, {
                    type: 'lines'
                });

                let lines = text.find('div'),
                    metas = $this.children('.testimonial-meta').find('div');

                lines.wrapInner('<span></span>');
                metas.wrapInner('<span></span>');


            })

            function checkTestimonals() {

                activeTest = $('.a-testimonial.active');
                activeIndex = activeTest.data('testimonial');
                nextTest = activeTest.next('.a-testimonial');
                prevTest = activeTest.prev('.a-testimonial');
                lastTest = $('.a-testimonial').last();
                firstTest = $('.a-testimonial').first();
                testSpans = activeTest.find('span');

                if (!prevTest.length) {

                    prevTest = lastTest;

                }

                if (!nextTest.length) {

                    nextTest = firstTest;

                }

                $('.a-test-current').html('0' + activeIndex)


            }

            activeTest = $('.a-testimonial.active');
            gsap.set(wrapper, {
                height: activeTest.outerHeight()
            })

            next.on('click', function (i) {

                checkTestimonals();

                gsap.to(wrapper, {
                    height: nextTest.outerHeight()
                })

                gsap.fromTo(testSpans, 0.75, {
                    y: '0%'
                }, {
                    y: '-110%',
                    stagger: 0.1,
                    ease: 'power2.Out',
                    onComplete: function () {

                        activeTest.removeClass('active')
                        nextTest.addClass('active');


                        checkTestimonals();

                        gsap.fromTo(testSpans, .6, {
                            y: '110%'
                        }, {
                            y: '0%',
                            stagger: 0.05,
                            ease: 'power2.Out',
                        })

                    }
                })


            });

            prev.on('click', function (i) {

                checkTestimonals();

                gsap.to(wrapper, {
                    height: prevTest.outerHeight()
                })

                gsap.fromTo(testSpans, 0.75, {
                    y: '0%'
                }, {
                    y: '-110%',
                    ease: 'power2.In',
                    stagger: 0.1,
                    onComplete: function () {

                        activeTest.removeClass('active')
                        prevTest.addClass('active');

                        checkTestimonals();

                        gsap.fromTo(testSpans, .6, {
                            y: '110%'
                        }, {
                            y: '0%',
                            stagger: 0.05,
                            ease: 'power2.Out',
                        })

                    }
                })


            });

            if ($this.hasClass('autoplay')) {

                let testCounter = testimonials.find('.a-testimonials-count'),
                    testProgress = testCounter.children('span');

                let testAutPlay = gsap.fromTo(testProgress, {
                    width: '0%'
                }, {
                    width: '100%',
                    duration: 5,
                    repeat: -1,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: testimonials,
                        start: 'top bottom',
                    },
                    onRepeat: function () {
                        next.trigger('click')
                    }
                })

                $this.on('mouseenter', function () {

                    testAutPlay.pause();

                })

                $this.on('mouseleave', function () {

                    testAutPlay.play();

                })

            }

        })


    }

    /* Testimonials */

    /* Seperator */

