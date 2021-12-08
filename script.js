// first option

let slideIndex = 1;
const sliders = document.querySelectorAll('.slider-wrapper__slide'),
      slideCurrent = document.querySelector('.sliders-current'),
      slideTotal = document.querySelector('.sliders-total'),
      btnPrev = document.querySelector('.btn-prev'),
      btnNext = document.querySelector('.btn-next');


if(sliders.length < 10) {
    slideTotal.textContent = `0${sliders.length}`;
} else {
    slideTotal.textContent = sliders.length;
}

function showSlide(n) {
    if(n > sliders.length) {
        slideIndex = 1;
    } 
    if(n < 1) {
        slideIndex = sliders.length;
    }

    sliders.forEach(slide => slide.style.display = 'none')

    sliders[slideIndex - 1].style.display = 'block'


    if(sliders.length < 10) {
        slideCurrent.textContent = `0${slideIndex}`;
    } else {
        slideCurrent.textContent = slideIndex;
    }
}

function findPosition(n) {
    showSlide(slideIndex += n)
}
btnPrev.addEventListener('click', () => {
    findPosition(-1)
})
btnNext.addEventListener('click', () => {
    findPosition(1)
})
showSlide(slideIndex)