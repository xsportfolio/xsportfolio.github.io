    /**** Pages ****/

    /** Page Header **/

    function aPageHeader() {

        if ($('.page-header').length) {

            let pageHeader = $('.page-header'),
                title = pageHeader.find('.page-title'),
                willAnim = pageHeader.data('anim');

            if (willAnim == true) {


                var cako = new SplitText(title, {
                    type: 'chars, words',
                    charsClass: 'pt-char',
                    wordsClass: 'pt-word'

                });

                let chars = title.find('.pt-char');

                gsap.to(chars, {
                    y: '0%',
                    stagger: 0.035,
                    ease: 'power2.out',
                    duration: 1.2

                })


            }


        }



    }

    /** Page Header **/



    /** Blog **/

    function aBlog() {

        var blog = $('.a-blog'),
            post = blog.find('.post'),
            imagesWrap = blog.children('.post-images'),
            imagesImg,
            findImg;

        if (blog.hasClass('blog-list')) {


            post.each(function (i) {

                i++

                let $this = $(this),
                    image = $this.children('.post-image');

                $this.attr('data-post', 'post_' + i)

                imagesWrap.append(image);

                $this.on('mouseenter', function () {

                    let imageCheck = $this.data('post');

                    findImg = '.' + imageCheck;

                    gsap.fromTo(findImg, {
                        width: '0%'
                    }, {
                        width: "100%",

                    })


                })


                $this.on('mouseleave', function () {

                    let imageCheck = $this.data('post');

                    findImg = '.' + imageCheck;

                    gsap.fromTo(findImg, {
                        width: '100%'
                    }, {
                        width: "0%",

                    })


                })

            });

            imagesImg = imagesWrap.find('.post-image');

            blog.on('mousemove', function (e) {

                gsap.to(imagesWrap, {
                    left: e.pageX,
                    top: e.pageY - $(window).scrollTop(),
                    duration: .6
                })

            })


            imagesImg.each(function (i) {

                i++

                let $this = $(this),
                    img = $this.children('img'),
                    width = $this.outerWidth(),
                    height = $this.outerHeight();

                gsap.set(img, {
                    width: width,
                    height: height
                })

                gsap.set($this, {
                    width: 0
                })

                $this.addClass('post_' + i)


            })

        }


    }


    /** Blog **/

    /** Project Page **/
    function aProjectPage() {

        let projectHeader = $('.project-page-header'),
            projectImage = $('.project-featured-image'),
            projectImg = projectImage.children('img'),
            animate = projectHeader.data('animate'),
            title = projectHeader.find('.project-title'),
            cat = projectHeader.find('.project-cat'),
            other = projectHeader.find('.project-other h5'),
            summary = projectHeader.find('.meta-summary h5'),
            video = projectHeader.find('.project-featured-video'),
            nextVideo = $('.next-project-video');

        if (video.length) {

            let pphEmbed = video.children('.pph-video')

            const pphVid = new Plyr(pphEmbed, {
                controls: false,
                autoplay: true,
                clickToPlay: false,
                muted: true,
                autopause: false,
                volume: 0,
                loop: {
                    active: true
                },
                quality: {
                    default: 1080
                }

            });

        }

        if (nextVideo.length) {

            const npVid = new Plyr(nextVideo, {
                controls: false,
                autoplay: true,
                clickToPlay: false,
                muted: true,
                autopause: false,
                volume: 0,
                loop: {
                    active: true
                },
                quality: {
                    default: 1080
                }

            });

        }

        if (animate == true) {

            let titleText = $('.project-title h1');

            new SplitText(titleText, {
                type: 'chars, lines',
                charsClass: 'tt-char',
                linesClass: 'tt-line'
            })

            new SplitText(cat, {
                type: 'chars',
                charsClass: 'cat-char'
            })

            new SplitText(summary, {
                type: 'lines',
                linesClass: 'summ_line'
            })


            $('.tit_word, .project-other h5, .summ_line, .project-cat').wrapInner("<span></span>");

            if (projectHeader.hasClass('style_1')) {

                let pphAnim = gsap.timeline();

                pphAnim.to('.tt-char', 1.5, {
                    y: '0%',
                    stagger: 0.02,
                    ease: 'power3.out'
                }, 0)

                pphAnim.to('.cat-char', 1, {
                    y: '0%',
                    stagger: 0.02,
                    ease: 'power3.out'
                }, .5)

                pphAnim.to('.summ_line span', 1.5, {
                    y: '0%',
                    stagger: 0.1,
                    ease: 'power2.out'
                }, .5)

                pphAnim.to('.project-other span', 1.5, {
                    y: '0%',
                    stagger: 0.1,
                    ease: 'power2.out'
                }, .7)




            } else if (projectHeader.hasClass('style_3')) {

                let pphAnim = gsap.timeline();

                pphAnim.to('.tt-char', 1.5, {
                    y: '0%',
                    stagger: 0.02,
                    ease: 'power3.out'
                }, 0)

                pphAnim.to('.cat-char', .75, {
                    y: '0%',
                    stagger: 0.02,
                    ease: 'power3.out'
                }, .5)

                pphAnim.to('.summ_line span', 1.5, {
                    y: '0%',
                    stagger: 0.1,
                    ease: 'power2.out'
                }, .7)

                pphAnim.to('.project-other span', 1.5, {
                    y: '0%',
                    stagger: 0.1,
                    ease: 'power2.out'
                }, .5)

            } else if (projectHeader.hasClass('style_2')) {

                let pphAnim = gsap.timeline();

                pphAnim.to('.tt-char', 1.5, {
                    y: '0%',
                    stagger: 0.02,
                    ease: 'power3.out'
                }, 0)

                pphAnim.to('.cat-char', 1, {
                    y: '0%',
                    stagger: 0.02,
                    ease: 'power3.out'
                }, .5)

                gsap.to('.summ_line span', 1.5, {
                    y: '0%',
                    stagger: 0.1,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: '.meta-summary'
                    }
                })

                gsap.to('.project-other span', 1.5, {
                    y: '0%',
                    stagger: 0.1,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: '.project-other'
                    }
                })




            }
        }

    }
    /** Project Page **/

    /** Works **/


    function aWorks() {

        var works = $('.a-works'),
            willAnimate = works.data('animate'),
            categories = works.find('.aw-categories'),
            catFilter = categories.find('li'),
            worksWrap = works.children('.aw-works-wrapper'),
            project = worksWrap.find('.aw-project'),
            worksScroll;

        catFilter.first().addClass('active')

        project.each(function (i) {

            i++

            let $this = $(this),
                category = $this.data('category');
            $this.addClass('cat_' + category)
            $this.wrapInner('<div class="aw-project-wrap"></div>')

        });

        // init Masonry
        var $grid = $('.aw-works-wrapper').masonry({
            itemSelector: '.aw-project',
            percentPosition: false,
            columnWidth: '.aw-works-sizer',
            initLayout: false,
            gutter: ".aw-works-gutter",
            stamp: ".aw-works-stamp",
            transitionDuration: 0
        });
        // layout Masonry after each image loads
        $grid.imagesLoaded().progress(function () {
            $grid.masonry();


        });

        $grid.masonry('once', 'layoutComplete', function () {

            project.each(function () {

                let $this = $(this),
                    width = $this.outerWidth(),
                    awpWrap = $this.find('.aw-project-wrap'),
                    awpA = $this.children('a'),
                    awpImage = awpWrap.find('.aw-project-image');

                gsap.set(awpWrap, {
                    width: width
                })

                gsap.set(awpA, {
                    width: width
                })


                gsap.set(awpImage, {
                    width: width
                })


                if (willAnimate == true) {

                    var worksScroll = ScrollTrigger.create({
                        trigger: $this,
                        start: 'top 75%',
                        onEnter: function () {
                            $this.addClass('is_inview')
                        },

                    })

                };




            })

        })


        catFilter.on('click', function () {
            let $this = $(this),
                cat = $this.data('cat'),
                projectsFind = '.cat_' + cat;
        
            if (!$this.hasClass('active')) {
                catFilter.removeClass('active')
                $this.addClass('active')
        
                if (cat !== 'all') {
                    let filterAnim = gsap.timeline();
                    project.removeClass('is_inview');
        
                    filterAnim.to('.aw-project-wrap', {
                        width: '0%',
                        delay: .4,
                        onComplete: function () {
                            project.hide();
                            
                            // Modified part to handle multiple categories
                            project.each(function() {
                                let $project = $(this),
                                    categories = $project.data('category').split(' ');
                                
                                if(categories.includes(cat)) {
                                    $project.show();
                                }
                            });
        
                            $grid.masonry('destroy');
                            $grid.masonry({
                                columnWidth: '.aw-works-sizer',
                                gutter: ".aw-works-gutter",
                                stamp: ".aw-works-stamp",
                            });
                        }
                    });
        
                    filterAnim.to('.aw-project-wrap', {
                        width: '100%',
                        delay: .2,
                        onComplete: function () {
                            $('.aw-project').addClass('is_inview')
                        }
                    })
        
                } else if (cat === 'all') {
                    let filterAnim = gsap.timeline();
                    project.removeClass('is_inview');
        
                    filterAnim.to('.aw-project-wrap', {
                        width: '0%',
                        delay: .4,
                        onComplete: function () {
                            project.show();
                            $grid.masonry('destroy');
                            $grid.masonry({
                                columnWidth: '.aw-works-sizer',
                                gutter: ".aw-works-gutter",
                                stamp: ".aw-works-stamp",
                            });
                        }
                    });
        
                    filterAnim.to('.aw-project-wrap', {
                        width: '100%',
                        delay: .2,
                        onComplete: function () {
                            $('.aw-project').addClass('is_inview')
                        }
                    })
                }
            }
        });







    }


    /** Works **/

    /** Shopping Cart **/

    function aShoppingCart() {

        if ($('.cart-page').length) {

            let productQuant = $('.cpq-number'),
                decrase = productQuant.children('.cpq-reduce'),
                increase = productQuant.children('.cpq-increase'),
                totQuant = productQuant.children('.cpq-num');

            var clicks = 0;



            increase.on('click', function () {

                clicks++

                totQuant.text(clicks)

            })

            decrase.on('click', function () {

                clicks--

                totQuant.text(clicks)

            })


        }


    }

    /** Shopping Cart **/


    /** Shop **/

    function aShop() {

        // external js: masonry.pkgd.js, imagesloaded.pkgd.js

        // init Masonry
        var $grid = $('.a-products-wrapper').masonry({
            itemSelector: '.product',
            percentPosition: true,
            columnWidth: '.grid-sizer',
            gutter: '.gutter',
            transitionDuration: '0.8s',
            stagger: 30
        });
        // layout Masonry after each image loads
        $grid.imagesLoaded().progress(function () {
            $grid.masonry();
        });

        var product = $('.product'),
            productCats = $('.product-cats a');

        product.each(function (i) {

            let $this = $(this),
                cat = $this.data('category');

            $this.addClass('cat_' + cat);

            $this.append('<div class="product-acts"><a href="#addtocart">Add To Cart</a></div>');

            ScrollTrigger.create({
                trigger: $this,
                start: 'top 75%',
                onEnter: function () {
                    $this.addClass('is_inview')
                }
            })

        });

    }


    /** Shop **/

    /** Products Carousel **/

    function aProductsCarousel() {

        var apCarousel = $('.a-products-carousel');

        apCarousel.each(function () {

            let $this = $(this),
                apWrapper = $this.find('.apc-product-wrapper'),
                cats = $this.find('.apc-cats ul'),
                cat = cats.find('li'),
                products = $this.find('.apc-product'),
                willAnim = $this.data('anim'),
                pressedTop;

            products.append('<span class="product-ov"></span>')


            InertiaPlugin.track(apWrapper, "x");

            var apcDrag = Draggable.create(apWrapper, {
                type: "x",
                bounds: $this,
                autoScroll: true,
                inertia: true,
                edgeResistance: 0.75,
                dragResistance: 0.4,
                throwProps: true,


            });

            if (willAnim == true) {

                gsap.fromTo(apWrapper, {
                    x: -5100
                }, {
                    x: '0%',
                    duration: 2,
                    ease: 'power2.inOut',
                    scrollTrigger: {
                        trigger: $this,
                    }
                })

                gsap.fromTo(cat, {
                    y: '100%'
                }, {
                    y: '0%',
                    stagger: 0.2,
                    delay: 1.5,
                    duration: .8,
                    ease: 'power1.out',
                    scrollTrigger: {
                        trigger: $this,
                    }
                })
            }

            cat.on('click', function () {

                let $this = $(this),
                    dataCat = '.cat_' + $this.data('category'),
                    filterAn = gsap.timeline();

                cat.removeClass('active');
                $this.addClass('active');

                filterAn.fromTo('.product-ov', {
                    width: '0%'
                }, {
                    width: '100%',
                    ease: 'power2.inOut',
                    onProgress: function () {

                        cats.addClass('locked')


                    },
                    onStart: function () {
                        gsap.set('.product-ov', {
                            right: 0,
                            left: 'unset'
                        })
                    },
                    onComplete: function () {

                        products.addClass('hide');
                        $(dataCat).removeClass('hide');

                        let draggable = Draggable.get(apWrapper); //or use the element itself instead of a s
                        draggable.update(true);

                    }
                })

                filterAn.fromTo('.product-ov', {
                    width: '100%'
                }, {
                    width: '0%',
                    delay: 0,
                    ease: 'power2.inOut',
                    onStart: function () {
                        gsap.set('.product-ov', {
                            left: 0,
                            right: 'unset'
                        })
                    },
                    onComplete: function () {
                        cats.removeClass('locked')

                    }

                })

            })


        })




    }

    /** Products Carousel **/

    /** Awards **/

    function aAwards() {

        var awards = $('.a-awards')
        awards.each(function () {

            let $this = $(this),
                award = $this.find('.a-award'),
                willAnim = $this.data('anim');

            if (willAnim == true) {

                award.each(function () {


                    let $this = $(this),
                        title = $this.find('.award-title'),
                        loc = $this.find('.award-loc'),
                        date = $this.find('.award-date');

                    title.wrapInner('<span></span>')
                    loc.wrapInner('<span></span>')
                    date.wrapInner('<span></span>')

                    let spans = $this.find('span');

                    gsap.fromTo(spans, {
                        y: '100%'
                    }, {
                        y: '0%',
                        duration: .75,
                        stagger: 0.1,
                        ease: 'power2.Out',
                        scrollTrigger: {
                            trigger: $this,
                            onEnter: function () {
                                $this.addClass('is_inview')
                            },

                        }
                    })

                })
            }

        });

    };

    /** Awards **/


    /** Single Product Page **/


    function aSingleProduct() {

        if ($('.product-page').length) {


            let firstImage = $('.sp-image:first-child > img'),
                firstHeight = firstImage.outerHeight(),
                slider = $('.sp-slider');

            gsap.set(slider, {
                height: firstHeight
            })



            var productSlider = new Swiper('.sp-slider', {
                slidesPerView: 1,
                navigation: {
                    prevEl: '.sp-next',
                    nextEl: '.sp-prev',
                },
                pagination: {
                    el: '.sp-dots',
                    type: 'bullets',
                    clickable: true,
                    renderBullet: function (index, className) {
                        return '<span class="' + className + '">' + (index + 1) + '</span>';
                    }
                },
                direction: 'vertical'

            });

            let shareToggle = $('.share-toggle'),
                metas = $('.single-product-meta'),
                metaButtons = metas.find('a');

            shareToggle.on('click', function () {


                let shareLi = $('.share-buttons li');

                gsap.to(shareLi, {
                    x: 0,
                    opacity: 1,
                    visibility: 'visible',
                    stagger: .1,
                    duration: .4
                })

            })

            metaButtons.on('click', function () {

                let $this = $(this),
                    parent = $this.parent('li'),
                    desc = parent.children('.desc'),
                    close = parent.children('.desc-close')

                $('.single-product-mets a').removeClass('active')
                $this.addClass('active')

                gsap.set('.desc', {
                    display: 'none'
                })
                gsap.set(desc, {
                    display: 'block'
                })


            })

            $('.desc-close').on('click', function () {
                $('.single-product-mets a').removeClass('active');
                gsap.set('.desc', {
                    display: 'none'
                })

            })

        }


    }
    /** Single Product Page **/

    /**** Pages ****/

