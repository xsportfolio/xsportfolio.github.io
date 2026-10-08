

(function ($) {
    "use strict";

    console.clear();
    gsap.registerPlugin(DrawSVGPlugin, ScrollTrigger, CSSRulePlugin, ScrollToPlugin, MorphSVGPlugin, CustomEase, InertiaPlugin);
    gsap.config({ nullTargetWarn: false });
    
    
    var pageSet,
        pageCursor,
        siteLoader,
        headerStick,
        smoothScroll,
        siteHeader,
        locoScroll,
        pageLayout,
        headerLayout,
        footerLayout,
        menuLayout,
        menuStyle;

    /** Page Settings **/
    function pageSettings() {

        pageSet = $('body');
        pageCursor = pageSet.data('cursor');
        siteLoader = pageSet.data('page-loader');
        headerStick = pageSet.data('header-sticky');
        smoothScroll = pageSet.data('smoothScroll');
        menuStyle = pageSet.data('menu-style');
        pageLayout = pageSet.data('page-layout');
        headerLayout = pageSet.data('header-layout');
        menuLayout = pageSet.data('menu-layout');
        footerLayout = pageSet.data('footer-layout');

        pageSet.addClass(pageLayout)

        $('.site-footer').addClass(footerLayout);

    }
    pageSettings()
    /** Page Settings **/

    var keys = {
        37: 1,
        38: 1,
        39: 1,
        40: 1
    };

    function preventDefault(e) {
        e.preventDefault();
    }

    function preventDefaultForScrollKeys(e) {
        if (keys[e.keyCode]) {
            preventDefault(e);
            return false;
        }
    }

    // modern Chrome requires { passive: false } when adding event
    var supportsPassive = false;
    try {
        window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
            get: function () {
                supportsPassive = true;
            }
        }));
    } catch (e) {}

    var wheelOpt = supportsPassive ? {
        passive: false
    } : false;
    var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

    // call this to Disable
    function disableScroll() {
        window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
        window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
        window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
        window.addEventListener('keydown', preventDefaultForScrollKeys, false);
    }

    // call this to Enable
    function enableScroll() {
        window.removeEventListener('DOMMouseScroll', preventDefault, false);
        window.removeEventListener(wheelEvent, preventDefault, wheelOpt);
        window.removeEventListener('touchmove', preventDefault, wheelOpt);
        window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
    }


    /** Alioth Scroll **/
    //    function aScroll() {
    //
    //        if (smoothScroll == true) {
    //
    //            pageSet.wrapInner('<div class="smooth-scroll"></div>')
    //
    //            $('#mouseCursor').insertBefore('.smooth-scroll');
    //
    //
    //            ScrollTrigger.defaults({
    //                scroller: '.smooth-scroll'
    //            });
    //
    //            locoScroll = new LocomotiveScroll({
    //                el: document.querySelector(".smooth-scroll"),
    //                smooth: true,
    //
    //                // for tablet smooth
    //                tablet: {
    //                    smooth: true
    //                },
    //
    //                // for mobile
    //                smartphone: {
    //                    smooth: true
    //                }
    //            });
    //
    //            locoScroll.on("scroll", ScrollTrigger.update);
    //
    //            ScrollTrigger.scrollerProxy(".smooth-scroll", {
    //                scrollTop(value) {
    //                    return arguments.length ?
    //                        locoScroll.scrollTo(value, 0, 0) :
    //                        locoScroll.scroll.instance.scroll.y;
    //                },
    //                getBoundingClientRect() {
    //                    return {
    //                        top: 0,
    //                        left: 0,
    //                        width: window.innerWidth,
    //                        height: window.innerHeight
    //                    };
    //                },
    //                pinType: document.querySelector(".smooth-scroll").style.transform ?
    //                    "transform" :
    //                    "fixed"
    //
    //
    //            });
    //
    //
    //
    //            ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
    //
    //            ScrollTrigger.refresh();
    //
    //
    //
    //
    //        }
    //
    //
    //
    //    }

    /** Alioth Scroll **/

    var loader,
        loaderOv,
        loadAn;


