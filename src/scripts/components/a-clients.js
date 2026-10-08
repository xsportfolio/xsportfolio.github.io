    function aClients() {

        var clients = $('.a-clients');

        clients.each(function () {

            let $this = $(this),
                client = $this.find('.a-client'),
                willAnim = $this.data('anim');

            if (willAnim == true) {

                gsap.fromTo(client, 1, {
                    x: '10%',
                    opacity: 0,
                }, {
                    x: '0%',
                    opacity: 1,
                    stagger: 0.1,
                    ease: 'power2.Out',
                    scrollTrigger: {
                        trigger: $this,
                        start: 'top bottom',
                        markers: false
                    }
                })
            }
        })

    }



    /* Testimonials */

