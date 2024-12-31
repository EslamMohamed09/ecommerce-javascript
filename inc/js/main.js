const header = document.querySelector('header');

if(header){document.body.style.paddingTop = `${header.offsetHeight}px`;}

document.addEventListener('DOMContentLoaded', () => {
    const categoriesContainer = document.getElementById('categories-menu');
    const categories = [
      { id: 1, name: 'Electronics', link: 'category.php?categoryid=1' },
      { id: 2, name: 'Fashion', link: 'category.php?categoryid=2' },
      { id: 3, name: 'Home Appliances', link: 'category.php?categoryid=3' },
      { id: 4, name: 'Books', link: 'category.php?categoryid=4' },
      { id: 5, name: 'Toys', link: 'category.php?categoryid=5' },
      { id: 6, name: 'Sports', link: 'category.php?categoryid=6' },
      { id: 7, name: 'Beauty Products', link: 'category.php?categoryid=7' },
      { id: 8, name: 'Furniture', link: 'category.php?categoryid=8' },
      { id: 9, name: 'Groceries', link: 'category.php?categoryid=9' },
      { id: 10, name: 'Jewelry', link: 'category.php?categoryid=10' },
      { id: 11, name: 'Watches', link: 'category.php?categoryid=11' },
    ];
  
    categories.forEach(category => {
      const categoryList = document.createElement('li');
      const categoryLink = document.createElement('a');
      categoryLink.href = category.link;
      categoryList.className = 'cat-list';
      categoryLink.className = 'cat-link';
      categoryLink.textContent = category.name;
      categoryList.appendChild(categoryLink);
      categoriesContainer.appendChild(categoryList);
    });
});


let index = 0;
const heroSection = document.querySelector(".hero-section");
const heroSliderWrapper = document.querySelector('.hero-section .col-middle .slider-wrapper');
const heroSlideItem = document.querySelectorAll('.hero-section .slide-item');

if(heroSection){

function hideAllSlides(){
  heroSlideItem.forEach(slide => {
    slide.style.display = "none";
  });
}

hideAllSlides();

if (index >= 0 && index < heroSlideItem.length) {heroSlideItem[index].style.display = "flex";}

function prevB(){
  index = (index - 1 + heroSlideItem.length) % heroSlideItem.length;
  hideAllSlides();
  heroSlideItem[index].style.display = "flex";
}

function nextB(){
  index = (index + 1) % heroSlideItem.length;
  hideAllSlides();
  heroSlideItem[index].style.display = "flex";
}

let bannerSliderInterval = setInterval(nextB, 4000);

window.addEventListener('scroll', function(){// Stop Banner Slider
  if(window.scrollY > 10){
     clearInterval(bannerSliderInterval);
  } else if(window.scrollY === 0){
    clearInterval(bannerSliderInterval);
    bannerSliderInterval = setInterval(nextB, 4000);
  }
});

heroSliderWrapper.addEventListener('mouseenter', function(){
  clearInterval(bannerSliderInterval);
});

heroSliderWrapper.addEventListener('mouseleave', function(){
  clearInterval(bannerSliderInterval);
  bannerSliderInterval = setInterval(nextB, 4000);
});

}

function filterWithTabs(tabButtons, cardItems) {
  
  tabButtons = Array.isArray(tabButtons) ? tabButtons : Array.from(tabButtons);
  cardItems = Array.isArray(cardItems) ? cardItems : Array.from(cardItems);

  function hideAllItems() {
    cardItems.forEach(item => {
        item.style.display = 'none';
    });
  }

  function showItemsWithClass(filterClass) { // Function to show card items with a specific class
    cardItems.forEach(item => {
        if (item.classList.contains(filterClass)) {
            item.style.display = 'block';
        }
    });
  }

  let firstFilterClick = tabButtons[0].getAttribute('filter-click');

  hideAllItems();
  showItemsWithClass(firstFilterClick);
  tabButtons[0].classList.add('button-active');

  tabButtons.forEach(button => { 
      button.addEventListener('click', function() {
          const filterClick = this.getAttribute('filter-click');

          hideAllItems();
          showItemsWithClass(filterClick);

          tabButtons.forEach(btn => btn.classList.remove('button-active'));
          this.classList.add('button-active');
      });
  });
}

filterWithTabs(document.querySelectorAll('#main-categories .category-panel1 .left-col .first-pcat-names h4'), 
               document.querySelectorAll('#main-categories .category-panel1 .right-col .product-item'));

filterWithTabs(document.querySelectorAll('#main-categories .category-panel2 .left-col .second-pcat-names h4'), 
               document.querySelectorAll('#main-categories .category-panel2 .right-col .product-item'));

filterWithTabs(document.querySelectorAll('#main-categories .category-panel3 .left-col .third-pcat-names h4'), 
               document.querySelectorAll('#main-categories .category-panel3 .right-col .product-ad'));


// if(header){

//   const loginDrawerBtn = document.getElementById("login-btn");
//   const loginDrawer = document.getElementById("login-drawer");
//   const closeLoginDrawerBtn = document.getElementById("close-login-drawer-btn");

//   loginDrawerBtn.addEventListener("click", function(){
//     loginDrawer.classList.add("openingLoginDrawer");
//     clearInterval(bannerSliderInterval); // Stop Banner Slider
//   });

//   closeLoginDrawerBtn.addEventListener("click", function(){
//     loginDrawer.classList.remove("openingLoginDrawer");
//     clearInterval(bannerSliderInterval);
//     bannerSliderInterval = setInterval(nextB, 4000);
//   });

// }

function scrollBarSlider(options) {
  const {
      section = 'slider-section',
      containerSelector = '.slides-container',
      dotsSelector = '#sliderdots',
      prevArrowSelector = '.arrow-left',
      nextArrowSelector = '.arrow-right',
      slidesToShowDefault = 1,
      slidesToScrollDefault = 1,
      autoplaySpeed = 3000
  } = options;

  let sliderSection = document.querySelector(section);
  let sliderContainer = document.querySelector(containerSelector);
  let currentIndex = 0;
  let slidesToShow = slidesToShowDefault;
  let slidesToScroll = slidesToScrollDefault;
  let slides;
  let dotsWrapper = document.querySelector(dotsSelector);
  let isDragging = false;
  let startX = 0;
  let scrollStart = 0;
  let autoSlideInterval;
  const gapSize = parseFloat(getComputedStyle(document.documentElement).fontSize) * 1.5;

  function setupSlider() {
      slides = sliderContainer.children;
      sliderContainer.style.display = 'flex';
      sliderContainer.style.scrollBehavior = 'smooth';
      updateSlidesToShow();
  }

  function setResponsive() {
      const responsiveSettings = [
          { breakpoint: 10, settings: { slidesToShow: 1, slidesToScroll: 1 }},
          { breakpoint: 360, settings: { slidesToShow: 2, slidesToScroll: 2 }},
          { breakpoint: 560, settings: { slidesToShow: 3, slidesToScroll: 3 }},
          { breakpoint: 720, settings: { slidesToShow: 4, slidesToScroll: 4 }},
          { breakpoint: 1000, settings: { slidesToShow: 5, slidesToScroll: 5 }},
          { breakpoint: 1400, settings: { slidesToShow: 6, slidesToScroll: 6 }},
          { breakpoint: 1600, settings: { slidesToShow: 7, slidesToScroll: 7 }}
      ];

      responsiveSettings.forEach(resp => {
          if (window.innerWidth >= resp.breakpoint) {
              slidesToShow = resp.settings.slidesToShow;
              slidesToScroll = resp.settings.slidesToScroll;
          }
      });
      updateSlidesToShow();
  }

  function updateSlidesToShow() {
      const wrapperWidth = sliderContainer.clientWidth;
      const slideWidth = (wrapperWidth - gapSize * (slidesToShow - 1)) / slidesToShow;
      
      Array.from(slides).forEach(slide => {
          slide.style.flex = `0 0 ${slideWidth}px`;
          slide.style.maxWidth = `${slideWidth}px`;
      });
  }

  function scrollToSlide() {
      const wrapperWidth = sliderContainer.clientWidth;
      const slideWidth = (wrapperWidth - gapSize * (slidesToShow - 1)) / slidesToShow;
      const scrollPosition = currentIndex * (slideWidth + gapSize);
  
      function animateScroll(start, end, duration) {
          let startTime = null;
  
          function animation(currentTime) {
              if (!startTime) startTime = currentTime;
              const timeElapsed = currentTime - startTime;
              const run = easeInOutQuad(timeElapsed, start, end - start, duration);
  
              sliderContainer.scrollLeft = run;
              if (timeElapsed < duration) requestAnimationFrame(animation);
          }
  
          function easeInOutQuad(t, b, c, d) {
              t /= d / 2;
              if (t < 1) return c / 2 * t * t + b;
              t--;
              return -c / 2 * (t * (t - 2) - 1) + b;
          }
  
          requestAnimationFrame(animation);
      }
  
      animateScroll(sliderContainer.scrollLeft, scrollPosition, 600);
      
      if (currentIndex >= slides.length) {
          currentIndex = 0;
          sliderContainer.scrollTo({ left: 0 });
      }
  }

  function prevSlide() {
      currentIndex -= slidesToScroll;
      if (currentIndex < 0) {
          currentIndex = slides.length - (slides.length % slidesToScroll || slidesToScroll);
      }
      scrollToSlide(true);
  }

  function nextSlide() {
      currentIndex += slidesToScroll;
      if (currentIndex > slides.length) {currentIndex = 0;}
      scrollToSlide(true);
  }

  function attachEvents() {
      const prevButton = document.querySelector(prevArrowSelector);
      const nextButton = document.querySelector(nextArrowSelector);

      prevButton.addEventListener('click', prevSlide);
      nextButton.addEventListener('click', nextSlide);
      window.addEventListener('resize', setResponsive);

      sliderContainer.addEventListener('mousedown', startDrag);
      sliderContainer.addEventListener('mousemove', duringDrag);
      sliderContainer.addEventListener('mouseup', endDrag);
      sliderContainer.addEventListener('mouseleave', endDrag);

      // sliderSection.addEventListener('mouseover', () => clearInterval(autoSlideInterval));
      // sliderSection.addEventListener('mouseleave', autoSlide);
  }

  function startDrag(e) {
      isDragging = true;
      startX = e.clientX;
      scrollStart = sliderContainer.scrollLeft;
  }

  function duringDrag(e) {
      if (!isDragging) return;
      const currentX = e.clientX;
      const dragDistance = currentX - startX;
      sliderContainer.scrollLeft = scrollStart - dragDistance;
  }

  function endDrag() {
      if (!isDragging) return;
      isDragging = false;
      const wrapperWidth = sliderContainer.clientWidth;
      const slideWidth = wrapperWidth / slidesToShow;
      const scrollLeft = sliderContainer.scrollLeft;

      if (Math.abs(scrollLeft - currentIndex * slideWidth) > slideWidth / 2) {
          if (scrollLeft > currentIndex * slideWidth) {
              nextSlide();
          } else {
              prevSlide();
          }
      } else {
          scrollToSlide(true);
      }
  }

  function autoSlide() {
      clearInterval(autoSlideInterval);
      autoSlideInterval = setInterval(nextSlide, autoplaySpeed);
  }

  setupSlider();
  setResponsive();
  attachEvents();
  // autoSlide();
}

scrollBarSlider({containerSelector:'.featured-categories .slider-wrapper', 
                 prevArrowSelector:'.featured-categories .arrow-left', 
                 nextArrowSelector:'.featured-categories .arrow-right'});

const categoriesColors = [
    "var(--transparent-green3)",  // 1st color
    "var(--transparent-yellow2)", // 2nd color
    "var(--transparent-yellow)",  // 3rd color
    "var(--transparent-orange3)", // 4th color
    "var(--transparent-green4)",  // 5th color
    "var(--transparent-blue)",    // 6th color
    "var(--transparent-violet)",  // 7th color
    "var(--transparent-olive)",   // 8th color
    "var(--transparent-orange)"   // 9th color
];

document.querySelectorAll('.featured-categories .slider-wrapper .category-item .image').forEach((catItem, index) => {
  catItem.style.backgroundColor = categoriesColors[index % categoriesColors.length];
});

/* 
 #########################
 #### ScrollUp Button #### 
 #########################
*/
if(document.getElementById('scroll-up')){

   var scrollUpBtn = document.getElementById('scroll-up');
   window.onscroll = function() {
    if (window.scrollY >= 1200) {
        scrollUpBtn.style.display = "block";
    } else {
        scrollUpBtn.style.display = "none";
    }
  };

  document.querySelector('.scroll-up').addEventListener('click', function(event) {
    event.preventDefault();
    scrollToTop(80);
  });
  
  function scrollToTop(duration) {
    const start = window.pageYOffset;
    const startTime = 'now' in window.performance ? performance.now() : new Date().getTime();
  
    function scrollStep() {
      const currentTime = 'now' in window.performance ? performance.now() : new Date().getTime();
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
  
      window.scroll(0, start - start * progress);
  
      if (progress < 1) {
        requestAnimationFrame(scrollStep);
      }
    }
  
    requestAnimationFrame(scrollStep);
  }

}