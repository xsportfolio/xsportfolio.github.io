    function aPageNav() {

        $('.a-page-nav').each(function () {

            let $this = $(this),
                title = $this.find('.page-title'),
                text = title.text();

            title.append('&nbsp;' + text + '&nbsp;')
            title.append('&nbsp;' + text + '&nbsp;')

            title.marquee({
                duplicated: true,
                duration: 8000,
                delayBeforeStart: 0,
                direction: 'left',
            });




        })

    }



    /* Page Nav */

