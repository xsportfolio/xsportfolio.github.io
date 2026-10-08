    function aImageCarousel() {

        var aiCarousel = $('.a-image-carousel');

        aiCarousel.each(function () {

            let $this = $(this),
                navigate = $this.data('navigate'),
                wrapper = $this.children('.ai-wrapper'),
                xVal = wrapper.outerWidth() - $(window).outerWidth();

            if (navigate === 'scroll') {

                gsap.to(wrapper, {
                    x: -xVal,
                    scrollTrigger: {
                        trigger: $this,
                        scrub: 1.2,
                        start: 'center center',
                        end: () => `+=${xVal}`,
                        markers: false,
                        pin: true
                    }
                })

            } else if (navigate === 'drag') {

                var velocityX;

                Draggable.create(wrapper, {
                    type: "x",
                    duration: 1,
                    bounds: $this,
                    edgeResistance: 0.75,
                    dragResustance: 0.55,
                    throwProps: true,
                    intertia: true,
                    onPress: function () {
                        // track the x and y properties:
                        InertiaPlugin.track(wrapper, "x,y");


                        velocityX = InertiaPlugin.getVelocity(wrapper, "x");


                    },
                    onDrag: function () {


                        gsap.to(wrapper, {
                            x: this.x - velocityX / 100,
                            ease: "power2",
                            overwrite: "auto",
                            // skewX:"+=1", //meaningless - we tweak the values in the modifier below. We needed to make the skewX tween to something just so that it's included in the tweening values.

                        });
                    },

                });


            }



        })

    }


    /** Image Carousel **/

    /** Single Project **/

