    function alitohNumberCt() {

        var aCount = $('.a-number-counter');

        aCount.each(function () {

            let $this = $(this),
                acNumber = $this.children('.ac-number'),
                sign = $this.children('.ac-sign'),
                acTitle = $this.children('.ac-title');

            acTitle.wrapInner('<span></span>')
            sign.wrapInner('<span></span>');

            let signSpan = sign.children('span');

            gsap.set(signSpan, {
                y: '100%',
                display: 'block'
            })



            acNumber.each(function () {
                let $this = $(this),
                    countParent = $this.parent(aCount);


                let numVal = $this.text(),
                    num1 = "<span class='num_val_anim'>" + (numVal - 3) + "</span>",
                    num2 = "<span class='num_val_anim'>" + (numVal - 2) + "</span>",
                    num3 = "<span class='num_val_anim'>" + (numVal - 1) + "</span>";

                $this.prepend(num1, num2, num3);

                $this.wrapInner("<div class='numbers-wrapper'></div>");

                var numWrapper = $this.children('.numbers-wrapper'),
                    parent = $this.parents(aCount),
                    delay = parent.data('delay'),
                    nums = $this.find('.num_val_anim');



                gsap.to(numWrapper, 1.5, {
                    y: "-75%",

                    delay: delay,
                    ease: "power2.inOut",
                    scrollTrigger: {
                        trigger: parent,
                        position: "bottom bottom"
                    },
                    onStart: function () {
                        countParent.addClass('count_inview')
                    },
                    onComplete: function () {

                        gsap.to(signSpan, {
                            y: '0%'
                        })


                        countParent.addClass('count_anim_end')

                    }
                })

            });

        })

    }

    /** Number Counter **/

    /** Single Image **/

