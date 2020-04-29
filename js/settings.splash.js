/*****************************************************************
******           SPLASH PAGE JAVASCRIPT SETTINGS            ******
******                                                      ******
******   Name :         settings.splash.js                  ******
******   Version :      1.0.0                               ******
******   Authors :      Corentin Kouvtanovitch              ******
******                  Vincent Garreau                     ******
******                                                      ******
******                   Table of Content                   ******
******                   ----------------                   ******
******  - Loaders       Animated Content                    ******
******  - Particles     Dark Particles Effect               ******
******  - Particles     Light Particles Effect              ******
*****************************************************************/

/*****************************************************************
******              LOADERS : ANIMATED CONTENT              ******
*****************************************************************/

/* Setting load function for animated content settings to make the splash page alive */
(function($) {	
    $(window).load(function() {
        "use strict";		
/* Setting load function for animated text */
        $(".flexslider, .flexslider-quotes").flexslider({
            animation: "fade",
            controlNav: false,
            directionNav: false,
            slideshowSpeed: 3800,
            animationSpeed: 1000
        });
        $(".flexslider-the-sea, .flexslider-time").flexslider({
            animation: "fade",
            controlNav: false,
            directionNav: false,
            slideshowSpeed: 4800,
            animationSpeed: 1000
        });		
/* Setting load function for animated screen loader */
        $('.screen-loader').fadeOut('slow');	
    });
/* Setting ready function to make all animated content displayed */
    $(document).ready(function() {
        "use strict";		
        $('#preload').css({
            display: 'table'
        });
/* Setting loader and borders appear with fade effect */
        setTimeout(function() {
            $('#preload').delay(250).fadeOut(1400);
            $('.borders-left, .borders-right').delay(1400).css({
                display: 'none'
            }).fadeIn(2400);
        });
    });
/* Setting mobile browser detection by device */
    var isMobile = {
        Android: function() {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function() {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function() {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function() {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    };
})(jQuery);

/*****************************************************************
******          PARTICLES : DARK PARTICLES EFFECT           ******
******             Author name : Vincent Garreau            ******
*****************************************************************/

/* Setting particles values and density on screen */
particlesJS('particles-js-dark', {
    "particles": {
        "number": {
            "value": 80,
            "density": {
                "enable": true,
                "value_area": 800
            }
        },
/* Setting particles shape : Can choose "circle", "edge", "triangle", "polygon", "star", "image" */
        "color": {
            "value": "#ffffff"
        },
        "shape": {
            "type": "edge",
            "stroke": {
                "width": 0,
                "color": "#000000"
            },
            "polygon": {
                "nb_sides": 5
            },
            "image": {
                "src": "img/github.svg",
                "width": 100,
                "height": 100
            }
        },
/* Setting up polygons opacity */
        "opacity": {
            "value": 0.5,
            "random": false,
            "anim": {
                "enable": false,
                "speed": 1,
                "opacity_min": 0.1,
                "sync": false
            }
        },
/* Setting up polygons size */
        "size": {
            "value": 5,
            "random": true,
            "anim": {
                "enable": false,
                "speed": 40,
                "size_min": 0.1,
                "sync": false
            }
        },
/* Setting up polygons' links display elements and color */
        "line_linked": {
            "enable": true,
            "distance": 150,
            "color": "#ffffff",
            "opacity": 0.4,
            "width": 1
        },
/* Setting up polygons and links moves */
        "move": {
            "enable": true,
            "speed": 6,
            "direction": "none",
            "random": false,
            "straight": false,
            "out_mode": "out",
            "attract": {
                "enable": false,
                "rotateX": 600,
                "rotateY": 1200
            }
        }
    },
/* Setting up polygons and links moves */
    "interactivity": {
        "detect_on": "canvas",
/* Setting up interactivity when particles on first plan */
        "events": {
            "onhover": {
                "enable": true,
                "mode": "repulse"
            },
            "onclick": {
                "enable": true,
                "mode": "push"
            },
            "resize": true
        },
/* Settings for the different animated display modes */
        "modes": {
            "grab": {
                "distance": 400,
                "line_linked": {
                    "opacity": 1
                }
            },
            "bubble": {
                "distance": 400,
                "size": 40,
                "duration": 2,
                "opacity": 8,
                "speed": 3
            },
            "repulse": {
                "distance": 200
            },
            "push": {
                "particles_nb": 4
            },
            "remove": {
                "particles_nb": 2
            }
        }
    },
    "retina_detect": true
});

/*****************************************************************
******          PARTICLES : LIGHT PARTICLES EFFECT          ******
******             Author name : Vincent Garreau            ******
*****************************************************************/

/* Setting particles values and density on screen */
particlesJS('particles-js-light', {
    "particles": {
        "number": {
            "value": 80,
            "density": {
                "enable": true,
                "value_area": 800
            }
        },
/* Setting particles colors and shape */
        "color": {
            "value": "#000000"
        },
/* Setting particles shape : Can choose "circle", "edge", "triangle", "polygon", "star", "image" */
        "shape": {
            "type": "edge",
            "stroke": {
                "width": 0,
                "color": "#000000"
            },
            "polygon": {
                "nb_sides": 5
            },
            "image": {
                "src": "img/github.svg",
                "width": 100,
                "height": 100
            }
        },
/* Setting up polygons opacity */
        "opacity": {
            "value": 0.5,
            "random": false,
            "anim": {
                "enable": false,
                "speed": 1,
                "opacity_min": 0.1,
                "sync": false
            }
        },
/* Setting up polygons size */
        "size": {
            "value": 5,
            "random": true,
            "anim": {
                "enable": false,
                "speed": 40,
                "size_min": 0.1,
                "sync": false
            }
        },
/* Setting up polygons' links display elements and color */
        "line_linked": {
            "enable": true,
            "distance": 150,
            "color": "#000000",
            "opacity": 0.4,
            "width": 1
        },
/* Setting up polygons and links moves */
        "move": {
            "enable": true,
            "speed": 6,
            "direction": "none",
            "random": false,
            "straight": false,
            "out_mode": "out",
            "attract": {
                "enable": false,
                "rotateX": 600,
                "rotateY": 1200
            }
        }
    },
/* Setting up polygons and links moves */
    "interactivity": {
        "detect_on": "canvas",
/* Setting up interactivity when particles on first plan */
        "events": {
            "onhover": {
                "enable": true,
                "mode": "repulse"
            },
            "onclick": {
                "enable": true,
                "mode": "push"
            },
            "resize": true
        },
/* Settings for the different animated display modes */
        "modes": {
            "grab": {
                "distance": 400,
                "line_linked": {
                    "opacity": 1
                }
            },
            "bubble": {
                "distance": 400,
                "size": 40,
                "duration": 2,
                "opacity": 8,
                "speed": 3
            },
            "repulse": {
                "distance": 200
            },
            "push": {
                "particles_nb": 4
            },
            "remove": {
                "particles_nb": 2
            }
        }
    },
    "retina_detect": true
});