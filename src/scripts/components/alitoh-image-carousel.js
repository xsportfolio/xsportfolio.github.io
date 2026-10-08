    function alitohImageCarousel() {

        var imageCarousel = $('.a-image-carousel');

        imageCarousel.each(function (i) {

            i++

            let $this = $(this);
            var carouselContainer = $this.children('.swiper-container'),
                aImageCr = aImageCr + i;

            var aImageCr = new Swiper(carouselContainer, {
                slidesPerView: 2,

            });
        })

    }

    /** Image Carousel **/

    /* Page Nav */

