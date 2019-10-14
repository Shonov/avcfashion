import $ from 'jquery';
import {apiUrl} from './config';

$(document).ready(function () {
    $('.footer__year').text((new Date()).getFullYear());

    let links = $('a.header-menu__mob-down-link, a.header-menu__item');

    links.filter(function () {

        if ($(this).get(0).getAttribute('href') === window.location.pathname) {
            if (!$(this).hasClass('header-menu__mob-down-link')) {
                $(this).addClass('header-menu__item--pc-active');
            }
            $(this).addClass('header-menu__item--active');
        } else {
            $(this).removeClass('header-menu__item--pc-active');
            $(this).removeClass('header-menu__item--active');
        }
    });

    if (window.location.hash.length > 0) {
        let activeServiceIndex = '.services-menu__link[href="' + window.location.pathname + window.location.hash + '"]';
        $(activeServiceIndex).addClass('header-menu__item--active');
    }

    $('.services-menu__link').on('click', function (e) {

        if ($(this).attr('href').indexOf("#") > 0) {
            $('html, body').animate({ scrollTop: $(this).offset().top }, 500);
        }

        $('.services-menu__down').find('a').filter(function () {
            $(this).removeClass('header-menu__item--active');
        });

        $(this).addClass('header-menu__item--active');
    });

    $('#header-mob-menu').on('click', function () {
        $('#mob-down-container').css('display', 'block');
    });

    $('#close-mob-down').on('click', function () {
        $('#mob-down-container').css('display', 'none');
    });

    const container = $('.sending-email-success');

    $(document).mouseup(function (e) {
        if (container.has(e.target).length === 0 && container.css('display') === 'flex'){
            container.fadeOut(400);
        }

        $('.sending-email-success__close').on('click', function () {
            container.fadeOut(400);
        });

        $('body').css('position', 'relative').css('overflow-y', 'auto');
    });
    $('.sending-email-success__back-link').on('click', function () {
        container.fadeOut(400);
    });

});

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function sendAjaxQuery(formData) {
    let utm = {
        utm_source: getParameterByName('utm_source'),
        utm_medium: getParameterByName('utm_medium'),
        utm_channel: getParameterByName('utm_channel'),
            utm_keyword: getParameterByName('utm_keyword'),
        utm_content: getParameterByName('utm_content'),
        utm_campaign: getParameterByName('utm_campaign'),
        utm_term: getParameterByName('utm_term'),
    };
    Object.keys(utm).forEach((key) => (utm[key] == null) && delete utm[key]);

    if (Object.keys(utm).length !== 0) {
        formData.utm = utm;
    }

    $.ajax({
        type: "POST",
        url: apiUrl,
        data: {form_data: formData},
        beforeSend: function() {
            $('.has-spinner').loading('start');
        },
        success: function (msg) {
            console.log("Прибыли данные: " + msg);
        },
        complete: function () {
            $('form')[0].reset();
            $('.has-spinner').loading('stop');
            $('.sending-email-success').fadeIn(400).css('display', 'flex');
            $('body').css('position', 'relative').css('overflow-y', 'hidden');
        },
    });
}

$('.free-consultation-form__container').submit(function (e) {
    e.preventDefault();
    let formData = {
        name: $(this).find('.free-consultation-form__input[name="name"]').val(),
        phone: $(this).find('.free-consultation-form__input[name="phone"]').val(),
        url: window.location.pathname,
    };

    sendAjaxQuery(formData);
});

$('.learn-more-form').submit(function (e) {
    e.preventDefault();

    let formData = {
        name: $(this).find('.learn-more-form__field[name="name"]').val(),
        phone: $(this).find('.learn-more-form__field[name="phone"]').val(),
        url: window.location.pathname,
    };

    sendAjaxQuery(formData);
});

$('.contact-form').submit(function (e) {
    e.preventDefault();

    let formData = {
        name: $(this).find('.contact-form__field[name="name"]').val(),
        email: $(this).find('.contact-form__field[name="email"]').val(),
        message: $(this).find('.contact-form__field[name="message"]').val(),
        url: window.location.pathname,
    };

    sendAjaxQuery(formData);
});

$('.tailoring__form').submit(function (e) {
    e.preventDefault();

    let formData = {
        name: $(this).find('.tailoring__form--input[name="name"]').val(),
        email: $(this).find('.tailoring__form--input[name="email"]').val(),
        phone: $(this).find('.tailoring__form--input[name="phone"]').val(),
        url: window.location.pathname,
    };

    sendAjaxQuery(formData);
});

(function ($) {
    $.fn.loading = function (action) {
        const self = $(this);
        if (action === 'start') {
            if ($(self).attr("disabled") === "disabled") {
                self.preventDefault();
            }
            $('.has-spinner').attr("disabled", "disabled");
            $(self).attr('data-btn-text', $(self).text());
            $(self).html('Sending<span class="has-spinner__spinner"><img src="../img/loader.gif" width="20" height="20"></span>');
            $(self).addClass('has-spinner--active');
        }
        if (action === 'stop') {
            $(self).html($(self).attr('data-btn-text'));
            $(self).removeClass('has-spinner--active');
            $('.has-spinner').removeAttr("disabled");
        }
    }
})($);

let pictures = [
    '../img/slider/Picture1.jpg',
    '../img/slider/Picture2.jpg',
    '../img/slider/Picture3.jpg',
    '../img/slider/Picture6.jpg',
    '../img/slider/Picture7.jpg',
    '../img/slider/Picture8.jpg',
    '../img/slider/Picture9.jpg',
    '../img/slider/Picture10.jpg',
    '../img/slider/Picture11.jpg',
    '../img/slider/Picture12.jpg',
];

let slideNow = 0;
let slideCount = pictures.length;
let slideInterval = 3000;
let activePicture = pictures[0];

function activeSlider() {
    activePicture = pictures[slideNow];

    $('.section--main').stop(true,true).fadeTo( 400 , 0.0, function() {
        $('.section--main').css({
            'background-image': 'linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url("' + activePicture + '")',
        });
    });
    $('.section--main').fadeTo( 400 , 1);


    $('.section__dot--active').removeClass('section__dot--active');

    let index = '.section__dot[data-id="' + pictures.indexOf(activePicture) + '"]';
    $(index).addClass('section__dot--active');
}

function prevSlider() {
    if (slideNow === 0 || slideNow > slideCount) {
        slideNow = slideCount - 1;
    } else {
        slideNow--;
    }

    activeSlider();
}

function nextSlide() {
    if (slideNow >= slideCount - 1 || slideNow < 0 || slideNow >= slideCount) {
        slideNow = 0;
    } else {
        slideNow++;
    }
    activeSlider();
}

$(document).ready(function () {
    let dot = $('.section__dot:not(.section__dot--active)');
    for (let i = 2; i < slideCount; i++) {
        dot.clone(true).attr('data-id', i).appendTo('.section__dot-container');
    }

    let switchInterval = setInterval(nextSlide, slideInterval);

    $('.section--main').hover(function(e){
        e.preventDefault();
        clearInterval(switchInterval);
    },function() {
        switchInterval = setInterval(nextSlide, slideInterval);
    });

    $('.section__slider-arrow--left').click(function (e) {
        e.preventDefault();
        prevSlider();
    });


    $('.section__slider-arrow--right').click(function (e) {
        e.preventDefault();
        nextSlide();
    });

    $('.section__dot').click(function (e) {
        e.preventDefault();
        slideNow = $(this).attr('data-id');
        activePicture = pictures[slideNow];
        activeSlider();
    });

});

import '../scss/style.scss';
