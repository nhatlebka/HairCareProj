const mobileMenuIcon = $('.mobile-menu-icon');
const nemuMobile = $('.menu-mobile');
const mobileBack = $('.mobile-back');
const headerMobileOverPlay = $('.header-mobile-over-play');
const mobileIconControl = $('.mobile-icon-control');
const mobileListChild = $('.nav-mobile-list-child');
const catIconControl = $('.cat-icon-control');
const catListChild = $('.nav-cat-list-child');
const ListChild = $('.nav-list-child');
const headerNavScroll = $('.header-nav-scroll');
const headerMainScroll = $('.header-main-scroll');

mobileMenuIcon.click(function () {
    nemuMobile.css({
        transform: 'translateX(0)',
        opacity: 1,
    });

    headerMobileOverPlay.css({
        display: 'block',
    });
});

mobileBack.click(function () {
    nemuMobile.css({
        transform: 'translateX(-100%)',
        opacity: 0,
    });
    headerMobileOverPlay.css({
        display: 'none',
    });
});

headerMobileOverPlay.click(function () {
    nemuMobile.css({
        transform: 'translateX(-100%)',
        opacity: 0,
    });
    headerMobileOverPlay.css({
        display: 'none',
    });
});

mobileListChild.slideUp();

mobileIconControl.each(function (key) {
    if ($(this).html() === '<i class="fas fa-caret-left"></i>') {
        $(this).html('<i class="fas fa-sort-down"></i>');
    } else {
        $(this).html('<i class="fas fa-caret-left"></i>');
    }
    $(this).click(function () {
        console.log($(this).html);
        if ($(this).html() === '<i class="fas fa-caret-left"></i>') {
            $(this).html('<i class="fas fa-sort-down"></i>');
        } else {
            $(this).html('<i class="fas fa-caret-left"></i>');
        }
        $(mobileListChild[key]).slideToggle();
    });
});

window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    if (scrolled > 186) {
        headerNavScroll.css({
            transform: 'translateY(0%)',
        });
    } else {
        headerNavScroll.css({
            transform: 'translateY(-100%)',
        });
    }
    if (scrolled > 128) {
        headerMainScroll.css({
            transform: 'translateY(0%)',
        });
    } else {
        headerMainScroll.css({
            transform: 'translateY(-100%)',
        });
    }
});

catListChild.slideUp();

catIconControl.each(function (key) {
    if ($(this).html() === '<i class="fas fa-caret-left"></i>') {
        $(this).html('<i class="fas fa-sort-down"></i>');
    } else {
        $(this).html('<i class="fas fa-caret-left"></i>');
    }
    $(this).click(function () {
        console.log($(this).html);
        if ($(this).html() === '<i class="fas fa-caret-left"></i>') {
            $(this).html('<i class="fas fa-sort-down"></i>');
        } else {
            $(this).html('<i class="fas fa-caret-left"></i>');
        }
        $(catListChild[key]).slideToggle();
    });
});
