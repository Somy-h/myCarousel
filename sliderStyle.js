const prevBtn = document.getElementById('prev-button');
const nextBtn = document.getElementById('next-button');
const imageSlidesContainer = document.querySelector('.image-slide-container');
const imageSlides = document.querySelectorAll('.image-slide');
const titleSlides = document.querySelectorAll('.title-slide');
const titleText = document.querySelectorAll('.title-text');
const navBtnContainer = document.querySelector('.nav-buttons-container');

const slideIndex = new slideHandler();
prevBtn.disabled = true;

let navBtns = createNavigationButtons();
prevBtn.addEventListener('click', () => displaySlides('prev'));
nextBtn.addEventListener('click', () => displaySlides('next'));

function createNavigationButtons() {
  let result = [];
  for(let i = 0; i < imageSlides.length; i++) {
    let btnElement = document.createElement('button');
    btnElement.classList.add('nav-button');
    if (i === 0) btnElement.classList.add('active');

    btnElement.setAttribute('type', 'button');
    btnElement.addEventListener('click', () => displaySlides('', i));
    navBtnContainer.appendChild(btnElement);
    result.push(btnElement);
  }
  return result;
}

function displaySlides(direction, pageIndex = -1) {
    let index = 0;
    const slideWidth = imageSlidesContainer.clientWidth;
    
    titleSlides[slideIndex.beforeSlideIndex()].style.opacity = 0;
    navBtns[slideIndex.beforeSlideIndex()].classList.remove('active');
    if (pageIndex >= 0) {
      slideIndex.setSlideIndex(pageIndex);
      index = pageIndex;
    }
    else {
      if (direction === 'prev') {
        index = slideIndex.decreaseSlideIndex();
      } 
      else if (direction === 'next') {
        index = slideIndex.increaseSlideIndex();
      }
    }
    imageSlidesContainer.style.transform = `translateX(-${index * slideWidth}px)`;
    titleSlides[index].style.opacity = 1;
    checkDisableButton(index);
    navBtns[index].classList.add('active');
}

function checkDisableButton (index) {
  if(index === 0) {
    prevBtn.disabled = true;
    nextBtn.disabled = false;   
  }
  else if (index === imageSlides.length - 1) {
    prevBtn.disabled = false;
    nextBtn.disabled = true;
  }
  else {
    prevBtn.disabled = false;
    nextBtn.disabled = false;
  }
}

function slideHandler() {
  let _currentSlideIndex = 0;

  this.beforeSlideIndex = function () {
    return _currentSlideIndex;
  }

  this.setSlideIndex = function (pageIndex) {
    _currentSlideIndex = pageIndex;
  }

  this.increaseSlideIndex = function() {
     _currentSlideIndex = (++_currentSlideIndex % imageSlides.length);
    return _currentSlideIndex;
  }

  this.decreaseSlideIndex = function() {
    _currentSlideIndex = (_currentSlideIndex <= 0) ? (imageSlides.length - 1) : --_currentSlideIndex;
    return _currentSlideIndex;
  }
}