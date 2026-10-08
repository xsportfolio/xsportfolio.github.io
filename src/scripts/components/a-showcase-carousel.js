    function aShowcaseCarousel() {

        var project = $('.cas-project'),
            wrapper = $('.cas-project-wrapper'),
            projectTitles = $('.cas-titles'),
            headline = $('.cas-headline'),
            bgText = $('.cas-bg-text'),
            wrapFirstTrans = $(window).outerWidth() / 100 * 90,
            activeProject;

        new SplitText(headline, {
            type: 'lines',
            linesClass: 'cas-line',
        })

        project.each(function (i) {

            i++
            let $this = $(this),
                title = $this.find('.cs-title'),
                img = $this.find('img').attr('src');

            $this.addClass('cas_project_' + i)

            $this.attr('data-title', '.title_' + i)

            projectTitles.append(title.addClass('title_' + i));

            title.attr('data-project', '.cas_project_' + i)

        });

        projectTitles.wrapInner('<div class="cas-titles-wrap"></div>')


        $('.cas-line').wrapInner('<span></span>')

        gsap.to('.cas-line span', {
            y: '-100%',
            stagger: 0.01,
            ease: 'none',
            scrollTrigger: {
                trigger: '.carousel-showcase',
                start: 'top top',
                end: '10% top',
                scrub: 1,
                markers: false
            }
        })

        gsap.fromTo(bgText, {
            x: '100%'
        }, {
            x: '-30%',
            scrollTrigger: {
                trigger: '.carousel-showcase',
                scrub: 1,
                start: 'top top',
                end: 'bottom+=3000 top',
                markers: false

            }
        });

        var totProj = $('.cas-project').length,

            transVal = totProj * 250 - 250

        var mobileQuery = window.matchMedia('(max-width: 450px)'),
            tabletQuery = window.matchMedia('(min-width: 450px) and (max-width: 900px)');


        // Check if the media query is true
        if (mobileQuery.matches) {

            transVal = totProj * 80 - 80
        }

        if (tabletQuery.matches) {

            transVal = totProj * 200 - 200
        }


        gsap.to('.cas-titles-wrap', {
            y: -transVal,
            scrollTrigger: {
                trigger: '.carousel-showcase',
                scrub: 1,
                start: 'top top',
                end: 'bottom+=3000 top',
                markers: false

            }

        })


        gsap.set('.showcase-footer', {
            position: 'fixed'
        })


        let csw = gsap.fromTo(wrapper, {
                x: wrapFirstTrans
            }, {
                x: '-' + (wrapper.outerWidth() - $(window).outerWidth() + 350)

            }),
            windowWidth = $(window).outerWidth(),
            css = new ScrollTrigger({
                trigger: '.carousel-showcase',
                animation: csw,
                pin: true,
                scrub: 1,
                id: 'showcaseScroll',
                start: 'top top',
                end: 'bottom+=3000 top',
                markers: false,
                onUpdate: function (self, progress) {

                    let prog = $('.cas-progress span');

                    gsap.to(prog, {
                        width: self.progress * 100 + '%'
                    })

                    project.each(function () {

                        let $this = $(this)



                    })

                },

                onLeave: function () {


                    gsap.to('.showcase-footer', {


                        opacity: 0

                    })

                },
                onEnterBack: function () {

                    gsap.to('.showcase-footer', {


                        opacity: 1

                    })



                },

            });

        $('.cs-title').on('mouseenter', function () {

            let $this = $(this);

            $this.addClass('active')
        })

        $('.cs-title').on('mouseleave', function () {

            let $this = $(this);

            $this.removeClass('active')
        })



    }

    /* Showcase Carousel  */

    /* Showcase Slideshow  */
