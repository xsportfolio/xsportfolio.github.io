    function aSeperator() {

        let seperator = $('.a-seperator');

        seperator.each(function () {

            let $this = $(this),
                bgColor = $this.data('color'),
                willAnim = $this.data('anim');

            gsap.set($this, {
                backgroundColor: bgColor
            })


            if (willAnim == true) {

                gsap.to($this, 1.5, {
                    width: '100%',
                    scrollTrigger: {
                        trigger: $this
                    },
                    ease: 'power1.inOut'
                })
            }

        });

    }


    /* Seperator */

    /* Buttons */

