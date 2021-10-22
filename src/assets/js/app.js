import $ from 'jquery';
import 'what-input';
import { gsap } from 'gsap/dist/gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

window.jQuery = $;

require('foundation-sites');

$(document).ready(function () {
    $(document).foundation();

    $('.nav-link.info').on('click', function(e) {
        e.preventDefault();
        $(this).toggleClass('active');
    });

    ///////// Smooth Browser Scroll ////////////

    function initSmoothScroll() {
        new SmoothScroll(document, 120, 12)
    }

    function SmoothScroll(target, speed, smooth) {
        if (target === document)
            target = (document.scrollingElement ||
                document.documentElement ||
                document.body.parentNode ||
                document.body) // cross browser support for document scrolling

        var moving = false
        var pos = target.scrollTop
        var frame = target === document.body &&
            document.documentElement ?
            document.documentElement :
            target // safari is the new IE

        target.addEventListener('mousewheel', scrolled, {
            passive: false
        })
        target.addEventListener('DOMMouseScroll', scrolled, {
            passive: false
        })

        $('.btt-link').on('click', function(e) {
            e.preventDefault();
            $('html, body').animate({
                scrollTop: $('#home').offset().top
            }, 1000, function() {
                pos = 0;
                if (!moving) update()
            });
        });

        function scrolled(e) {
            e.preventDefault(); // disable default scrolling

            var delta = normalizeWheelDelta(e)

            pos += -delta * speed
            pos = Math.max(0, Math.min(pos, target.scrollHeight - frame.clientHeight)) // limit scrolling

            if (!moving) update()
        }

        function normalizeWheelDelta(e) {
            if (e.detail) {
                if (e.wheelDelta)
                    return e.wheelDelta / e.detail / 40 * (e.detail > 0 ? 1 : -1) // Opera
                else
                    return -e.detail / 3 // Firefox
            } else
                return e.wheelDelta / 120 // IE,Safari,Chrome
        }

        function update() {
            moving = true

            var delta = (pos - target.scrollTop) / smooth

            target.scrollTop += delta

            if (Math.abs(delta) > 0.5)
                requestFrame(update)
            else
                moving = false
        }

        var requestFrame = function() { // requestAnimationFrame cross browser
            return (
                window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                window.oRequestAnimationFrame ||
                window.msRequestAnimationFrame ||
                function(func) {
                    window.setTimeout(func, 1000 / 50);
                }
            );
        }()
    }

    initSmoothScroll();

    //////// Cursor Section ////////////
    const $stroke = $('.cursor-stroke');
    const $ball = $('.cursor-ball');
    const $hoverables = $('a');

    // Listeners
    $('body').on('mousemove', onMouseMove);

    $hoverables.on('mouseenter', onMouseHover);
    $hoverables.on('mouseleave', onMouseHoverOut);

    // Move the cursor
    function onMouseMove(e) {
        gsap.to($stroke, {
            duration: 0.4,
            x: e.clientX - 25,
            y: e.clientY - 26
        });
        gsap.to($ball, {
            duration: 0.1,
            x: e.clientX - 5,
            y: e.clientY - 12
        });
    }

    // Hover an element
    function onMouseHover() {
        gsap.to($stroke, {
            duration: 0.3,
            scale: 2.5
        });
        gsap.to($ball, {
            duration: 0.3,
            opacity: 0
        });
    }

    function onMouseHoverOut() {
        gsap.to($stroke, {
            duration: 0.3,
            scale: 1
        });
        gsap.to($ball, {
            duration: 0.3,
            opacity: 1
        });
    }

    // GSAP
    gsap.registerPlugin(ScrollTrigger);

    gsap.to('.text-frontend', {
        scrollTrigger: {
            trigger: '.home-landing',
            start: 'center center',
            scrub: .5,
        },
        xPercent: 25
    });

    gsap.to('.text-developer', {
        scrollTrigger: {
            trigger: '.home-landing',
            start: 'center center',
            scrub: .5,
        },
        xPercent: -25
    });

    gsap.to('.spinny-boy', {
        scrollTrigger: {
            trigger: '.spinny-boy',
            start: 'top bottom',
            scrub: .5,
        },
        rotate: 360
    });

    if (Foundation.MediaQuery.is('medium up')) {
        gsap.to('.info-parallax-text', {
            scrollTrigger: {
                trigger: '.home-info',
                start: 'top center',
                scrub: .5,
            },
            yPercent: -50
        });
    }

    // Set Copyright Year
    function setCopyright() {
        $('#year').html(new Date().getFullYear());
    }

    setCopyright();
});
