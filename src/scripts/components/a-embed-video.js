    function aEmbedVideo() {


        if ($('.a-embed-video').length > 0) {

            var aEmbedVideo = $('.a-embed-video');

            aEmbedVideo.each(function (i) {
                i++

                var $this = $(this),
                    playButon = $this.find('.play-button'),
                    embedVideo = $this.children('.embed-video'),
                    overlay = $this.children('.video-overlay'),
                    autoplayCheck = $this.data('autoplay'),
                    interactions = $this.data('interaction');

                if ((autoplayCheck == true) && (interactions == true)) {

                    $this.addClass('no-interaction');

                    let cVideo = new Plyr(embedVideo, {
                        controls: false,
                        autoplay: true,
                        autopause: false,
                        clickToPlay: false,
                        muted: true,
                        volume: 0,
                        quality: {
                            default: 1080
                        },
                        loop: {
                            active: true
                        },

                    });


                }

                if (autoplayCheck == true) {

                    let cVideo = new Plyr(embedVideo, {
                        controls: ["play-large",
                            "play",
                            "progress",
                            "duration",
                            "mute",
                            "volume",
                            "fullscreen"
                        ],
                        autoplay: true,
                        autopause: false,
                        clickToPlay: false,
                        muted: true,
                        volume: 0,
                        quality: {
                            default: 1080
                        },
                        loop: {
                            active: true
                        },

                    });


                    overlay.on('click', function () {

                        $this.addClass('video-play');
                        cVideo.restart();
                        cVideo.increaseVolume(1);

                    })


                } else {

                    let cVideo = new Plyr(embedVideo, {
                        controls: ["play-large",
                            "play",
                            "progress",
                            "duration",
                            "mute",
                            "volume",
                            "fullscreen"
                        ],
                        autoplay: false,
                        autopause: false,
                        clickToPlay: false,
                        muted: false,
                        quality: {
                            default: 1080
                        },

                    });

                    overlay.on('click', function () {

                        $this.addClass('video-play');
                        cVideo.play();

                    })

                };
            })

        };


    }

    /* Embed Video */



    /* Heading */

