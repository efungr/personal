import $ from 'jquery';
import 'what-input';
import { gsap } from 'gsap/dist/gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

window.jQuery = $;

require('foundation-sites');

function isMobileTablet() {
    var check = false;

    (function(a) {
        if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4)))
            check = true;
    })(navigator.userAgent || navigator.vendor || window.opera);

    return check;
}

// Set Copyright Year
function setCopyright() {
    $('#year').html(new Date().getFullYear());
}

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

function animationCallback($element, callback) {
    $element.bind('oanimationend animationend webkitAnimationEnd', function() {
        callback();
    });
}

$(window).on('load', function () {
    var loadingBar = $('#loader .bar');
    var loader = $('#loader');
    var loadingSlide = gsap.to('.loading-screen', {
        duration: 0.8,
        height: 0,
        paused: true,
        onComplete() {
            $('html').removeClass('loading');
            $('#loader').hide();
        }
    });
    var loadingFinished = function() {
        loadingSlide.play();
    };

    loadingBar.css({'animation-name': 'progress-bar'});
    animationCallback(loadingBar, loadingFinished);
});

$(document).ready(function () {
    $(document).foundation();

    initSmoothScroll();
    setCopyright();

    var isMobile = isMobileTablet();

    $('.nav-link.info').on('click', function(e) {
        e.preventDefault();
        $(this).toggleClass('active');
    });

    if(!isMobile) {
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

        $('.cursor').removeClass('hide');
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
});
