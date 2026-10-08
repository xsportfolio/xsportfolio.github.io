    function aPersonalHead() {

        let aph = $('.a-personal-head');

        aph.each(function () {

            let $this = $(this),
                name = $this.children('.aph-name'),
                image = $this.children('.aph-image'),
                willAnim = $this.data('animate');


            name.clone().addClass('back').insertAfter(name);


            if (willAnim == true) {

                let mobileQuery = window.matchMedia('(max-width: 1024px)')

                if (mobileQuery.matches) {

                    var nameFront = $('.name-front, .name-back'),
                        nameBack = $('.aph-name.back .name-back');

                } else {

                    var nameFront = $('.name-front'),
                        nameBack = $('.aph-name.back .name-back');
                }


                new SplitText(nameFront, {
                    type: 'chars',
                    charsClass: 'name_char'
                })

                new SplitText(nameBack, {
                    type: 'chars',
                    charsClass: 'name_char'
                })

                new SplitText('.aph-welc', {
                    type: 'chars',
                    charsClass: 'welc_char'
                })

                new SplitText('.aph-sub-text', {
                    type: 'lines',
                    linesClass: 'aph_sub_line'
                })

                $('.aph_sub_line').wrapInner('<span></span>')

                // Welcome Animation

                let aphWelcome = gsap.timeline({
                    once: true
                })

                aphWelcome.fromTo('.name_char', 1.5, {
                    y: '100%'
                }, {
                    y: '0%',
                    stagger: 0.03,
                    ease: 'power2.out',
                    onComplete: function () {

                        const mobileQuery = window.matchMedia('(max-width: 450px)')
                        if (!mobileQuery.matches) {


                            $this.on('mousemove', function (e) {

                                let mouseLeft = e.pageX,
                                    mouseTop = e.pageY,
                                    names = $this.find('.aph-name')

                                gsap.to(names, {
                                    // x: -mouseLeft / 10,
                                    duration: .6,

                                });

                                gsap.to('.aph-image', {
                                    // x: -mouseLeft / 20,
                                    duration: .6,

                                });

                            })

                        }

                    }
                }, .5)

                aphWelcome.fromTo('.welc_char', 1, {
                    y: '100%'
                }, {
                    y: '0%',
                    stagger: 0.02,
                    ease: 'power2.out'
                }, 0)

                aphWelcome.fromTo('.aph_sub_line span', 1, {
                    y: '100%'
                }, {
                    y: '0%',
                    stagger: 0.1,
                    ease: 'power2.out'
                }, 1.5)

                aphWelcome.fromTo('.aph-image', 2.5, {
                    scale: .9,
                    opacity: 0
                }, {
                    scale: 1,
                    opacity: 1,
                    ease: 'power2.inOut'
                }, 0)

                aphWelcome.fromTo('.circular-button', 1, {
                    width: 0,
                    height: 0
                }, {
                    width: 150,
                    height: 150,
                    ease: 'power2.inOut',
                    onComplete: function () {

                        gsap.to('.circular-button span', {
                            opacity: 1
                        })
                    }
                }, 1.5)





                // Welcome Animation


            } else {

                $this.on('mousemove', function (e) {

                    let mouseLeft = e.pageX,
                        mouseTop = e.pageY,
                        names = $this.find('.aph-name')

                    gsap.to(names, {
                        x: -mouseLeft / 10,
                    });

                })


            }





        })



    }




    /** Personal Head **/

    /** Forms **/

