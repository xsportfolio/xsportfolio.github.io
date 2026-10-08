    function pageLoader() {

        loader = $('.a-page-loader');

        if (siteLoader == true) {


            $('.apl-count').wrap('<div class="apl-wrapper"></div>');

            var loaderLayout = loader.data('layout');

            loader.addClass(loaderLayout)


            const nums1 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 1],
                nums2 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

            let num1Text = '';
            let num2Text = '';

            for (let i = 0; i < nums1.length; i++) {
                num1Text += '<span>' + nums1[i] + '</span>';
            }

            for (let i = 0; i < nums2.length; i++) {
                num2Text += '<span>' + nums2[i] + '</span>';
            }

            $('.apl-count').append('<div class="apl-num apl-num-1"></div><div class="apl-num apl-num-2"></div><div class="apl-num apl-num-3"></div>')

            $('.apl-num-1').html(num1Text);
            $('.apl-num-2').html(num2Text);
            $('.apl-num-3').html('<span>%</span><span>0</span>');

            $('.apl-num').wrapInner('<div class="apl-num-wrapper"></div>')


            var aplCount = loader.find('.apl-count'),
                num1wrap = aplCount.find('.apl-num-1 .apl-num-wrapper'),
                num2wrap = aplCount.find('.apl-num-2 .apl-num-wrapper'),
                num3wrap = aplCount.find('.apl-num-3 .apl-num-wrapper'),

                duration = loader.data('duration');


            loadAn = gsap.timeline({
                yoyo: true,
                id: 'pageLoader',
                once: true,
                onStart: function () {
                    $('body').addClass('loading');

                },

            });

            loadAn.to(num1wrap, duration, {
                y: '-91%',
                ease: 'power2.inOut',
            }, .25)

            loadAn.to(num2wrap, duration, {
                y: '-95.3%',
                ease: 'power2.inOut',
            }, .25)

            loadAn.to(num3wrap, 1.5, {
                y: '0%',
                ease: 'power2.Out',
            }, .5)

            loadAn.to('.site-logo', 1, {
                y: '0%',
                ease: 'power2.out',
            }, 2)


            if (siteHeader.hasClass('classic_menu')) {

                gsap.set('.main-menu > li', {
                    overflow: 'hidden'
                })

                loadAn.fromTo('.main-menu > li > a', 1, {
                    y: '100%'
                }, {
                    y: '0%',
                    stagger: .1,
                    ease: 'power2.out',
                    onComplete: function () {
                        gsap.set('.main-menu > li', {
                            clearProps: 'all'
                        })

                    }
                }, 3)

            } else {
                loadAn.to('.toggle-line', 1, {
                    width: 50,
                    ease: 'power2.out',
                    stagger: .3
                }, 3)

            }

            loadAn.to('.header-widget', 1.5, {
                x: 0,
                opacity: 1,
                ease: 'power2.out',
            }, 4)

            loadAn.to(num3wrap, 1, {
                y: '-50%',
                ease: 'power2.Out',
            }, duration - .6)

            //  Loader Out

            loadAn.to('.apl-num-wrapper', .6, {
                y: '-100%',
                ease: 'power2.in',
                stagger: .1,
            }, duration + .6)



        } else {

            gsap.set('.site-logo', {
                y: '0%',
            })

            gsap.set('.toggle-line', {
                width: 50,
            })

            gsap.set('.header-widget', {
                x: 0,
                opacity: 1,
            })

            loader.hide();


        }


    }



