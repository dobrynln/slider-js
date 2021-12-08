// первый вариант

// let slideIndex = 1;
// const sliders = document.querySelectorAll('.slider-wrapper__slide'),
//       slideCurrent = document.querySelector('.sliders-current'),
//       slideTotal = document.querySelector('.sliders-total'),
//       btnPrev = document.querySelector('.btn-prev'),
//       btnNext = document.querySelector('.btn-next');

// if(sliders.length < 10) {
//     slideTotal.textContent = `0${sliders.length}`;
// } else {
//     slideTotal.textContent = sliders.length;
// }

// function showSlide(n) {
//     if(n > sliders.length) {
//         slideIndex = 1;
//     } 
//     if(n < 1) {
//         slideIndex = sliders.length;
//     }

//     sliders.forEach(slide => slide.style.display = 'none')

//     sliders[slideIndex - 1].style.display = 'block'


//     if(sliders.length < 10) {
//         slideCurrent.textContent = `0${slideIndex}`;
//     } else {
//         slideCurrent.textContent = slideIndex;
//     }
// }

// function findPosition(n) {
//     showSlide(slideIndex += n)
// }
// btnPrev.addEventListener('click', () => {
//     findPosition(-1)
// })
// btnNext.addEventListener('click', () => {
//     findPosition(1)
// })
// showSlide(slideIndex)

// второй вариант
const sliders = document.querySelectorAll('.slider-wrapper__slide'),
      slider = document.querySelector('.slider-advanges')
      slideCurrent = document.querySelector('.sliders-current'),
      slideTotal = document.querySelector('.sliders-total'),
      btnPrev = document.querySelector('.btn-prev'),
      btnNext = document.querySelector('.btn-next'),
      slidersWrapper = document.querySelector('.slider-wrapper'),
      sliderInner = document.querySelector('.slider-wrapper__inner'),
      sliderWidth = window.getComputedStyle(slidersWrapper).width;

let slideIndex = 1;
let offset = 0;
// Создаю индикаторы, можно через html и css, но решил сделать здесь для своей практики.
const indicatorsList = document.createElement('ul');
indicatorsList.classList.add('carousel-indicators')
indicatorsList.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
`
slider.append(indicatorsList)

const dots = []; //на них повешаю обработчик

for(let i = 0; i < sliders.length; i++) {
    const dot = document.createElement('li');
    dot.setAttribute('data-slide', i + 1);
    dot.style.cssText = `
    box-sizing: content-box;
    flex: 0 1 auto;
    width: 30px;
    height: 6px;
    margin-right: 3px;
    margin-left: 3px;
    cursor: pointer;
    background-color: #fff;
    background-clip: padding-box;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    opacity: .5;
    transition: opacity .6s ease;
    `;
    if(i == 0) {
        dot.style.opacity = '1';
    }
    indicatorsList.append(dot)
    dots.push(dot)
}
// 
if(sliders.length < 10) {
    slideTotal.textContent = `0${sliders.length}`;
    slideCurrent.textContent = `0${slideIndex}`;
} else {
    slideTotal.textContent = sliders.length;
    slideCurrent.textContent = slideIndex;
}

sliderInner.style.width = 100 * sliders.length + '%'
sliders.forEach(slide => {
    slide.style.width = sliderWidth;
})

btnNext.addEventListener('click', () => {
    if(offset == deleteChar(sliderWidth) * (sliders.length - 1)) {
        offset = 0
    } else {
        offset += deleteChar(sliderWidth)
    }
    console.log(offset)
    sliderInner.style.transform = `translateX(-${offset}px)`
    if(slideIndex == sliders.length) {
        slideIndex = 1;
    } else {
        slideIndex++
    }
    opacityDots()
    showValueSlideActive()
})
btnPrev.addEventListener('click', () => {
    if(offset == 0) {
        offset = deleteChar(sliderWidth) * (sliders.length - 1)
    } else {
        offset -= deleteChar(sliderWidth)
    }
    if(slideIndex == 1) {
        slideIndex = sliders.length;
    } else {
        slideIndex--;
    }
    sliderInner.style.transform = `translateX(-${offset}px)`;
    opacityDots()
    showValueSlideActive();
})
dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
        const activeSlide = e.target.getAttribute('data-slide')
        slideIndex = activeSlide;
        offset = deleteChar(sliderWidth) * (activeSlide - 1)
        sliderInner.style.transform = `translateX(-${offset}px)`;
        showValueSlideActive()
        opacityDots()
    })
})


function showValueSlideActive () {
    if(sliders.length < 10) {
        slideCurrent.textContent = `0${slideIndex}`;
    } else {
        slideCurrent.textContent = slideIndex;
    }
}
function opacityDots() {
    dots.forEach(dot => dot.style.opacity = '0.5');
    dots[slideIndex - 1].style.opacity = 1;
}

function deleteChar(str) {
    return +str.replace(/\D/g, '');
}