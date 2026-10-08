    function alitohServicesS1() {

        var services = $('.a-services.style_1'),
            service = services.find('.service'),
            parentSec = services.parents('.section'),
            serLength = service.length;

        if (services.length) {



            service.each(function () {

                let $this = $(this),
                    title = $this.find('.service-title'),
                    content = $this.find('.service-content');

                new SplitText(title, {
                    type: 'lines, chars',
                    linesClass: 'tit-line',
                    charsClass: 'tit-char'
                })

                new SplitText(content, {
                    type: 'lines',
                    linesClass: 'cont-line'
                })


            });



            var ssss = new Swiper('.service-images', {
                slidesPerView: 1,
                direction: 'vertical',
                freeMode: true,
                freeModeMinimumVelocity: 0.99,
                mousewheel: {
                    invert: false,
                    eventsTarget: '.a-services',
                    freeModeSticky: true,
                    sensitivity: 0.3
                },
            });

            let findSer;

            findSer = $('.s-imgo.swiper-slide-active').data('service');

            $(findSer).addClass('active');







            ssss.on('activeIndexChange', function () {

                let titleChars
                serAnim = gsap.timeline({

                });

                serAnim.fromTo(titleChars, {
                    y: '0%'
                }, {
                    y: '-100%',
                    onComplete: function () {
                        $('.service').removeClass('active');

                        findSer = $('.s-imgo.swiper-slide-active').data('service');

                        $(findSer).addClass('active')


                    }
                })

                serAnim.fromTo(titleChars, {
                    y: '100%'
                }, {
                    y: '0%',
                    onStart: function () {



                    }
                })



            })

            ScrollTrigger.create({
                trigger: '.a-services',
                pin: true,
                pinSpacing: true,
                start: 'top top',
                end: 'bottom top',
                onEnter: function () {




                }

            })






        }



    }



    /** Services Style 1 **/

    /** Services Style 2 **/

