const prevBtn = document.getElementById('prev-button');
const nextBtn = document.getElementById('next-button');
const imageSlidesContainer = document.querySelector('.image-slide-container');
const imageSlides = document.querySelectorAll('.image-slide');
const titleSlides = document.querySelectorAll('.title-slide');
const titleText = document.querySelectorAll('.title-text');
const navBtnContainer = document.querySelector('.nav-buttons-container');

const slideHandler = function() {
  let currentSlideIndex  = 0;
  function changeBy(val) {
    return currentSlideIndex += val;
  }
  return {
    increaseSlideIndex: function() {
      return changeBy(1);
    },
    decreaseSlideIndex: function() {
      return changeBy(-1);
    },
    getSlideIndex: function() {
      return currentSlideIndex;
    },
    setSlideIndex: function(pageIndex) {
      currentSlideIndex = pageIndex;
    }
  }
};

const slideIndex = slideHandler();
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
    
    titleSlides[slideIndex.getSlideIndex()].style.opacity = 0;
    navBtns[slideIndex.getSlideIndex()].classList.remove('active');
    if (pageIndex >= 0) {
      slideIndex.setSlideIndex(pageIndex);
      index = pageIndex;
    }
    else {
      if (direction === 'prev') {
        index = slideIndex.decreaseSlideIndex();
        if (index < 0) {
          slideIndex.setSlideIndex(imageSlides.length - 1);
          index = slideIndex.getSlideIndex();
        } 
      }
      else if (direction === 'next') {
        index = slideIndex.increaseSlideIndex();
        if (index > imageSlides.length - 1) {
          slideIndex.setSlideIndex(0);
          index = slideIndex.getSlideIndex();
        }
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