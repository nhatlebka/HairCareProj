const sliderImg = $('.slider-img')
console.log(sliderImg)
const width= $(window).width();
if (width<768) {
    for (let i=0; i<sliderImg.length; i++) {
        $(sliderImg[i]).html(`<img src="/images/mobile_slider${i+1}.jpg" alt="">`)
    }
}
$(window).resize(function() {
    windowWidth = $(window).width();
    if (windowWidth<768) {
        for (let i=0; i<sliderImg.length; i++) {
            $(sliderImg[i]).html(`<img src="/images/mobile_slider${i+1}.jpg" alt="">`)
        }
    } else {
        for (let i=0; i<sliderImg.length; i++) {
            $(sliderImg[i]).html(`<img src="/images/slider${i+1}.jpg" alt="">`)
        }
    }
    });