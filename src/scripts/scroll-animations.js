    /** Scroll Animations **/

    /* Parallax Scroll Animations */

    function aParallaxScroll() {



        let hasParallax = $('.has-parallax'),
            parallaxBg = $('.parallax-bg');


        hasParallax.each(function () {

            let $this = $(this),
                strength = $this.data('parallax-strength'),
                direction = $this.data('parallax-direction'),
                pStrength = strength * 100 + '%',
                pVal;


            if (direction === 'up') {

                pVal = '-' + pStrength;

            } else if (direction === 'down') {

                pVal = pStrength;
            }



            gsap.to($this, {
                y: pVal,
                scrollTrigger: {
                    trigger: $this,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true
                }
            })

        })

        parallaxBg.each(function () {

            let $this = $(this);

            gsap.to($this, {
                backgroundPositionY: "100%",
                scrollTrigger: {
                    trigger: $this,
                    start: "top top",
                    scrub: 1.25,
                    end: "bottom top",
                }
            })

        })




    }


    /* Parallax Scroll Animations */

    function aScrollAnimations() {

        var hasAnim = $('.has-anim');

        //GSDevTools.create();

        hasAnim.each(function () {

            var $this = $(this),
                anim = $this.data('animation'),
                delay = $this.data('delay'),
                stagger = $this.data('stagger'),
                duration = $this.data('duration'),
                parent = $this.parent('div');


            if ((anim === 'linesUp') || (anim === 'linesDown') || (anim === 'linesFadeUp') || (anim === 'linesFadeDown') || (anim === 'linesFadeLeft') || (anim === 'linesFadeRight')) {

                var splitType = 'lines'



            } else if ((anim === 'wordsFadeUp') || (anim === 'wordsFadeDown') || (anim === 'wordsFadeLeft') || (anim === 'wordsFadeRight') || (anim === 'wordsUp') || (anim === 'wordsDown') || (anim === 'wordsLeft') || (anim === 'wordsRight')) {

                var splitType = 'words'



            } else if ((anim === 'charsFadeUp') || (anim === 'charsFadeDown') || (anim === 'charsFadeRight') || (anim === 'charsFadeLeft') || (anim === 'charsUp') || (anim === 'charsDown') || (anim === 'charsLeft') || (anim === 'charsRight')) {

                var splitType = 'lines, chars'

            }



            var splitto = new SplitText($this, {
                type: splitType,
                linesClass: 'anim_line',
                charsClass: 'anim_char',
                wordsClass: 'anim_word',
            });

            var lines = $this.find('.anim_line'),
                words = $this.find('.anim_word'),
                chars = $this.find('.anim_char');

            if (anim === 'linesFadeUp') {
                //                
                //                if (stagger == null) { var stagger = 0.1 }
                //                if (duration == null) { var duration = 1 }

                gsap.fromTo(lines, {
                    y: "100%",
                    opacity: 0
                }, {
                    y: "0%",
                    opacity: 1,
                    duration: duration,
                    stagger: stagger,
                    scrollTrigger: {
                        trigger: parent,
                        position: 'top top'
                    },
                    delay: delay,
                    ease: 'expo.out',
                    onComplete: function () {

                        splitto.revert();

                    }
                })

            } else if (anim === 'linesFadeDown') {
                gsap.fromTo(lines, {
                    y: "-100%",
                    opacity: 0
                }, {
                    y: "0%",
                    opacity: 1,
                    duration: duration,
                    stagger: stagger,
                    scrollTrigger: {
                        trigger: parent,
                        position: 'top top'
                    },
                    delay: delay,
                    onComplete: function () {

                        splitto.revert();

                    }
                })


            } else if (anim === 'linesFadeLeft') {
                gsap.fromTo(lines, {
                    x: "-100px",
                    opacity: 0
                }, {
                    x: "0",
                    opacity: 1,
                    duration: duration,
                    stagger: stagger,
                    scrollTrigger: {
                        trigger: parent,
                        position: 'top top'
                    },
                    delay: delay,
                    onComplete: function () {

                        splitto.revert();

                    }
                })


            } else if (anim === 'linesFadeRight') {
                gsap.fromTo(lines, {
                    x: "100px",
                    opacity: 0
                }, {
                    x: "0",
                    opacity: 1,
                    duration: duration,
                    stagger: stagger,
                    scrollTrigger: {
                        trigger: parent,
                        position: 'top top'
                    },
                    delay: delay,
                    onComplete: function () {

                        splitto.revert();

                    }
                })


            } else if (anim === 'linesUp') {

                lines.wrap('<span class="line-holder"></span>');

                gsap.fromTo(lines, {
                    y: "100%",

                }, {
                    y: "0%",
                    duration: duration,
                    stagger: stagger,
                    scrollTrigger: {
                        trigger: parent,
                        start: 'top bottom',
                    },
                    delay: delay,
                    ease: "power4.out",
                    onComplete: function () {

                        splitto.revert();

                    }
                })



            } else if (anim === 'linesDown') {

                lines.wrap('<span class="line-holder"></span>');

                gsap.fromTo(lines, {
                    y: "-100%",

                }, {
                    y: "0%",
                    duration: duration,
                    stagger: stagger,
                    scrollTrigger: {
                        trigger: parent,
                        position: 'top top'
                    },
                    delay: delay,
                    onComplete: function () {

                        splitto.revert();

                    }
                })



            } else if (anim === 'wordsFadeUp') {

                gsap.fromTo(words, {
                    y: "100%",
                    opacity: 0

                }, {
                    y: "0%",
                    duration: duration,
                    opacity: 1,
                    stagger: stagger,
                    scrollTrigger: {
                        trigger: parent,
                        position: 'top top'
                    },
                    delay: delay,
                    onComplete: function () {

                        splitto.revert();

                    }
                })

            } else if (anim === 'wordsFadeDown') {

                gsap.fromTo(words, {
                    y: "-100%",
                    opacity: 0

                }, {
                    y: "0%",
                    duration: duration,
                    opacity: 1,
                    stagger: stagger,
                    scrollTrigger: {
                        trigger: parent,
                        position: 'top top'
                    },
                    delay: delay,
                    onComplete: function () {

                        splitto.revert();

                    }
                })

            } else if (anim === 'wordsFadeLeft') {

                gsap.fromTo(words, {
                    x: "-100px",
                    opacity: 0

                }, {
                    x: "0",
                    duration: duration,
                    opacity: 1,
                    stagger: stagger,
                    scrollTrigger: {
                        trigger: parent,
                        position: 'top top'
                    },
                    delay: delay,
                    onComplete: function () {

                        splitto.revert();

                    }
                })

            } else if (anim === 'wordsFadeRight') {

                gsap.fromTo(words, {
                    x: "100px",
                    opacity: 0

                }, {
                    x: "0",
                    duration: duration,
                    opacity: 1,
                    stagger: stagger,
                    scrollTrigger: {
                        trigger: parent,
                        position: 'top top'
                    },
                    delay: delay,
                    onComplete: function () {

                        splitto.revert();

                    }
                })

            } else if (anim === 'wordsUp') {

                words.wrap('<span class="word-holder"></span>');

                gsap.fromTo(words, {
                    y: "100%",

                }, {
                    y: "0%",
                    duration: duration,
                    stagger: stagger,
                    scrollTrigger: {
                        trigger: parent,
                        position: 'top top'
                    },
                    delay: delay,
                    ease: "power2.out",
                    onComplete: function () {

                        splitto.revert();

                    }
                })

            } else if (anim === 'wordsDown') {

                words.wrap('<span class="word-holder"></span>');

                gsap.fromTo(words, {
                    y: "-100%",

                }, {
                    y: "0%",
                    duration: duration,
                    stagger: stagger,
                    scrollTrigger: {
                        trigger: parent,
                        position: 'top top'
                    },
                    delay: delay,
                    onComplete: function () {

                        splitto.revert();

                    }
                })

            } else if (anim === 'wordsLeft') {

                words.wrap('<span class="word-holder"></span>');

                gsap.fromTo(words, {
                    x: "-100%",

                }, {
                    x: "0%",
                    duration: duration,
                    stagger: stagger,
                    scrollTrigger: {
                        trigger: parent,
                        position: 'top top'
                    },
                    delay: delay,
                    onComplete: function () {

                        splitto.revert();

                    }
                })

            } else if (anim === 'wordsRight') {

                words.wrap('<span class="word-holder"></span>');

                gsap.fromTo(words, {
                    x: "100%",

                }, {
                    x: "0%",
                    duration: duration,
                    stagger: stagger,
                    scrollTrigger: {
                        trigger: parent,
                        position: 'top top'
                    },
                    delay: delay,
                    onComplete: function () {

                        splitto.revert();

                    }
                })

            } else if (anim === 'charsFadeUp') {

                gsap.fromTo(chars, {
                    y: "100%",
                    opacity: 0

                }, {
                    y: "0%",
                    opacity: 1,
                    duration: duration,
                    stagger: stagger,
                    scrollTrigger: {
                        trigger: parent,
                        position: 'top top'
                    },
                    delay: delay,
                    onComplete: function () {
                        splitto.revert();
                    }
                })


            } else if (anim === 'charsUp') {



                gsap.fromTo(chars, {
                    y: "100%",


                }, {
                    y: "0%",

                    duration: duration,
                    stagger: stagger,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: parent,
                        position: 'top top'
                    },
                    delay: delay,
                })


            } else if (anim === 'charsDown') {



                gsap.fromTo(chars, {
                    y: "-100%",


                }, {
                    y: "0%",

                    duration: duration,
                    stagger: stagger,
                    scrollTrigger: {
                        trigger: parent,
                        position: 'top top'
                    },
                    delay: delay,
                    onComplete: function () {

                        splitto.revert();

                    }
                })


            } else if (anim === 'charsLeft') {



                gsap.fromTo(chars, {
                    x: "-100%",


                }, {
                    x: "0%",

                    duration: duration,
                    stagger: stagger,
                    scrollTrigger: {
                        trigger: parent,
                        position: 'top top'
                    },
                    delay: delay,
                    onComplete: function () {

                        splitto.revert();

                    }
                })


            } else if (anim === 'charsRight') {



                gsap.fromTo(chars, {
                    x: "100%",


                }, {
                    x: "0%",

                    duration: duration,
                    stagger: stagger,
                    scrollTrigger: {
                        trigger: parent,
                        position: 'top top'
                    },
                    delay: delay,
                    onComplete: function () {

                        splitto.revert();

                    }
                })


            } else if (anim === 'charsFadeDown') {

                gsap.fromTo(chars, {
                    y: "-100%",
                    opacity: 0

                }, {
                    y: "0%",
                    opacity: 1,
                    duration: duration,
                    stagger: stagger,
                    scrollTrigger: {
                        trigger: parent,
                        position: 'top top'
                    },
                    delay: delay,
                    onComplete: function () {

                        splitto.revert();

                    }
                })


            } else if (anim === 'charsFadeLeft') {

                gsap.fromTo(chars, {
                    x: "-35px",
                    opacity: 0

                }, {
                    x: "0px",
                    opacity: 1,
                    duration: duration,
                    stagger: stagger,
                    scrollTrigger: {
                        trigger: parent,
                        position: 'top top'
                    },
                    delay: delay,
                    onComplete: function () {

                        splitto.revert();

                    }
                })


            } else if (anim === 'charsFadeRight') {

                gsap.fromTo(chars, {
                    x: "35px",
                    opacity: 0

                }, {
                    x: "0px",
                    opacity: 1,
                    duration: duration,
                    stagger: stagger,
                    scrollTrigger: {
                        trigger: parent,
                        position: 'top top'
                    },
                    delay: delay,
                    onComplete: function () {

                        splitto.revert();

                    }
                })

            } else if (anim === 'fadeUp') {

                gsap.fromTo($this, {
                    y: 50,
                    opacity: 0
                }, {
                    y: 0,
                    opacity: 1,
                    duration: duration,
                    stagger: stagger,
                    scrollTrigger: {
                        trigger: parent,
                        start: 'top center'
                    },
                    delay: delay,
                    onComplete: function () {

                        splitto.revert();

                    }
                })

            } else if (anim === 'fadeDown') {

                gsap.fromTo($this, {
                    y: -50,
                    opacity: 0
                }, {
                    y: 0,
                    opacity: 1,
                    duration: duration,
                    stagger: stagger,
                    scrollTrigger: {
                        trigger: parent,
                        start: 'top center'
                    },
                    delay: delay,
                    onComplete: function () {

                        splitto.revert();

                    }
                })

            } else if (anim === 'fadeLeft') {

                gsap.fromTo($this, {
                    x: -50,
                    opacity: 0
                }, {
                    x: 0,
                    opacity: 1,
                    duration: duration,
                    stagger: stagger,
                    scrollTrigger: {
                        trigger: parent,
                        start: 'top center'
                    },
                    delay: delay,
                    onComplete: function () {

                        splitto.revert();

                    }
                })

            } else if (anim === 'fadeRight') {

                gsap.fromTo($this, {
                    x: 50,
                    opacity: 0
                }, {
                    x: 0,
                    opacity: 1,
                    duration: duration,
                    stagger: stagger,
                    scrollTrigger: {
                        trigger: parent,
                        start: 'top center'
                    },
                    delay: delay,
                    onComplete: function () {

                        splitto.revert();

                    }
                })

            }

        });




        var imAnim = $('img.has-anim');
        CustomEase.create("blockEase", ".25,.74,.22,.99");

        imAnim.each(function (i) {
            i++

            let $this = $(this),
                anim = $this.data('animation'),
                delay = $this.data('delay'),
                duration = $this.data('duration'),
                ovColor = $this.data('color');

            if ((anim === 'blockUp') || (anim === 'blockLeft') || (anim === 'blockRight')) {

                $this.wrap('<div class="img-anim-wrapper"></div>');

                let parWrap = $this.parent('.img-anim-wrapper');

                parWrap.prepend('<span class="img-anim-ov"></span>');

                let animOv = parWrap.children('.img-anim-ov');

                gsap.to($this, {
                    scale: 1,
                    duration: duration * 2,
                    delay: delay,
                    scrollTrigger: {
                        trigger: parWrap,
                        start: 'top center'
                    },
                    ease: "power3.out",
                })



                if (anim === 'blockUp') {

                    gsap.set(animOv, {
                        background: ovColor
                    })

                    gsap.to(animOv, {
                        height: "0%",
                        delay: delay,
                        scrollTrigger: {
                            trigger: parWrap,
                            start: 'top center'
                        },
                        duration: duration,
                        ease: 'blockEase'
                    })


                }

                if (anim === 'blockLeft') {

                    gsap.set(animOv, {
                        background: ovColor
                    })

                    gsap.to(animOv, {
                        width: "0%",
                        delay: delay,
                        scrollTrigger: {
                            trigger: parWrap,
                            start: 'top center'
                        },
                        duration: duration,
                        ease: 'blockEase'
                    })


                }

                if (anim === 'blockRight') {

                    gsap.set(animOv, {
                        left: 'unset',
                        background: ovColor
                    })

                    gsap.to(animOv, {
                        width: "0%",
                        delay: delay,
                        scrollTrigger: {
                            trigger: parWrap,
                            start: 'top center'
                        },
                        duration: duration,
                        ease: 'blockEase'
                    })


                }


            } else if ((anim === 'slideUp') || (anim === 'slideLeft') || (anim === 'slideRight')) {

                let imgHeight = $this.outerHeight(),
                    imgWidth = $this.outerWidth();

                $this.wrap('<div class="img-anim-wrapper"></div>');

                let parWrap = $this.parent('.img-anim-wrapper'),
                    sImage = parWrap.parent('.single-image');

                gsap.set(parWrap, {
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0
                })

                gsap.set(sImage, {
                    width: imgWidth,
                    height: imgHeight
                })

                gsap.set($this, {
                    position: 'absolute',
                    width: imgWidth,
                    height: imgHeight,
                })



                gsap.to($this, {
                    scale: 1,
                    duration: duration * 2,
                    delay: delay,
                    scrollTrigger: {
                        trigger: parWrap,
                        start: 'top 85%'
                    },
                    ease: "power3.out",
                })


                if ((anim === 'slideUp')) {

                    gsap.set($this, {
                        left: 0,
                        top: 0
                    })

                    gsap.set(parWrap, {
                        width: imgWidth,
                        height: 0,

                    })

                    gsap.to(parWrap, {
                        height: imgHeight,
                        duration: duration,
                        scrollTrigger: {
                            trigger: parWrap,
                            start: 'top 85%',

                        },
                        delay: delay,
                        ease: "blockEase"
                    })


                } else if ((anim === 'slideLeft')) {

                    gsap.set($this, {
                        left: 0

                    })

                    gsap.set(parWrap, {
                        width: 0,
                        height: imgHeight,

                    })

                    gsap.to(parWrap, {
                        width: imgWidth,
                        duration: duration,
                        scrollTrigger: {
                            trigger: parWrap,
                            start: 'top 85%'

                        },
                        delay: delay,
                        ease: "blockEase"
                    })

                } else if ((anim === 'slideRight')) {

                    gsap.set($this, {
                        left: "unset",
                        right: 0

                    })

                    gsap.set(parWrap, {
                        width: 0,
                        height: imgHeight,
                        left: 'unset'

                    })

                    gsap.to(parWrap, {
                        width: imgWidth,
                        duration: duration,
                        scrollTrigger: {
                            trigger: parWrap,
                            start: 'top 85%'
                        },
                        delay: delay,
                        ease: "blockEase"
                    })

                }


            };



        })

    }

