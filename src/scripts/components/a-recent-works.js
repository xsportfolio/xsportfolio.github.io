    function aRecentWorks() {

        var recentWorkCarousel = $('.a-recent-works');


        recentWorkCarousel.each(function () {

            let $this = $(this),
                wrapper = $this.children('.recent-works-wrapper'),
                wrapperWidth = wrapper.outerWidth(),
                wrapTransVal = wrapperWidth - window.outerWidth + window.outerWidth / 2,
                bgText = $this.find('.recent-works-bg-text'),
                parentSec = $this.parents('.wrapper'),
                navType = $this.data('navigate');

            if (navType === 'scroll') {

                $this.addClass('navby-scroll')

                var scrollAn = gsap.to(wrapper, {
                    x: "-" + wrapTransVal,

                });

                var cumba = gsap.to(bgText, {
                    x: "0%",
                    scrollTrigger: {
                        trigger: $this,
                        start: "top top",
                        end: "bottom top",
                        scrub: 2,
                        pin: true,
                        snap: false,
                        pinType: 'fixed',
                        pinSpacing: 'margin'
                    }
                })

                ScrollTrigger.create({
                    animation: scrollAn,
                    trigger: $this,
                    start: "top top",
                    end: "bottom top",
                    scrub: 2,
                    pin: true,
                    snap: false,
                    pinSpacing: 'false',
                    anticipatePin: false,
                    pinType: 'fixed'

                });

                gsap.fromTo($this, {
                    x: '100%'
                }, {
                    x: '0%',
                    scrollTrigger: {
                        trigger: parentSec,
                        pin: false,
                        start: 'top bottom',
                        end: 'top top',
                        scrub: 2
                    }
                })

                gsap.fromTo($this, {
                    x: '0%'
                }, {
                    x: '-25%',
                    scrollTrigger: {
                        trigger: parentSec,
                        pin: false,
                        scrub: 2,
                        start: 'bottom bottom',
                        end: 'bottom top',
                    }

                })



            } else if (navType === 'arrows') {

                $this.addClass('navby-arrows');

                let slides = $this.find('.ar-work'),
                    totSlides = slides.length,
                    slideWidth = $('.ar-work').outerWidth(),
                    nextButton = $('.arw-next'),
                    prevButton = $('.arw-prev');

                slides.each(function (i) {

                    i++
                    let $this = $(this);

                    $this.attr('data-index', i);
                    $this.addClass('slide_' + i)

                })

                $('.ar-work:first-child').addClass('active')

                var arrowClicks = 0;

                nextButton.on('click', function () {

                    $('.ar-work').removeClass('active');

                    gsap.to('.ar-work', {
                        x: "-100%"
                    })

                })

                Draggable.create(wrapper, {
                    type: "x",
                    bounds: $this,
                    autoScroll: true,
                    inertia: true,
                    edgeResistance: 0.4,
                    dragResistance: 0.4,
                    throwProps: true,
                    onDrag: function (message, num) {
                        console.log("message: " + message + ", num: " + num);
                    }
                });

            }

        })


    }


    /* Recent Works Carousel */

    /* Linked Text */

