    function aHeading() {

        var heading = $('.a-heading');

        heading.each(function () {

            let $this = $(this),
                parallax = $this.data('parallax'),
                image = $this.data('image'),
                bgText = $this.data('background-text'),
                img = $this.children('.ah-image'),
                title = $this.children('.ah-title');

            if (parallax == true) {

                $this.addClass('will_anim')

                if (image == true) {

                    $this.addClass('with_image');

                    gsap.to(img, {
                        y: -100,
                        scrollTrigger: {
                            trigger: $this,
                            start: 'top bottom',
                            scrub: true
                        }
                    })


                    gsap.to(title, {
                        y: 100,
                        scrollTrigger: {
                            trigger: $this,
                            start: 'top bottom',
                            scrub: true
                        }
                    })




                } else {

                    $this.addClass('no-image');

                    if (bgText != null) {

                        $this.prepend('<div class="heading-bg-text">' + bgText + '</div>')

                        gsap.to($this.find('.heading-bg-text'), {
                            x: '-20%',
                            scrollTrigger: {
                                trigger: $this,
                                start: 'top bottom',
                                end: 'bottom top',
                                scrub: true,
                                markers: false

                            }

                        })


                    }


                }



            }

        })

    }

    /* Heading */

    /* Recent Works Carousel */

