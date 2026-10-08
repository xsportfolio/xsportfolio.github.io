    function aShowcaseList() {

        var showcaseList = $('.showcase-list'),
            wrapper = $('.showcase-list-wrapper'),
            listProject = showcaseList.find('.sl-project'),
            slImages = $('.sl-images'),
            activeImage;

        listProject.each(function (i) {

            i++

            let $this = $(this),
                image = $this.find('.sl-project-image'),
                title = $this.find('.sl-project-title'),
                video = $this.find('.showcase-video');


            image.wrapInner('<div class="sl-hover-wrap"></div>');
            image.addClass('image_' + i);
            slImages.append(image)

            $this.attr('data-image', '.image_' + i)


            if (i < 10) {
                $this.attr('data-index', '0' + i)
            } else {
                $this.attr('data-index', i)
            }


            $this.on('mouseenter', function () {

                let findImg = $this.data('image')

                gsap.set(findImg, {
                    visibility: 'visible'
                });

                listProject.addClass('opdown')
                $this.removeClass('opdown');
                $(findImg).addClass('active');

            })

            $this.on('mouseleave', function () {

                gsap.set('.sl-project-image', {
                    visibility: 'hidden'
                })

                listProject.removeClass('opdown')

                $('.sl-project-image').removeClass('active')

            })

        })


        let wrapperHeight = wrapper.outerHeight(),
            scrollTot = wrapperHeight - $(window).outerHeight();


        let listScroll = gsap.to(wrapper, {
            y: '-100%'
        })

        ScrollTrigger.create({
            trigger: wrapper,
            start: "top top",
            end: 'bottom+=1000 top',
            id: 'showcaseScroll',
            animation: listScroll,
            scrub: true,
            pin: true,
            pinType: 'fixed',
            pinSpacing: false,

        });

        ScrollTrigger.create({

            trigger: showcaseList,
            start: 'top top',
            end: 'bottom top',
            onLeave: function () {

                gsap.to('.showcase-footer', {
                    opacity: 0

                })
            },

        })

        window.addEventListener("mousemove", function (event) {
            let x = event.clientX,
                y = event.clientY;

            gsap.to('.sl-images', {
                top: y,
                left: x
            })



        });




    }


    /* Showcase List */

    /* Showcase Fullscreen Slider */
