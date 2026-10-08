    function aServicesS2() {

        if ($('.a-services').length) {

            let aSer2 = $('.a-services.style_2'),
                service = aSer2.find('.service'),
                willanim = aSer2.data('anim');


            service.each(function (i) {
                i++

                let $this = $(this),
                    content = $this.children('.service-wrap'),
                    contHeight = content.outerHeight(),
                    title = $this.children('.service-title');


                $this.attr('data-height', contHeight)

                gsap.set(content, {
                    height: 0,
                })

                if (willanim == true) {

                    new SplitText(title, {
                        type: 'lines, chars',
                        charsClass: 'ser_tit_char',
                        linesClass: 'ser_tit_line'
                    })

                    let chars = $this.find('.ser_tit_char')

                    gsap.fromTo(chars, {
                        y: '100%'


                    }, {
                        y: '0%',
                        stagger: 0.02,
                        duration: 1,
                        ease: 'power2.Out',
                        scrollTrigger: {
                            trigger: $this,
                        }
                    })

                }

            })

            service.on('click', function () {

                let $this = $(this),
                    content = $this.children('.service-wrap'),
                    contentInner = content.children('.service-cont'),
                    contHeight = $this.data('height');



                if ($this.hasClass('active')) {

                    $this.removeClass('active');

                    gsap.to(content, .3, {
                        height: 0,
                        ease: 'power2.Out',
                        delay: .3
                    })

                    gsap.to(contentInner, .3, {
                        opacity: 0
                    })


                } else {

                    service.removeClass('active')
                    $this.addClass('active');


                    let other = service.not('.active'),
                        otherContent = other.children('.service-wrap'),
                        otherInner = other.children('.service-cont');


                    gsap.to(content, .3, {
                        height: contHeight,
                        ease: 'power2.In',
                        onComplete: function () {
                            let scTop = $this.offset().top;

                            gsap.to(window, .8, {
                                scrollTo: scTop - 100,
                                ease: 'power3.In'
                            })
                        }

                    })

                    gsap.to(contentInner, .3, {
                        opacity: 1,
                        delay: .2
                    })



                    gsap.to(otherContent, .3, {
                        height: 0,
                        ease: 'power2.Out',
                    }, .15)

                    gsap.to(otherInner, .3, {
                        opacity: 0
                    })


                }

            })

        }

    }

    /** Services Style 2 **/

    /** Personal Head **/

