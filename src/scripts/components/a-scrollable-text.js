    function aScrollableText() {

        var scText = $('.scrollable-text');

        scText.each(function () {

            let $this = $(this);

            gsap.fromTo($this, {
                x: '40%'
            }, {
                x: '-40%',
                scrollTrigger: {
                    trigger: $this,
                    scrub: 2,
                    start: 'top bottom',
                    end: 'bottom top',
                }
            })


        })


    }


    /* Scrollable Text */



    /* Showcase List */

