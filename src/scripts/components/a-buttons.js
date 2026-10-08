    function aButtons() {

        var aButton = $('.a-button');

        aButton.each(function () {

            var $this = $(this),
                overlay = '<span class="button-overlay"></span>';

            if ($this.hasClass('style_1')) {

                $this.prepend(overlay);

                let parentOffset = $this.offset(),
                    overlayIn = $this.children('.button-overlay')

                $this.on('mouseenter', function (e) {

                    gsap.set(overlayIn, {
                        left: e.pageX - parentOffset.left,
                        top: e.pageY - parentOffset.top

                    })

                    gsap.to(overlayIn, {
                        width: '100%',
                        height: '100%'
                    })

                });

                $this.on('mouseleave', function (e) {
                    gsap.to(overlayIn, {
                        width: '0%',
                        height: '0%'
                    })
                })
            }

        });


        var circularButton = $('.circular-button');

        circularButton.each(function () {


            let $this = $(this),
                target = $this.attr('href');

            if ($this.hasClass('scroller')) {

                $this.on('click', function (e) {

                    e.preventDefault();

                    gsap.to(window, {
                        duration: 1,
                        scrollTo: target,
                        ease: 'power2.out'
                    });


                })


            }


        })

        var scrollNot = $('.scroll-notice');

        scrollNot.on('click', function () {

            let $this = $(this),
                target = $this.data('target');

            gsap.to(window, {
                duration: 3,
                scrollTo: target,
                ease: 'power2.out'
            });

        })


    }

    /* Buttons */


    /* Embed Video*/

