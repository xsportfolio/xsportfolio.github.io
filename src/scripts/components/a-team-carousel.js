    function aTeamCarousel() {

        var aTeam = $('.a-team');

        aTeam.each(function () {

            let $this = $(this),
                container = $this.children('.team-container'),
                member = $this.find('.swiper-slide');

            container.addClass('cakomako')

            var teamCarousel = new Swiper('.team-container', {
                slidesPerView: "auto",
                navigation: {
                    nextEl: '.prev'
                },
                //                freeMode: true,
                spaceBetween: 15,
                pagination: {
                    el: '.team-progress',
                    type: 'progressbar',
                },
                grabCursor: true,
                //                freeModeSticky: true,
                //                freeModeMinimumVelocity: 0.1,
                //                freeModeMomentumRatio: 2


            });

            member.on('mouseenter', function () {

                let $this = $(this),
                    socials = $this.children('.tm-socials'),
                    icons = socials.find('li');

                var socialsAnim = gsap.to(icons, .4, {
                    x: 0,
                    opacity: 1,
                    stagger: 0.1,
                    overwrite: true
                })

                window.socialsAnim = socialsAnim;

            });

            member.on('mouseleave', function () {

                let $this = $(this),
                    socials = $this.children('.tm-socials'),
                    icons = socials.find('li');

                var socialsAnim = gsap.to(icons, .4, {
                    x: '100%',
                    opacity: 0,
                    stagger: -0.1,
                    overwrite: true
                })


            })


        })


    }



    /* Team Carousel */

    /* Scrollable Text */

