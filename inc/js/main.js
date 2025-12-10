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

 function heroSlider(options) {

    const {
      sectionSelector = '.slider-section',
      sliderWrapperSelector = '.slider-wrapper',
      prevBtnSelector = '.prev-btn',
      nextBtnSelector = '.next-btn',
      playSpeed = 6000
    } = options;

    let section = document.querySelector(sectionSelector);
    let sliderWrapper = document.querySelector(sliderWrapperSelector);
    let slides = Array.from(sliderWrapper.children);
    let prevBtn = document.querySelector(prevBtnSelector);
    let nextBtn = document.querySelector(nextBtnSelector);
    let indicatorsMenu;
    let currentIndex = 0;
    let slideWidth = slides[0].offsetWidth;
    let isDragging = false;
    let startX = 0;
    let scrollStart = 0;

    function setupSlider() {
      if (currentIndex >= 0 && currentIndex < slides.length) {
          indicatorsMenu.children[currentIndex]?.classList.add('active');
      }
    }

    function buildIndicators() {
      indicatorsMenu = document.createElement('ul');
      indicatorsMenu.classList.add('indicators-menu');
      section.appendChild(indicatorsMenu);

      for (let i = 0; i < slides.length; i++) {
        const indicator = document.createElement('li');
        indicator.setAttribute('data-index', i);
        indicatorsMenu.appendChild(indicator);

        indicator.addEventListener('click', () => {
          currentIndex = i;
          updateSlides();
        });
      }

      indicatorsMenu.children[currentIndex].classList.add('active');

      if (window.innerWidth < 500) {
        if (indicatorsMenu.children.length > 8) {
          indicatorsMenu.style.display = 'none';
        }
      } else {
        if (indicatorsMenu.children.length > 12) {
          indicatorsMenu.style.display = 'none';
        }
      }
    }

    function updateSlides() {
      const scrollPosition = currentIndex * slideWidth;
      Array.from(indicatorsMenu.children).forEach(indicator => { indicator.classList.remove('active'); });
      indicatorsMenu.children[currentIndex].classList.add('active');

      slides.forEach((slide, index) => {
        if (index === currentIndex) {
          slide.classList.add('active');
        } else {
          slide.classList.remove('active');
        }
      });

      function animateScroll(start, end, duration) {
        let startTime = null;

        function animation(currentTime) {
          if (!startTime) startTime = currentTime;
          const timeElapsed = currentTime - startTime;
          const run = easeInOutQuad(timeElapsed, start, end - start, duration);

          sliderWrapper.scrollLeft = run;
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

      animateScroll(sliderWrapper.scrollLeft, scrollPosition, 900);

      sliderWrapper.scrollTo({
        left: scrollPosition,
        behavior: "smooth"
      });

      if (currentIndex >= slides.length) {
          currentIndex = 0;
          sliderWrapper.scrollLeft = 0;
      }
    }

    function prevSlide() {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      updateSlides();
    }

    function nextSlide() {
      currentIndex = (currentIndex + 1) % slides.length;
      updateSlides();
    }

    let heroSliderInterval = setInterval(nextSlide, playSpeed);

    function stopSlider() {
      clearInterval(heroSliderInterval);
    }

    function startSlider() {
      clearInterval(heroSliderInterval);
      heroSliderInterval = setInterval(nextSlide, playSpeed);
    }

    function startDrag(e) {
      isDragging = true;
      startX = e.clientX;
      scrollStart = sliderWrapper.scrollLeft;
    }

    function duringDrag(e) {
      if (!isDragging) return;
      const currentX = e.clientX;
      const dragDistance = currentX - startX;
      sliderWrapper.scrollLeft = scrollStart - dragDistance;
    }

    function endDrag() {
      if (!isDragging) return;
      isDragging = false;
      const scrollLeft = sliderWrapper.scrollLeft;

      if (Math.abs(scrollLeft - currentIndex * slideWidth) > slideWidth / 4) { // Snap to nearest slide after drag
        if (scrollLeft > currentIndex * slideWidth) {
          nextSlide();
        } else {
          prevSlide();
        }
      } else {
        updateSlides();
      }
    }

    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('mouseenter', stopSlider);
    nextBtn.addEventListener('mouseenter', stopSlider);
    section.addEventListener('mouseenter', stopSlider);
    section.addEventListener('mouseleave', startSlider);

    sliderWrapper.addEventListener('mousedown', startDrag);
    sliderWrapper.addEventListener('mousemove', duringDrag);
    sliderWrapper.addEventListener('mouseup', endDrag);
    sliderWrapper.addEventListener('mouseleave', endDrag);

    buildIndicators();
    updateSlides();
    setupSlider();

    window.addEventListener('scroll', function () {
      if (window.scrollY > 10) {
        stopSlider();
      } else if (window.scrollY === 0) {
        startSlider();
      }
    });

    section.querySelectorAll('.hero-slide-item .left-block h2').forEach((h2) => {
      h2.textContent = truncateWords(h2.textContent, 5);
    });

    section.querySelectorAll('.hero-slide-item .left-block p').forEach((p) => {
      p.textContent = truncateWords(p.textContent, 20);
    });

    // loginDrawerBtn.addEventListener("click", stopSlider);
    // closeLoginDrawerBtn.addEventListener("click", startSlider);
  }

  heroSlider({
    sectionSelector:'.hero-section .col-middle .slider-container',
    sliderWrapperSelector:'.hero-section .col-middle .slider-container .slider-wrapper',
    prevBtnSelector:'.hero-section .col-middle .slider-container .prev-btn',
    nextBtnSelector:'.hero-section .col-middle .slider-container .next-btn',
  });

}

function filterWithTabs(tabs, Items) {
  
  tabs = Array.isArray(tabs) ? tabs : Array.from(tabs);
  Items = Array.isArray(Items) ? Items : Array.from(Items);


  function showItems(filterClass) { // Function to show items with a specific class
    Items.forEach(item => {
      if (item.classList.contains(filterClass)) {
          item.style.display = 'block';
      }
    });
  }

  tabs[0].classList.add('button-active');

  Items.forEach(item => {item.style.display = 'none';});

  let firstFilterClick = tabs[0].getAttribute('filter-click');
  showItems(firstFilterClick);


  tabs.forEach(tab => {
    tab.addEventListener('click', function() {
      
      tabs.forEach(btn => btn.classList.remove('button-active'));
      this.classList.add('button-active');

      const filterClick = this.getAttribute('filter-click');

      Items.forEach(item => {item.style.display = 'none';});
      showItems(filterClick);
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

/*
 ######################
 ####### GLOBAL #######
 ######################
*/
function pagination(data, itemsPerPage, renderContent, paginationContainer) {
  const totalPages = Math.ceil(data.length / itemsPerPage);

  if (totalPages <= 1) {
    paginationContainer.style.display = 'none';
    renderContent(data, 1);
    return;
  } else {
    paginationContainer.style.display = 'flex';
  }

  function renderPage(page) {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = page * itemsPerPage;
    const currentItems = data.slice(startIndex, endIndex);
    renderContent(currentItems, page);
  }

  function renderPagination(currentPage) {
    paginationContainer.innerHTML = '';

    const visiblePages = 3;
    const range = Math.min(visiblePages, totalPages);

    if (currentPage > 1) {
      const prevButton = createPaginationLink('Previous', currentPage - 1);
      prevButton.classList.add('previous');
      paginationContainer.appendChild(prevButton);
    }

    if (currentPage <= range) {
      for (let i = 1; i <= range; i++) {
        paginationContainer.appendChild(createPaginationLink(i, i, currentPage));
      }
      if (totalPages > visiblePages) {
        appendDots();
        paginationContainer.appendChild(createPaginationLink(totalPages, totalPages, currentPage));
      }
    } else if (currentPage > totalPages - range) {
      paginationContainer.appendChild(createPaginationLink(1, 1, currentPage));
      appendDots();
      for (let i = totalPages - range + 1; i <= totalPages; i++) {
        paginationContainer.appendChild(createPaginationLink(i, i, currentPage));
      }
    } else {
      paginationContainer.appendChild(createPaginationLink(1, 1, currentPage));
      appendDots();
      for (let i = currentPage - Math.floor(visiblePages / 2); i <= currentPage + Math.floor(visiblePages / 2); i++) {
        paginationContainer.appendChild(createPaginationLink(i, i, currentPage));
      }
      appendDots();
      paginationContainer.appendChild(createPaginationLink(totalPages, totalPages, currentPage));
    }

    if (currentPage < totalPages) {
      const nextButton = createPaginationLink('Next', currentPage + 1);
      nextButton.classList.add('next');
      paginationContainer.appendChild(nextButton);
    }
  }

  function createPaginationLink(text, page, currentPage) {
    const link = document.createElement('a');
    link.href = '#';
    link.className = 'pagination-link';
    link.textContent = text;
    if (page === currentPage) {
      link.classList.add('active');
    }
    link.addEventListener('click', (e) => {
      e.preventDefault();
      renderPage(page);
      renderPagination(page);
    });
    return link;
  }

  function appendDots() {
    const dots = document.createElement('span');
    dots.className = 'pagination-dots';
    dots.textContent = '....';
    paginationContainer.appendChild(dots);
  }

  renderPage(1);
  renderPagination(1);
}

function truncateWords(text, wordsCount) {
  return text.split(' ').slice(0, wordsCount).join(' ');
}

function eyeFunction(eyeIcon) {
  const passInput = eyeIcon.previousElementSibling;
  const eyeIcons = eyeIcon.querySelectorAll(".fa-eye, .fa-eye-slash");

  if (passInput.type === 'password') {
    passInput.type = 'text';
    eyeIcons[0].style.display = "block";
    eyeIcons[1].style.display = "none";
  } else {
    passInput.type = 'password';
    eyeIcons[0].style.display = "none";
    eyeIcons[1].style.display = "block";
  }
}

/*** REMOVE WHITE BACKGROUND ***/
function removeBackground(imgElement, targetColor) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  const originalImage = new Image();
  originalImage.src = imgElement.src;

  originalImage.onload = function () {
    canvas.width = originalImage.width;
    canvas.height = originalImage.height;
    ctx.drawImage(originalImage, 0, 0, canvas.width, canvas.height);

    // Get image data
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    // Convert target color to RGBA format
    const targetRGBA = hexToRGBA(targetColor);

    for (let i = 0; i < data.length; i += 4) {
      const red = data[i];
      const green = data[i + 1];
      const blue = data[i + 2];

      // Check if the pixel color matches the target color
      if (red === targetRGBA.r &&
        green === targetRGBA.g &&
        blue === targetRGBA.b
      ) {
        data[i + 3] = 0; // Set alpha channel to 0 (transparent)
      }
    }

    // Update the canvas with modified image data
    ctx.putImageData(imageData, 0, 0);

    // Replace the original image with the processed image
    imgElement.src = canvas.toDataURL();
  };
}

function hexToRGBA(hex) {
  const bigint = parseInt(hex.slice(1), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return { r, g, b };
}

const productImages = document.querySelectorAll('.image-holder img');
productImages.forEach(function (img) {
  const clonedImage = img.cloneNode();
  removeBackground(clonedImage, '#ffffff');
  img.parentNode.replaceChild(clonedImage, img);
});