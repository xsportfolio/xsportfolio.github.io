    function aLinkedText() {

        var linkedText = $('.linked-text');

        linkedText.each(function () {

            let $this = $(this),
                text = $this.find(">:first-child"),
                links = $this.find('a'),
                height = text.css('font-size'),
                finalHeight = parseInt(height, 10) + 24;

            new SplitText(text, {
                type: 'lines, words',
                linesClass: 'linked-line',
                wordsClass: 'linked-word'
            })



            gsap.set($this.find('.linked-line'), {
                height: finalHeight
            })

            gsap.set($this.children(), {
                lineHeight: finalHeight + 'px'
            })


            links.each(function () {

                let $this = $(this),
                    targetTitle = $this.data('target'),
                    bgDiv = $this.children('div');

                $this.append('<span class="link-target"><span>' + targetTitle + '</span></span>')


            });


            links.on('mouseenter', function () {

                let $this = $(this),
                    linkWords = $this.find('div'),
                    linkSpan = $this.find('.link-target');

                gsap.to(linkWords, {
                    y: '-110%',
                    ease: 'power2.inOut',

                });

                gsap.to(linkSpan, {
                    y: '-100%',
                    ease: 'power2.inOut',

                })

            })

            links.on('mouseleave', function () {

                let $this = $(this),
                    linkWords = $this.find('div'),
                    linkSpan = $this.find('.link-target');

                gsap.to(linkWords, {
                    y: '0%'
                });

                gsap.to(linkSpan, {
                    y: '0%'
                })

            })

            let lines = $this.find('.linked-lin'),
                words = $this.find('.linked-word');




            gsap.fromTo(words, {
                y: '100%'
            }, {
                y: '0%',
                ease: 'power2.Out',
                duration: 1,
                delay: .7,
                onComplete: function () {

                    $this.addClass('loaded')

                }

            })


            $(window).on('resize', function () {


                let text = $this.find(">:first-child"),
                    links = $this.find('a'),
                    height = text.css('font-size'),
                    finalHeight = parseInt(height, 10) + 24;


                gsap.set($this.find('.linked-line'), {
                    height: finalHeight
                })

                gsap.set($this.children(), {
                    lineHeight: finalHeight + 'px'
                })



            })



        });

    }

    /* Linked Text */


    /* Team Carousel */

