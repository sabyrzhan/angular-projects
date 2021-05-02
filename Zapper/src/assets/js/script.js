/********************
header
********************/
$(".header .header__bars").on('click', function () {

    var selector = $(".header .header__nav")

    if (selector.hasClass('shown')) {
        selector.css('right', "100%");
        selector.removeClass('shown');
    } else {
        selector.css('right', "0");
        selector.addClass('shown');
    }
});

$(".header .header__nav span").on('click', function () {

    var selector = $(".header .header__nav")

    if (selector.hasClass('shown')) {
        selector.css('right', "100%");
        selector.removeClass('shown');
    } else {
        selector.css('right', "0");
        selector.addClass('shown');
    }
});

$(document).on('click', 'a[href^="#"]', function (event) {
    event.preventDefault();
    let elementId = $(event.target).attr('href');
    if (elementId == '#') return;

    $('html, body').animate({
        scrollTop: $($.attr(this, 'href')).offset().top
    }, 1000, 'swing');
});

$(window).on('scroll', () => {
    if ($(window).scrollTop() > 50) {
        $('.header-1').addClass('fixed');
    } else {
        $('.header-1').removeClass('fixed');
    }
});

$(window).on('scroll', () => {
    if ($(window).scrollTop() > 0) {
        $('.header-2').addClass('fixed');
    } else {
        $('.header-2').removeClass('fixed');
    }
});

/********************
testimonial
********************/
$(".testimonial__wrapper").on('mouseover click', (e) => {
    if ($(e.target).is('img')) {
        let parentElement = $(e.target).parent().parent();
        //console.log(parentElement);
        parentElement.addClass('active');
        if (parentElement.siblings().hasClass('active')) {
            parentElement.siblings().removeClass('active');
        }
    }
});

/********************
clients slider
********************/


/********************
screenshot slider
********************/


/********************
related post slider
********************/

/********************
accordion
********************/
$('.card').on('hide.bs.collapse', function (e) {
    var parentId = $(e.target).parent().attr('id');
    $(`#${parentId} > .card-header > h5`).addClass('hidden');
});

$('.card').on('show.bs.collapse', function (e) {
    var parentId = $(e.target).parent().attr('id');
    $(`#${parentId} > .card-header > h5`).removeClass('hidden');
});

/********************
blog
********************/
$('.category__dropdown').on('click', (e) => {
    if (($(e.target).parents().hasClass('category__dropdown')) && !($('.category__dropdown-box').hasClass('shown'))) {
        $('.category__dropdown-box').addClass('shown');
    } else if (($(e.target).parents().hasClass('category__dropdown-info')) && ($('.category__dropdown-box').hasClass('shown'))) {
        $('.category__dropdown-box').removeClass('shown');
    }
});
$('.date__dropdown').on('click', (e) => {
    if (($(e.target).parents().hasClass('date__dropdown')) && !($('.date__dropdown-box').hasClass('shown'))) {
        $('.date__dropdown-box').addClass('shown');
    } else if (($(e.target).parents().hasClass('date__dropdown-info')) && ($('.date__dropdown-box').hasClass('shown'))) {
        $('.date__dropdown-box').removeClass('shown');
    }
});

$(window).on('click', (e) => {
    if (!($(e.target).parents().hasClass('category__dropdown'))) {
        $('.category__dropdown-box').removeClass('shown');
    }
    if (!($(e.target).parents().hasClass('date__dropdown'))) {
        $('.date__dropdown-box').removeClass('shown');
    }
});


$('.nav__dropdown-info').on('click', (e) => {
    let parentId = $(e.target).closest('li').attr('id');
    $(`#${parentId} > .nav__dropdown-box`).toggleClass('shown');
});





























































