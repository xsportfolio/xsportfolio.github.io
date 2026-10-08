    function aSingleImage() {

        var singleImage = $('.single-image');

        singleImage.each(function () {

            let $this = $(this),
                img = $this.children('img'),
                imgSrc = $this.find('img').attr('src'),
                imgParallax = $this.attr('data-parallax'),
                parallaxType = $this.attr('data-parallax-type'),
                lightBox = $this.attr('data-lightbox');

            var mobileQuery = window.matchMedia('(max-width: 900px)')
            if (!mobileQuery.matches) {

                if (imgParallax === 'true') {

                    if (parallaxType === 'zoom') {

                        let finalHeight = img.outerHeight() - 200;
                        $this.addClass('parallax_wrapper');

                        gsap.set($this, {
                            height: finalHeight
                        });

                        gsap.set(img, {
                            y: -100
                        })

                        gsap.to(img, {
                            scale: 1.25,
                            scrollTrigger: {
                                trigger: $this,
                                start: "top bottom",
                                scrub: 1.25,
                                end: "bottom top"
                            }
                        })


                    } else if (parallaxType === 'directional') {

                        let finalHeight = img.outerHeight() - 200;

                        img.hide();
                        $this.addClass('parallax_wrapper')

                        gsap.set($this, {
                            backgroundImage: 'url(' + imgSrc + ')',
                            height: finalHeight
                        })


                        gsap.to($this, {
                            backgroundPositionY: "100%",
                            scrollTrigger: {
                                trigger: $this,
                                start: "top bottom",
                                scrub: 1.25,
                                end: "bottom top"
                            }
                        })

                    }



                }

            }



            if (lightBox != null) {

                ////////// Image Lightbox Start //////////
                $this.addClass('lightbox')

                var dataMfpSrc = lightBox;

                img.attr('data-mfp-src', dataMfpSrc);

                $this.magnificPopup({
                    delegate: 'img', // child items selector, by clicking on it popup will open
                    type: 'image',
                    closeOnContentClick: true,
                    closeBtnInside: false,
                    mainClass: 'image-lightbox', // class to remove default margin from left and right side
                    image: {
                        verticalFit: true
                    },
                    zoom: {
                        enabled: true,
                        duration: 300 // don't foget to change the duration also in CSS
                    },
                    // other options
                });

                ////////// Image Lightbox End //////////

            }

        })

    }


    /** Single Image **/

    /** Image Carousel **/

