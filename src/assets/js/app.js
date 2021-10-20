import $ from 'jquery';
import 'what-input';
import { gsap } from 'gsap/dist/gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

window.jQuery = $;

require('foundation-sites');

$(document).ready(function () {
    $(document).foundation();

    ///////// Smooth Browser Scroll ////////////
    function smoothMouse() {
        const target =
            document.documentElement ||
            document.body.parentNode ||
            document.body;
        const speed = 75;
        const smooth = 12;
        let moving = false;
        let pos = target.scrollTop;

        target.addEventListener("mousewheel", scroll, {
            passive: false
        });

        function scroll(e) {
            // disable default scrolling
            e.preventDefault();

            let delta;

            if (e.detail) {
                if (e.wheelDelta)
                    delta =
                        (e.wheelDelta / e.detail / 40) *
                        (e.detail > 0 ? 1 : -1);
                else delta = -e.detail / 3;
            } else {
                delta = e.wheelDelta / 120;
            }

            pos += -delta * speed;
            pos = Math.max(
                0,
                Math.min(pos, target.scrollHeight - target.clientHeight)
            );

            if (!moving) update();
        }

        function update() {
            moving = true;

            const delta = (pos - target.scrollTop) / smooth;

            target.scrollTop += delta;

            if (Math.abs(delta) > 0.5) window.requestAnimationFrame(update);
            else moving = false;
        }
    }

    const mouse = new smoothMouse();

    //////// Cursor Section ////////////

    const $stroke = document.querySelector('.cursor-stroke');
    const $ball = document.querySelector('.cursor-ball');
    const $hoverables = document.querySelectorAll('a');

    // Listeners
    document.body.addEventListener('mousemove', onMouseMove);
    for (let i = 0; i < $hoverables.length; i++) {
      $hoverables[i].addEventListener('mouseenter', onMouseHover);
      $hoverables[i].addEventListener('mouseleave', onMouseHoverOut);
    }

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

    // Copyright function
    function getCopyrightYear() {
        document.getElementById('year').innerHTML = new Date().getFullYear();
    }

    getCopyrightYear();
});
