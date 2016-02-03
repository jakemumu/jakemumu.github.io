// IMPORTANT NOTE: This is an AJAX powered web template. So improper editing of even a single line of code will break this website from loading properly. AJAX will work only on a localhost or web server. We recommend you to use a localhost to perform editing of this template. We prefer FireFox as development browser.


/*global $:false */
/*global window: false */

(function(){
  "use strict";


$(function ($) {
  

preloaderInit();
initCalc();
initUX();
initNav();
initMasonry();
initLightbox();
initMobileNav();
initParallax();
initBackstretch();
initBGVimeo();
initOwlCarousel();
initElements();
initMap();
initContactForm();


$('a.ajax-link').on('click', function() {
    $('#ajax-content').animate({
        opacity: 0
    }, 0, function() {
        // Animation complete.
        //Shows Preloader
        showPreloader();
    });

    var link = $(this).attr('href');
    $.ajax({
        type: 'POST',
        url: $(this).attr('href'),
        processData: true,
        dataType: 'html',
        success: function(data) {
            //Ttile Change
            document.title = $(data).filter('title').text();

            //Hash change
            if (typeof history.pushState != 'undefined') history.pushState(data, 'Page', link);
            var content_to_display = "#ajax-content";
            var content_container = "#ajax-content";
            //here both are same


            var delay = 0;
            setTimeout(function() {

                $('#ajax-content').css('opacity', '0');
                $('body').addClass('preloader-running');
                $('#status, #preloader').show(1000);

                setTimeout(function() {
                    $('body').waitForImages({
                        finished: function() {

                            // loading ajax content
                            $(content_container).html($(data).find(content_to_display).html());
                            openPage();
                        },
                        waitForAll: true
                    });

                }, 1100);

            }, delay);



        }
    });

    return false;
});



function backLoading() {  
    //this enables users go back to previous page
    $(window).on("popstate", function () {
        $('body').fadeOut('slow',function(){
            location.reload();
        });
        $('body').fadeIn();
    });
}    

function preloaderInit() {
    showPreloader();
    // makes sure the whole site is loaded
    $(window).load(function() {
        // will first fade out the loading animation
        hidePreloader();
    });
}

function showPreloader() {
    $('#ajax-content').css('opacity', '0');
    $('.sub-nav-wrap').hide();
    $('body').addClass('preloader-running');
}

function hidePreloader() {
    $("#status").fadeOut();
    // will fade out the whole DIV that covers the website.
    $("#preloader").delay(1000).fadeOut(1000);
    $('body').removeClass('preloader-running');
    $('body').addClass('preloader-done');
    $("#ajax-content").delay(1000).css('opacity', '1');
}

function openPage() {
    setTimeout(function() {
        hidePreloader();
    }, 1000);
    //re-initializing all the scripts again
    initCalc();
    initUX();
    initNav();
    initMasonry();
    initLightbox();
    initMobileNav();
    initParallax();
    initBackstretch();
    initBGVimeo();
    initOwlCarousel();
    initElements();
    initMap();
    initContactForm();
    backLoading(); //this function should be called only after first page load
}
// openPage: ends


function initCalc() {
        $(document).ready(function() {
            //Detecting viewpot dimension
            var vH = $(window).height();
            var vW = $(window).width();
            //Adjusting Intro Components Spacing based on detected screen resolution
            $('.fullwidth').css('width', vW);
            $('.fullheight').css('height', vH);
            $('.halfwidth').css('width', vW / 2);
            $('.halfheight').css('height', vH / 2);
            $('.works-container').css('min-height', vH);
        });
        // ready: ends
}
// initCalc: ends




function initUX() {
        $(document).ready(function() {

           
            
            $("html,body").animate({scrollTop: 0}, 1000);
             //Displaying UI elements according to the availability of ajax loaded components
            $('.works-filter-trigger').fadeOut();
            if ( $( "#works-filter-panel" ).length ) {
                      $('.works-filter-trigger').fadeIn(); //shows filter button only if filters are present
                    }
            $('.fullscreen-toggle').fadeIn();
            if ( $( ".works-masonry-container" ).length ) {
                      $('.fullscreen-toggle').fadeOut(); //shows fullscreen button only if masonry portfolio is present
                    }

            $('.works-filter-panel').slideUp();
            $('.works-filter-panel').removeClass('is-visible');


            //MISC ACTIONS
            $('.fullscreen-toggle').on('click', function() {
                $('.masthead').fadeOut();
                $('.sticky-sidebar').fadeOut();
                $('.mastwrap').removeClass('spaced-left');
                $('.onscreen-trigger').fadeIn();
            });

            $('.onscreen-trigger').on('click', function() {
                $(this).fadeOut();
                $('.mastwrap').addClass('spaced-left');
                $('.masthead').fadeIn();
                $('.sticky-sidebar').fadeIn();

            });

            //Featured Side Panel View
            $('.cd-btn').on('click', function(event) {
                event.preventDefault();
                $('.featured-mask-overlay').fadeIn();
                $('html, body').addClass('no-scroll-xy');
                $('.cd-panel').addClass('is-visible');
            });
            //close the lateral panel
            $('.cd-panel').on('click', function(event) {
                if ($(event.target).is('.cd-panel') || $(event.target).is('.cd-panel-close')) {
                    $('.cd-panel').removeClass('is-visible');
                    event.preventDefault();
                }
                $('.featured-mask-overlay').fadeOut('slow');
                $('html, body').removeClass('no-scroll-xy');
            });
             //close the lateral panel on featured-item link click
            $('.featured-item-block a').on('click', function(event) {
                event.preventDefault();
                $('.cd-panel').removeClass('is-visible');
                $('.featured-mask-overlay').fadeOut('slow');
                $('html, body').removeClass('no-scroll-xy');
            });


            //Share Panel View
            $('.share-panel-trigger').on('click', function(event) {
                event.preventDefault();
                if ($(this).hasClass('show')) {
                    $(".share-panel").animate({
                        right: "0"
                    }, 700, function() {
                        // Animation complete.
                    });
                } else {
                    $(".share-panel").animate({
                        right: "-400"
                    }, 700, function() {
                        // Animation complete.
                    });
                }
            });

            $('.share-panel-close').on('click', function(event) {
                event.preventDefault();
                $(".share-panel").animate({
                    right: "-400"
                }, 2500, function() {
                    // Animation complete.
                });
            });


            //Works Filter Panel View
            $('.works-filter-trigger').on('click', function(event) {
                event.preventDefault();
                $('.works-filter-panel').slideDown();
                $('.works-filter-panel').addClass('is-visible');
            });
        });
        // ready: ends
}
// initUX: ends


function initNav() {
        $(document).ready(function() {
             //Navigation Sub Menu Triggering on hover and/or click
            $('.sub-nav-wrap').fadeOut();
            $('.trigger-sub-nav a').bind("mouseenter click", function() {
                $('.sub-nav-wrap').show();
                $('.sub-nav').hide();
                $('.trigger-sub-nav a').removeClass('current-main-nav');
                $(this).addClass('current-main-nav');
                $('.sub-nav-wrap').show();
                var subnavIndex = $(this).attr('data-sub-nav-target');
                $('.sub-nav-' + subnavIndex).show();
            });


            //hiding sub menu on mouse enters the main navigation without a sub-nav for it
            $('.mastnav li').not(".trigger-sub-nav").find('a').on('mouseenter', function() {
                $('.trigger-sub-nav a').removeClass('current-main-nav');
                $('.sub-nav-wrap').fadeOut('slow');
            });

        });
        // ready: ends
}
// initNav: ends


function initMasonry() {
        $(document).ready(function() {
            //ISOTOPE INIT
                    var $container1 = $('.works-container');
                    $container1.isotope({
                            // options
                            itemSelector: '.works-item',
                            layoutMode: 'masonry',
                            transitionDuration: '0.8s'
                     });
                        //forcing a perfect masonry layout after initial load
                        setTimeout(function() {
                        $container1.isotope('layout');
                        }, 100);
                        $container1.isotope('bindResize');
                        //Isotope ReLayout on Page Load event.
                        $(window).load(function() {
                            $container1.isotope('layout');
                        });
                        //Isotope ReLayout on Window Resize event.
                        $(window).on('resize', function() {
                            $container1.isotope('layout');
                        });
                        //Isotope ReLayout on device orientation changes
                        window.addEventListener("orientationchange", function() {
                            $container1.isotope('layout');
                        }, false);

            $('.works-filter li a').on('click', function(event) {
                event.preventDefault();
                $('.works-filter li a').removeClass('active');
                $(this).addClass('active');
                var selector = $(this).attr('data-filter');
                $('.works-container').isotope({
                    filter: selector
                });
                setTimeout(function() {
                    $container1.isotope('layout');
                }, 800);
            });

        });
        // ready: ends
}
// initMasonry: ends



function initLightbox() {
        $(document).ready(function() {
            //VENOBOX
            $('.venobox, .image-lightbox-link').venobox({
                numeratio: true
            });
        });
        // ready: ends
}
// initLightbox: ends




function initMobileNav() {
        $(document).ready(function() {
                //Mobile Only Navigation (multi level)
                $('ul.slimmenu').slimmenu({
                    resizeWidth: '1200',
                    collapserTitle: '',
                    easingEffect: 'easeInOutQuint',
                    animSpeed: 'medium',
                });

                $('.slimmenu li a:not(.sub-collapser)').on('click',function(){
                            $('ul.slimmenu').removeClass('expanded').slideUp();
                });
        });
        // ready: ends
}
// initMobileNav: ends



function initParallax() {
        $(document).ready(function() {
             //PARALLAX
            function parallaxInit() {
                $('.parallax, .parallax-layer').each(function() {
                    $(this).parallax("30%", 0.1);
                });
            }

            if (!device.tablet() && !device.mobile()) {

                //Activating Parallax effect if non-mobile device is detected
                $(window).bind('load', function() {
                    parallaxInit();
                });


            } else {

                //Dectivate Parallax effect if mobile device is detected (bg image is displayed)
                $('.parallax, .parallax-layer').addClass('no-parallax');

            }

        });
        // ready: ends
}
// initParallax: ends


function initBackstretch() {
        if ( $( ".slideshow-slide" ).length ) {
            // backstretch slideshow extended by Designova
            var items = [];
            var captions = [];
            var numberOfSlides = $('.slideshow-slide').length;
            $('.slideshow-content').hide();
            $('.slideshow-slide').each(function () {
                items.push(this.src);
                captions.push(this.title);
            });
            var options = {
                fade: "slow",
                duration: 4000
            };
            var currentIndex;
            // Start Backstretch, and save a reference to it.
            var slideshow = $(".backstretch-wrap").backstretch(items,options);
            $(window).on("backstretch.show", function(e, instance) {
                var newCaption = captions[instance.index];
                $(".slideshow-caption").text( newCaption );
                currentIndex = slideshow.data('backstretch').current();
                $('.count-current').html(currentIndex+1);
                $('.count-total').html(numberOfSlides);
            });
             $(".slide-pause").on('click', function(e) {
                e.preventDefault();
                slideshow.data('backstretch').pause();
            });
            $(".slide-prev").on('click', function(e) {
                e.preventDefault();
                slideshow.data('backstretch').prev();
            });
            $(".slide-next").on('click', function(e) {
                e.preventDefault();
                slideshow.data('backstretch').next();
            });
            $('.fullscreen-toggle').on('click', function(e) {
                e.preventDefault();
                $('.slideshow-status').fadeIn();
                $('.backstretch').css('opacity',0);
                var vWnow = $(window).width();
                slideshow.backstretch("resize");
                $('.backstretch, .backstretch img').css('width',vWnow);
                $('.backstretch img').css('left',0);
                setTimeout(function() {
                    slideshow.data('backstretch').show(currentIndex);
                }, 2700);
                setTimeout(function() {
                    $('.slideshow-status').fadeOut();
                    $('.backstretch').css('opacity',1);
                }, 3000);
            });
            $('.onscreen-trigger').on('click', function(e) {
                e.preventDefault();
                $('.slideshow-status').fadeIn();
                $('.backstretch').css('opacity',0);
                setTimeout(function() {
                    slideshow.data('backstretch').show(currentIndex);
                }, 2700);
                setTimeout(function() {
                    $('.slideshow-status').fadeOut();
                    $('.backstretch').css('opacity',1);
                }, 3000);
                var vWafter = $(window).width();
                var Wc1 = $('header.masthead').width();
                var Wc2 = $('.sticky-sidebar').width();
                slideshow.backstretch("resize");
                $('.backstretch').css('width',vWafter-Wc1-Wc2);
            });

        }
}
// initBackstretch: ends


function initBGVimeo() {
        $(document).ready(function() {
            $('#okplayer, #okplayer-mask').remove();
             if ( $( "#bg-video-flag" ).length ) {
                        $('body').add('#okplayer');
                        $('body').add('#okplayer-mask');
                      //shows BG video only if .intro03 div is present
                        if( !device.tablet() && !device.mobile() ) {
                        /* plays the BG Vimeo or Youtube video if non-mobile device is detected*/ 
                        $("body").okvideo({ source: '112539263', //set your video source here
                                        autoplay:true,
                                        loop: true,
                                        highdef:true,
                                        hd:true, 
                                        adproof: true,
                                        volume:50 // control the video volume by setting a value from 0 to 99
                                     });
                                    
                        } else {
                            
                            /* displays a poster image if mobile device is detected*/ 
                            $('body, .mastwrap').addClass('poster-img');
                            
                        }
                        // inner if loop ends
                }
                // outer if loop ends

        });
        // ready: ends
}
// initBGVimeo: ends


function initOwlCarousel() {
        $(document).ready(function() {
            if ( $(".agency-carousel-wrap").length ) {
                $(".agency-carousel").owlCarousel({
                    loop:true,
                    margin:0,
                    dots:false,
                    nav:true,
                    navText: false,
                    responsive:{
                        0:{
                            items:1
                        },
                        600:{
                            items:1
                        },
                        1000:{
                            items:2
                        }
                    }
                });
            }

            if ( $(".phrase-carousel").length ) {
                $(".phrase-carousel").owlCarousel({
                    loop:true,
                    margin:0,
                    dots:true,
                    nav:false,
                    navText: false,
                    responsive:{
                        0:{
                            items:1
                        },
                        600:{
                            items:3
                        },
                        1000:{
                            items:4
                        }
                    }
                });
            }

             if ( $(".team-carousel").length ) {
                $(".team-carousel").owlCarousel({
                    loop:true,
                    margin:0,
                    dots:false,
                    nav:true,
                    navText: false,
                    responsive:{
                        0:{
                            items:1
                        },
                        600:{
                            items:2
                        },
                        1000:{
                            items:3
                        }
                    }
                });
            }


            

             if ( $(".project-carousel-wrap").length ) {
                $(".project-carousel").owlCarousel({
                    loop:true,
                    margin:0,
                    dots:false,
                    nav:true,
                    navText: false,
                    responsive:{
                        0:{
                            items:1
                        },
                        600:{
                            items:1
                        },
                        1000:{
                            items:1
                        }
                    }
                });
            }
        });
        // ready: ends
}
// initOwlCarousel: ends


function initElements() {
        $(document).ready(function() {
           

                $(".dropdown").on("hover", function(e) {
                    if (e.type == "mouseenter") {
                        $('.dropdown-menu', this).stop( true, true ).slideDown("fast");
                        $(this).toggleClass('open');
                    }
                    else { // mouseleave
                        $('.dropdown-menu', this).stop( true, true ).slideDown("fast");
                        $(this).toggleClass('open'); 
                    }
                });

                $('#myCarousel').carousel({
                  interval: 40000
                });

                $('.carousel .item').each(function(){
                  var next = $(this).next();
                  if (!next.length) {
                    next = $(this).siblings(':first');
                  }
                  next.children(':first-child').clone().appendTo($(this));

                  if (next.next().length>0) {
                 
                      next.next().children(':first-child').clone().appendTo($(this)).addClass('rightest');
                      
                  }
                  else {
                      $(this).siblings(':first').children(':first-child').clone().appendTo($(this));
                     
                  }
                });


                $('.skills').waypoint(function() {
                    $('.progress-bar').each(function() {
                        var progressValue = $(this).attr('data-skills-value');
                        $(this).animate({
                                        width: progressValue+"%"
                                        }, 2500);
                    });

                }, { offset: '35%' });


                

                //counter init
                  $('.elements-counter-wrap').waypoint(function() {

                     $(this).css('opacity',1);
                    $('.elements-counter').each(function() {
                            var $endNum = parseInt($(this).find('.number').text());
                                $(this).find('.number').countTo({
                                  from: 0,
                                  to: $endNum,
                                  speed: 2500,
                                  refreshInterval: 40
                                });
                            });

                }, { offset: '35%' });



        });
        // ready: ends
}
// initElements: ends


function initMap() {
       
            if ( $( "#googlemaps" ).length ) {

            }
                 


}
// initMap: ends

function initContactForm() {
        $(document).ready(function() {
            //CONTACT FORM VALIDATION

            // hide messages 
            $(".error").hide();
            $(".success").hide();

            $('#contactForm input').on('click', function() {
                $(".error").fadeOut();
            });

            // on submit...
            $("#contactForm #submit").on('click', function() {
                $(".error").hide();

                //required:

                //name
                var name = $("input#name").val();
                if (name === "") {
                    //$("#error").fadeIn().text("Name required.");
                    $('#fname').fadeIn('slow');
                    $("input#name").focus();
                    return false;
                }

                //email (check if entered anything)
                var email = $("input#email").val();
                //email (check if entered anything)
                if (email === "") {
                    //$("#error").fadeIn().text("Email required");
                    $('#fmail').fadeIn('slow');
                    $("input#email").focus();
                    return false;
                }

                //email (check if email entered is valid)

                if (email !== "") { // If something was entered
                    if (!isValidEmailAddress(email)) {
                        $('#fmail').fadeIn('slow'); //error message
                        $("input#email").focus(); //focus on email field
                        return false;
                    }
                }

                function isValidEmailAddress(emailAddress) {
                    var pattern = new RegExp(/^(("[\w-+\s]+")|([\w-+]+(?:\.[\w-+]+)*)|("[\w-+\s]+")([\w-+]+(?:\.[\w-+]+)*))(@((?:[\w-+]+\.)*\w[\w-+]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][\d]\.|1[\d]{2}\.|[\d]{1,2}\.))((25[0-5]|2[0-4][\d]|1[\d]{2}|[\d]{1,2})\.){2}(25[0-5]|2[0-4][\d]|1[\d]{2}|[\d]{1,2})\]?$)/i);
                    return pattern.test(emailAddress);
                }




                // comments
                var comments = $("#msg").val();

                if (comments === "") {
                    //$("#error").fadeIn().text("Email required");
                    $('#fmsg').fadeIn('slow');
                    $("input#msg").focus();
                    return false;
                }
            });



            return false;
        });
        // ready: ends
}
// initContactForm: ends


});
// $(function ($)  : ends

})();
//  global wrapper $(function ($)  : ends



