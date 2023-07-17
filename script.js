'use strict';

///////////////////////////////////////
// Modal window

// const modal = document.querySelector('.modal');
// const overlay = document.querySelector('.overlay');
// const btnCloseModal = document.querySelector('.btn--close-modal');
// const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

// const openModal = function () {
//   modal.classList.remove('hidden');
//   overlay.classList.remove('hidden');
// };

// const closeModal = function () {
//   modal.classList.add('hidden');
//   overlay.classList.add('hidden');
// };

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

// btnCloseModal.addEventListener('click', closeModal);
// overlay.addEventListener('click', closeModal);

// document.addEventListener('keydown', function (e) {
//   if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
//     closeModal();
//   }
// });

// Scroll
const btnLearnMore = document.querySelector('.btn--scroll-to');
const session1 = document.getElementById('section--1');

btnLearnMore.addEventListener('click', function(e){
  e.preventDefault();
  const s1 = session1.getBoundingClientRect();

  // window.scrollTo({
  //   left: s1.x + window.scrollX,
  //   top: s1.y + window.scrollY,
  //   behavior: 'smooth'
  // });

  session1.scrollIntoView({behavior: 'smooth'});

});


// Tab Content
const divParentContainerBtns = document.querySelector('.operations__tab-container');

divParentContainerBtns.addEventListener('click', function(e){
  const btnOperationsTab = e.target.closest('.operations__tab');

  if(!btnOperationsTab){
    return;
  }

  activeBtnTab(btnOperationsTab);
  displayDivTabContent(btnOperationsTab.dataset.tab);
});

function activeBtnTab(btnActive){
  const btnsTab = document.querySelectorAll('.operations__tab');

  btnsTab.forEach(btn => {
    btn.classList.remove('operations__tab--active')
  });
  btnActive.classList.add('operations__tab--active');
}

function displayDivTabContent(divTabNumber){
  const divTabContentWillActive = document.querySelector(`.operations__content--${divTabNumber}`)
  const divsContainTabContent = document.querySelectorAll('.operations__content');

  divsContainTabContent.forEach(divtabContent => {
    divtabContent.classList.remove('operations__content--active');
  });

  divTabContentWillActive.classList.add('operations__content--active');
}

// nav mouseenter handler

const nav = document.querySelector('.nav');

nav.addEventListener('mouseover', changeOpacityNav.bind(0.5));
nav.addEventListener('mouseout', changeOpacityNav.bind(1))

function changeOpacityNav(e){
  if(e.target.classList.contains('nav__link')){
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('.nav__logo');
    
    siblings.forEach(sibling => {
      sibling.style.opacity = this;
    });

    logo.style.opacity = this;

    link.style.opacity = 1;
  }
}

// Sticky nav
// const initialCroords = session1.getBoundingClientRect();

// window.addEventListener('scroll', function(){
//   if(window.scrollY > initialCroords.top){
//     nav.classList.add('sticky');
//   }else{
//     nav.classList.remove('sticky');
//   }
// });


// better way Sticky nav
const headerTitle = document.querySelector('.header__title');

function obsCallback(entries){
  const entry = entries[0];
  if(!entry.isIntersecting){
    nav.classList.add('sticky');
  }else{
    nav.classList.remove('sticky');
  }
}

const obsOption = {
  root: null,
  threshold: 0
}

const observerHeaderTilte = new IntersectionObserver(obsCallback, obsOption);
observerHeaderTilte.observe(headerTitle);

// Reveal sections
const sections = document.querySelectorAll('.section');
const observerSection = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15
});

function revealSection(entries, observe){
  const entry = entries[0];
  if(!entry.isIntersecting){
    return;
  }

  entry.target.classList.remove('section--hidden');
  observe.unobserve(entry.target);
}

sections.forEach(section => {
  section.classList.add('section--hidden');
  observerSection.observe(section);
});



// lazy load images
const imagesLazy = document.querySelectorAll('img[data-src]');
const observeImg = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0
});

function loadImg(entries, observe){
  const entry = entries[0];

  if(!entry.isIntersecting){
    return;
  }

  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function(e){
    entry.target.classList.remove('lazy-img');
  });

  observe.unobserve(entry.target);
}

imagesLazy.forEach(img => {
  observeImg.observe(img);
});


// slider
var currentSlideNumber = 0;

// elemets
const slides = document.querySelectorAll('.slide');
const btnSliderRight = document.querySelector('.slider__btn--right');
const btnSliderLeft = document.querySelector('.slider__btn--left');
const dotContainer = document.querySelector('.dots');

// render dots
slides.forEach((_, index) => {
  let htmlDot = `<button class="dots__dot" data-slide="${index}"></button>`;
  dotContainer.insertAdjacentHTML('beforeend', htmlDot);
});

const dots = document.querySelectorAll('.dots__dot');

// init data
goToDot(currentSlideNumber);
goToSlide(currentSlideNumber);

// handler event
dotContainer.addEventListener('click', function(e){
  if(!e.target.classList.contains('dots__dot')){
    return;
  }

  currentSlideNumber = e.target.dataset.slide;
  goToDot(currentSlideNumber);
  goToSlide(currentSlideNumber);
})

btnSliderRight.addEventListener('click', goRightSlide);
btnSliderLeft.addEventListener('click', goLeftSlide);

window.addEventListener('keydown', function(e){
  if(e.key === 'ArrowRight'){
    goRightSlide();
  }else if(e.key === 'ArrowLeft'){
    goLeftSlide();
  }
});

// function define
function goToSlide(slideNumber){
  slides.forEach((slide, index) => {
    slide.style.transform = `translateX(${(index - slideNumber) * 100}%)`;
  });
}

function goToDot(indexDot){
  dots.forEach((dot) => {
    dot.classList.remove('dots__dot--active');
  });
  dots[indexDot].classList.add('dots__dot--active');
}

function goRightSlide(){
  if(++currentSlideNumber > slides.length-1){
   currentSlideNumber = 0;
  }
  
  goToSlide(currentSlideNumber);
  goToDot(currentSlideNumber);
}

function goLeftSlide(){
 if(--currentSlideNumber < 0){
   currentSlideNumber = slides.length-1;
 }

 goToSlide(currentSlideNumber);
 goToDot(currentSlideNumber);
}