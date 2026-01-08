class Slider {
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;

    this.slides = this.container.querySelectorAll(options.slideSelector || '.slide');
    this.wrapper = this.container.querySelector(options.wrapperSelector || '.slider-wrapper');
    this.dotsContainer = this.container.querySelector('.slider-dots') || this.container.querySelector('.offer-dots');
    
    this.prevBtn = this.container.querySelector('.prev-btn') || this.container.querySelector('.nav-prev');
    this.nextBtn = this.container.querySelector('.next-btn') || this.container.querySelector('.nav-next'); // Fixed selector
    
    this.currentIndex = 0;
    this.totalSlides = this.slides.length;
    this.autoPlayDelay = options.autoPlayDelay || 5000;
    this.isAutoPlay = options.autoPlay !== false;
    this.type = options.type || 'fade'; // 'fade' or 'slide' or 'carousel'
    this.visibleItems = options.visibleItems || 1;
    
    this.timer = null;

    this.init();
  }

  init() {
    // Create dots if needed
    if (this.dotsContainer && this.type !== 'carousel') {
        this.createDots();
    }

    // Event Listeners
    if (this.prevBtn) this.prevBtn.addEventListener('click', () => this.prev());
    if (this.nextBtn) this.nextBtn.addEventListener('click', () => this.next());

    if (this.isAutoPlay) {
        this.startAutoPlay();
        this.container.addEventListener('mouseenter', () => this.stopAutoPlay());
        this.container.addEventListener('mouseleave', () => this.startAutoPlay());
    }

    this.update();
  }

  createDots() {
    this.dotsContainer.innerHTML = '';
    this.slides.forEach((_, index) => {
      const dot = document.createElement('div');
      dot.classList.add('slider-dot');
      if (index === 0) dot.classList.add('active');
      dot.addEventListener('click', () => this.goTo(index));
      this.dotsContainer.appendChild(dot);
    });
  }

  update() {
    if (this.type === 'fade') {
        this.slides.forEach((slide, index) => {
            if (index === this.currentIndex) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });
    }
    else if (this.type === 'slide' || this.type === 'carousel') {
      // For carousel/slide logic (Products)
      // Assuming simple translation for demo
      // NOTE: For 'carousel' type used in product slider, we move a strip
      // Logic simplified for this specific structure
      if (this.wrapper && this.type === 'carousel') {
          // This acts more like a scroll in this specific CSS set up
          // But let's support the 'offers' slider which acts like 'fade' structure but css handles it differently
      }
    }

    // Update Dots
    if (this.dotsContainer) {
        const dots = this.dotsContainer.querySelectorAll('.slider-dot');
        dots.forEach((dot, index) => {
            if (index === this.currentIndex) dot.classList.add('active');
            else dot.classList.remove('active');
        });
    }
  }

  next() {
    this.currentIndex++;
    if (this.currentIndex >= this.totalSlides) this.currentIndex = 0;
    this.update();
  }

  prev() {
    this.currentIndex--;
    if (this.currentIndex < 0) this.currentIndex = this.totalSlides - 1;
    this.update();
  }

  goTo(index) {
    this.currentIndex = index;
    this.update();
  }

  startAutoPlay() {
    if (this.timer) clearInterval(this.timer);
    this.timer = setInterval(() => this.next(), this.autoPlayDelay);
  }

  stopAutoPlay() {
    if (this.timer) clearInterval(this.timer);
  }
}

const header = document.querySelector('header');

if (header) {document.body.style.paddingTop = `${header.offsetHeight}px`;}

// padding to notification of action buttons
document.querySelectorAll('header .main-header .middle-bar .action-buttons .action-button .value span').forEach((span) => {
  let number = span.textContent.trim();

  if (/^\d{4,}$/.test(number)) {

    if (window.innerWidth < 690) {
      span.parentElement.style.padding = '5px 2px 4px 2px';
    } else {
      span.parentElement.style.padding = '9px 2px 8.5px';
    }

  } else if (/^\d{3}$/.test(number)) {

    if (window.innerWidth < 690) {
      span.parentElement.style.padding = '5px 2px 4px 2px';
    } else {
      span.parentElement.style.padding = '8px 3px 7.5px';
    }

  } else if (/^\d{2}$/.test(number)) {

    if (window.innerWidth < 690) {
      span.parentElement.style.padding = '4px 2.9px 3px 2.9px';
    } else {
      span.parentElement.style.padding = '6px 3.5px';
    }

  } else {

    if (window.innerWidth < 690) {
      span.parentElement.style.padding = '3px 4px 2px';
    } else {
      span.parentElement.style.padding = '5px 6px';
    }

  }
});

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
const heroSlideItems = document.querySelectorAll('.hero-section .hero-slide-item');

if (heroSection) {

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

    const heroSlideItemsGradients = [
      'radial-gradient(var(--lightblue2), var(--milky6))',
      'radial-gradient(var(--lightblue1), var(--lightblue6))',
      'radial-gradient(var(--lightblue1), var(--milky7))'
    ];

    function updateWrapperBackground() {
      const groupIndex = Math.floor(currentIndex / 3) % heroSlideItemsGradients.length;
      sliderWrapper.style.background = heroSlideItemsGradients[groupIndex];
    }

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
      updateWrapperBackground();
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
    sectionSelector: '.hero-section .col-middle .slider-container',
    sliderWrapperSelector: '.hero-section .col-middle .slider-container .slider-wrapper',
    prevBtnSelector: '.hero-section .col-middle .slider-container .prev-btn',
    nextBtnSelector: '.hero-section .col-middle .slider-container .next-btn',
  });

}

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

/* 
 ####################################
 #### SHOP BY CATEGORIES SECTION ####
 ####################################
*/
if(document.querySelector('.shop-by-categories-section')){
  scrollBarSlider({
    containerSelector:'.shop-by-categories-section .slider-wrapper',
    prevArrowSelector:'.shop-by-categories-section .arrow-left',
    nextArrowSelector:'.shop-by-categories-section .arrow-right'
  });
}

const categoriesColors = [
  "var(--transparent-green3)",  // 1st color
  "var(--transparent-yellow2)", // 2nd color
  "var(--transparent-yellow)",  // 3rd color
  "var(--transparent-orange)", // 4th color
  "var(--transparent-green4)",  // 5th color
  "var(--transparent-blue)",    // 6th color
  "var(--transparent-violet)",  // 7th color
  "var(--transparent-olive)",   // 8th color
  "var(--transparent-orange)"   // 9th color
];

document.querySelectorAll('.shop-by-categories-section .slider-wrapper .category-item .image').forEach((catItem, index) => {
  catItem.style.backgroundColor = categoriesColors[index % categoriesColors.length];
});

/* 
 #############################
 #### BEST SELLER SECTION ####
 #############################
*/
if(document.querySelector('.best-seller-section')) {
  scrollSlider5Items({
    section:'.best-seller-section',
    containerSelector:'.best-seller-section .product-carousel-track',
    prevArrowSelector:'.best-seller-section .section-heading .arrows .arrow-left',
    nextArrowSelector:'.best-seller-section .section-heading .arrows .arrow-right',
  });

  const bestSellerColorDots = document.querySelectorAll('.best-seller-section .product-card .color-dot');
  bestSellerColorDots.forEach(dot => {
    dot.addEventListener('click', function(e) {
      e.preventDefault();
      const parent = this.parentElement;
      parent.querySelectorAll('.color-dot').forEach(s => s.classList.remove('selected')); // Get siblings
      this.classList.add('selected');
    });
  });
}

/* 
 #################################
 #### MAIN CATEGORIES SECTION ####
 #################################
*/
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

  Items.forEach(item => { item.style.display = 'none'; });

  let firstFilterClick = tabs[0].getAttribute('filter-click');
  showItems(firstFilterClick);


  tabs.forEach(tab => {
    tab.addEventListener('click', function () {

      tabs.forEach(btn => btn.classList.remove('button-active'));
      this.classList.add('button-active');

      const filterClick = this.getAttribute('filter-click');

      Items.forEach(item => { item.style.display = 'none'; });
      showItems(filterClick);
    });
  });
}

if(document.querySelector('.main-categories-section')) {
  filterWithTabs(document.querySelectorAll('.main-categories-section .category-panel1 .left-col .first-pcat-names h4'),
                 document.querySelectorAll('.main-categories-section .category-panel1 .right-col .product-item'));

  filterWithTabs(document.querySelectorAll('.main-categories-section .category-panel2 .left-col .second-pcat-names h4'),
                 document.querySelectorAll('.main-categories-section .category-panel2 .right-col .product-item'));

  filterWithTabs(document.querySelectorAll('.main-categories-section .category-panel3 .left-col .third-pcat-names h4'),
                 document.querySelectorAll('.main-categories-section .category-panel3 .right-col .product-ad'));
}

/* 
 #############################
 #### BEST OFFERS SECTION ####
 #############################
*/
if (document.querySelector('.best-offers-section')) {
    animatedFilterWithTabsAndArrows(
      document.querySelectorAll('.best-offers-section .section-heading2 .tabs li'),
      document.querySelectorAll('.best-offers-section .products-container .products-group'),
      document.querySelector('.best-offers-section .section-heading2 .arrows .prev-btn'),
      document.querySelector('.best-offers-section .section-heading2 .arrows .next-btn')
    );

  document.querySelectorAll('.best-offers-section .product-item .product-title').forEach((title) => {
    title.textContent = truncateWords(title.textContent, 4);
  });
}

/* 
 ###############################
 #### OFFERS SLIDER SECTION ####
 ###############################
*/
// CSS handles the "one/two/three" classes, we just toggle .active
const offersSlider = new Slider('offersSlider', {
  type:'fade',
  slideSelector:'.offer-slide',
  autoPlayDelay:4000
});

/* 
 ##############################
 #### TESTIMONIALS SECTION ####
 ##############################
*/
if (document.querySelector('.testimonials-section')) {
    scrollSlider4Items({
      section:'.testimonials-section',
      containerSelector:'.testimonials-section .wrapper-container .slider-wrapper',
      prevArrowSelector:'.testimonials-section .wrapper-container .arrows .arrow-left',
      nextArrowSelector:'.testimonials-section .wrapper-container .arrows .arrow-right',
    });
}

/* 
 #########################
 #### ScrollUp Button #### 
 #########################
*/
if (document.getElementById('scroll-up')) {

  var scrollUpBtn = document.getElementById('scroll-up');
  window.onscroll = function () {
    if (window.scrollY >= 1200) {
      scrollUpBtn.style.display = "block";
    } else {
      scrollUpBtn.style.display = "none";
    }
  };

  document.querySelector('.scroll-up').addEventListener('click', function (event) {
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
 ===========================
 ####### SINGLE PAGE #######
 ===========================
*/
if (document.querySelector("#single-page")) {

  function getProductId() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
  }

  async function loadProduct(productId) {
    const response = await fetch('../database/products.json');
    if (!response.ok) { throw new Error('Failed to load products') }
    const data = await response.json();

    const product = data.products.find(product => product.id === productId);
    if (!product) { throw new Error('Product not found') }
    return product;
  }

  async function loadProducts() {
    const response = await fetch('../database/products.json');
    if (!response.ok) { throw new Error('Failed to load products') }
    const data = await response.json();
    return data.products;
  }

  function categoryIdOfProduct(productId, products) {
    const product = products.find((product) => product.id === productId);
    if (product) { return product.catId } else { throw new Error('Failed to load category') }
  }

  function siblingProductsOfProduct(categoryId, excludeProductId, products) {
    const categoryProducts = products.filter((product) => product.catId === categoryId && product.id !== excludeProductId);
    return categoryProducts;
  }

  async function getSiblingCategories(categoryId) {

    const response = await fetch('../database/categories.json');
    if (!response.ok) { throw new Error('Failed to load categories') }
    const data = await response.json();

    let category = data.categories.find(cat => cat.id === categoryId);

    if (!category || !category.parent_id) { return []; }

    // Get all categories with the same parent_id & exclude the given category
    return data.categories.filter(cat => cat.parent_id === category.parent_id && cat.id !== categoryId);
  }

  function getCategoriesProducts(categoriesIds, products) {
    return products.filter(product => categoriesIds.includes(product.catId));
  }

  async function loadCategories() {
    const response = await fetch('../database/categories.json');
    if (!response.ok) { throw new Error('Failed to load categories'); }
    const data = await response.json();
    return data.categories;
  }

  function getParentCategories(categoryId, categories, parentCategories = []) {
    const category = categories.find(cat => cat.id === categoryId);

    if (category) {
      parentCategories.unshift(category);

      if (category.parent_id) {
        return getParentCategories(category.parent_id, categories, parentCategories);
      }
    }

    return parentCategories;
  }

  async function displayParentCategories() {
    try {
      const categories = await loadCategories();
      const product = await loadProduct(getProductId());
      const categoryId = product.catId;
      const parentCategories = getParentCategories(categoryId, categories);

      let parentCategoriesHtml = parentCategories.map((parentCategory, index) => `
      <li class="d-flex-r-c-c">
        ${index !== 0 ? '<i class="fas fa-chevron-left"></i>' : ''}
        <a href="category.html?id=${parentCategory.id}" class="catlink">${parentCategory.name}</a>
      </li>`).join('');

      const parentCategoriesHolder = document.querySelector('#single-page .product-container .left-block .parent-categories-holder');
      parentCategoriesHolder.innerHTML = parentCategoriesHtml;
    } catch (error) {
      console.error('error loading parent categories:', error);
    }
  }

  async function displayFeaturedProducts() {
    try {

      const currentProductId = getProductId();
      const products = await loadProducts();
      const productCategoryId = categoryIdOfProduct(currentProductId, products);
      const siblingProducts = siblingProductsOfProduct(productCategoryId, currentProductId, products);

      const siblingCategories = await getSiblingCategories(productCategoryId);
      const siblingCategoriesIds = siblingCategories.map((cat) => cat.id);
      const siblingCategoriesProducts = getCategoriesProducts(siblingCategoriesIds, products);

      if (siblingProducts.length > 0) {

        let siblingProductsHtml = siblingProducts.map((product) => {

          let truncateTitle = product.title.split(" ").slice(0, 3).join(" ");

          let imageHtml = '';

          if (Array.isArray(product.image)) {

            // Case 1: Direct array of URLs
            if (typeof product.image[0] === 'string') {
              imageHtml = product.image.slice(0, 2).map(src => `<img src="${src}" alt="${truncateTitle}">`).join('');
            }

            // Case 2: Array of objects with {color, url: []}
            else if (typeof product.image[0] === 'object' && Array.isArray(product.image[0].url)) {
              // Find the color that matches product.color (if exists) or take first
              const colorObj = product.image.find(img => img.color === product.color) || product.image[0];
              const urls = colorObj.url || [];
              imageHtml = urls.slice(0, 2).map(src => `<img src="${src}" alt="${truncateTitle}">`).join('');
            }

          }

          let hotDealStat = parseInt(product.off) > 20 ? `<span class="stat hot">hot</span>` : '';
          let dealStat = product.off ? `<span class="stat sale">-${product.off}</span>` : '';
          let topRateStat = product.rating > 4 ? `<span class="stat top">top</span>` : '';

          let colorHtml = product.colors && product.colors.length > 0
            ? `<ul class="colors-holder d-flex-r-c-c">
                                ${product.colors.slice(0, 5).map((proColor) => {
              let backgroundStyle = '';

              if (proColor.includes('x')) {
                const colorArray = proColor.split('x').map(c => c.trim());
                if (colorArray.length === 2) {
                  backgroundStyle = `radial-gradient(${colorArray[0]}, ${colorArray[1]})`;
                } else {
                  backgroundStyle = `radial-gradient(${colorArray.join(', ')})`;
                }
              } else {
                backgroundStyle = proColor;
              }

              return `<li class="circle-outer"><div class="color-circle" style="background:${backgroundStyle};"></div></li>`;
            }).join('')}
                            </ul>`
            : '';

          let filterDescription = product.description ? product.description.replace(/[-:,]/g, "") :
            product.aboutThisItem ? product.aboutThisItem.replace(/[-:,]/g, "") : '';

          let descriptionHtml = filterDescription ? `<p>${filterDescription.split(" ").slice(0, 4).join(" ")}...</p>` : '';

          let ratingHtml = '';
          if (product.rating) {
            for (let i = 1; i <= 5; i++) {
              if (i <= product.rating) {
                ratingHtml += `<i class="fas fa-star"></i>`;
              } else if (i - 0.5 === product.rating) {
                ratingHtml += `<i class="fas fa-star-half-alt"></i>`;
              } else {
                ratingHtml += `<i class="far fa-star"></i>`;
              }
            }
            ratingHtml = `<div class="ratings d-flex-r-st-st">${ratingHtml}</div>`
          }

          return `<div class="product-item">
                      <div class="image-holder d-flex-r-c-c">
                        ${imageHtml}
                      </div>
                      <div class="stats d-flex-c-st-st">
                        ${hotDealStat}
                        ${topRateStat}
                        ${dealStat}
                      </div>
                      <div class="icons d-flex-c-st-st">
                        <button type="button"><i class="far fa-heart" id="icon"></i></button>
                        <button type="button" class="add-to-cart-btn"><i class="fas fa-shopping-cart" id="icon"></i></button>
                        <button type="button"><i class="fas fa-eye" id="icon"></i></button>
                        <button type="button"><i class="fas fa-compress-alt" id="icon"></i></button>
                      </div>
                      <div class="content d-flex-c-st-st">
                        ${colorHtml}
                        <a href="single.html?id=${product.id}" class="product-title">${truncateTitle}</a>
                        ${descriptionHtml}
                        ${ratingHtml}
                        <div class="product-price d-flex-r-bt-c">
                          <strong class="oldprice">${product.price}</strong>
                          <strong class="price">${product.salePrice}</strong>
                        </div>
                      </div>
          </div>`

        }).join('');

        const siblingProductsBlock = document.createElement('div');
        siblingProductsBlock.classList.add('sibling-products-block');

        const siblingProductsContainer = document.createElement('div');
        siblingProductsContainer.classList.add('sibling-products-container');

        const siblingProductsWrapper = document.createElement('div');
        siblingProductsWrapper.classList.add('slider-wrapper');

        const siblingProductsHeading = document.createElement('div'); // block title
        siblingProductsHeading.classList.add('block-heading');

        const siblingProductsTitle = document.createElement('h3');
        siblingProductsTitle.classList.add('block-heading-title');

        siblingProductsTitle.textContent = 'related items';

        siblingProductsHeading.appendChild(siblingProductsTitle);
        siblingProductsContainer.appendChild(siblingProductsHeading);

        siblingProductsWrapper.innerHTML = siblingProductsHtml;
        siblingProductsContainer.appendChild(siblingProductsWrapper);
        siblingProductsBlock.appendChild(siblingProductsContainer);

        document.querySelector('#single-page .featured-products-container').appendChild(siblingProductsBlock);

        if (siblingProductsWrapper.children.length > 6) {

          siblingProductsWrapper.style.cssText = 'display:flex;margin:4rem auto 0;';

          siblingProductsContainer.innerHTML += `<div class="arrows">
                                                          <div class="arrow-left"><i class="fa fa-angle-left"></i></div>
                                                          <div class="arrow-right"><i class="fa fa-angle-right"></i></div>
                                                        </div>
                                                        <div id="sliderdots" class="d-flex-r-c-c"></div>`;

          countSliderFullScreen({
            section: '.sibling-products-block',
            containerSelector: '.sibling-products-block .slider-wrapper',
            dotsSelector: '.sibling-products-block #sliderdots',
            prevArrowSelector: '.sibling-products-block .arrow-left',
            nextArrowSelector: '.sibling-products-block .arrow-right',
          });

        } else {
          siblingProductsWrapper.style.display = 'grid';
          siblingProductsWrapper.style.gridTemplateColumns = 'repeat(auto-fill, minmax(190px, 1fr))';
        }
      }

      const bestSellerSiblingProducts = siblingProducts.filter(product => product.bought > 30);
      if (bestSellerSiblingProducts.length > 0) {

        let bestSellerSiblingProductsHtml = bestSellerSiblingProducts.map((product) => {

          let truncateTitle = product.title.split(" ").slice(0, 3).join(" ");

          let imageHtml = '';

          if (Array.isArray(product.image)) {

            if (typeof product.image[0] === 'string') {// Case 1: Direct array of URLs
              imageHtml = product.image.slice(0, 2).map(src => `<img src="${src}" alt="${truncateTitle}">`).join('');
            }

            else if (typeof product.image[0] === 'object' && Array.isArray(product.image[0].url)) {// Case 2: Array of objects with {color, url: []}
              // Find the color that matches product.color (if exists) or take first
              const colorObj = product.image.find(img => img.color === product.color) || product.image[0];
              const urls = colorObj.url || [];
              imageHtml = urls.slice(0, 2).map(src => `<img src="${src}" alt="${truncateTitle}">`).join('');
            }

          }

          let hotDealStat = parseInt(product.off) > 20 ? `<span class="stat hot">hot</span>` : '';
          let dealStat = product.off ? `<span class="stat sale">-${product.off}</span>` : '';
          let topRateStat = product.rating > 4 ? `<span class="stat top">top</span>` : '';

          let colorHtml = product.colors && product.colors.length > 0
            ? `<ul class="colors-holder d-flex-r-c-c">
                                ${product.colors.slice(0, 5).map((proColor) => {
                    let backgroundStyle = '';

                    if (proColor.includes('x')) {
                      const colorArray = proColor.split('x').map(c => c.trim());
                      if (colorArray.length === 2) {
                        backgroundStyle = `radial-gradient(${colorArray[0]}, ${colorArray[1]})`;
                      } else {
                        backgroundStyle = `radial-gradient(${colorArray.join(', ')})`;
                      }
                    } else {
                      backgroundStyle = proColor;
                    }

                    return `<li class="circle-outer"><div class="color-circle" style="background:${backgroundStyle};"></div></li>`;
                  }).join('')}
              </ul>`
            : '';

          let filterDescription = product.description ? product.description.replace(/[-:,]/g, "") :
            product.aboutThisItem ? product.aboutThisItem.replace(/[-:,]/g, "") : '';

          let descriptionHtml = filterDescription ? `<p>${filterDescription.split(" ").slice(0, 4).join(" ")}...</p>` : '';

          let ratingHtml = '';
          if (product.rating) {
            for (let i = 1; i <= 5; i++) {
              if (i <= product.rating) {
                ratingHtml += `<i class="fas fa-star"></i>`;
              } else if (i - 0.5 === product.rating) {
                ratingHtml += `<i class="fas fa-star-half-alt"></i>`;
              } else {
                ratingHtml += `<i class="far fa-star"></i>`;
              }
            }
            ratingHtml = `<div class="ratings d-flex-r-st-st">${ratingHtml}</div>`
          }

          return `<div class="product-item">
                      <div class="image-holder d-flex-r-c-c">
                        ${imageHtml}
                      </div>
                      <div class="stats d-flex-c-st-st">
                        ${hotDealStat}
                        ${topRateStat}
                        ${dealStat}
                      </div>
                      <div class="icons d-flex-c-st-st">
                        <button type="button"><i class="far fa-heart" id="icon"></i></button>
                        <button type="button" class="add-to-cart-btn"><i class="fas fa-shopping-cart" id="icon"></i></button>
                        <button type="button"><i class="fas fa-eye" id="icon"></i></button>
                        <button type="button"><i class="fas fa-compress-alt" id="icon"></i></button>
                      </div>
                      <div class="content d-flex-c-st-st">
                        ${colorHtml}
                        <a href="single.html?id=${product.id}" class="product-title">${truncateTitle}</a>
                        ${descriptionHtml}
                        ${ratingHtml}
                        <div class="product-price d-flex-r-bt-c">
                          <strong class="oldprice">${product.price}</strong>
                          <strong class="price">${product.salePrice}</strong>
                        </div>
                      </div>
            </div>`

        }).join('');

        const bestSellerSiblingProductsBlock = document.createElement('div');
        bestSellerSiblingProductsBlock.classList.add('best-seller-sibling-products-block');

        const bestSellerSiblingProductsContainer = document.createElement('div');
        bestSellerSiblingProductsContainer.classList.add('best-seller-sibling-products-container');

        const bestSellerSiblingProductsWrapper = document.createElement('div');
        bestSellerSiblingProductsWrapper.classList.add('slider-wrapper');

        const bestSellerSiblingProductsHeading = document.createElement('div'); // block title
        bestSellerSiblingProductsHeading.classList.add('block-heading');

        const bestSellerSiblingProductsTitle = document.createElement('h3');
        bestSellerSiblingProductsTitle.classList.add('block-heading-title');

        bestSellerSiblingProductsTitle.textContent = 'best seller';

        bestSellerSiblingProductsHeading.appendChild(bestSellerSiblingProductsTitle);
        bestSellerSiblingProductsContainer.appendChild(bestSellerSiblingProductsHeading);

        bestSellerSiblingProductsWrapper.innerHTML = bestSellerSiblingProductsHtml;
        bestSellerSiblingProductsContainer.appendChild(bestSellerSiblingProductsWrapper);
        bestSellerSiblingProductsBlock.appendChild(bestSellerSiblingProductsContainer);

        document.querySelector('#single-page .featured-products-container').appendChild(bestSellerSiblingProductsBlock);

        if (bestSellerSiblingProductsWrapper.children.length > 6) {

          bestSellerSiblingProductsWrapper.style.cssText = 'display:flex;margin:4rem auto 0;';

          bestSellerSiblingProductsContainer.innerHTML += `<div class="arrows">
                                                                  <div class="arrow-left"><i class="fa fa-angle-left"></i></div>
                                                                  <div class="arrow-right"><i class="fa fa-angle-right"></i></div>
                                                                </div>
                                                                <div id="sliderdots" class="d-flex-r-c-c"></div>`;

          countSliderFullScreen({
            section: '.best-seller-sibling-products-block',
            containerSelector: '.best-seller-sibling-products-block .slider-wrapper',
            dotsSelector: '.best-seller-sibling-products-block #sliderdots',
            prevArrowSelector: '.best-seller-sibling-products-block .arrow-left',
            nextArrowSelector: '.best-seller-sibling-products-block .arrow-right',
          });

        } else {
          bestSellerSiblingProductsWrapper.style.display = 'grid';
          bestSellerSiblingProductsWrapper.style.gridTemplateColumns = 'repeat(auto-fill, minmax(190px, 1fr))';
        }
      }

      const topRatedsiblingProducts = siblingProducts.filter(product => product.rating > 4);
      if (topRatedsiblingProducts.length > 0) {

        let topRatedsiblingProductsHtml = topRatedsiblingProducts.map((product) => {

          let truncateTitle = product.title.split(" ").slice(0, 3).join(" ");

          let imageHtml = '';

          if (Array.isArray(product.image)) {

            if (typeof product.image[0] === 'string') {// Case 1: Direct array of URLs
              imageHtml = product.image.slice(0, 2).map(src => `<img src="${src}" alt="${truncateTitle}">`).join('');
            }

            else if (typeof product.image[0] === 'object' && Array.isArray(product.image[0].url)) {// Case 2: Array of objects with {color, url: []}
              // Find the color that matches product.color (if exists) or take first
              const colorObj = product.image.find(img => img.color === product.color) || product.image[0];
              const urls = colorObj.url || [];
              imageHtml = urls.slice(0, 2).map(src => `<img src="${src}" alt="${truncateTitle}">`).join('');
            }

          }

          let hotDealStat = parseInt(product.off) > 20 ? `<span class="stat hot">hot</span>` : '';
          let dealStat = product.off ? `<span class="stat sale">-${product.off}</span>` : '';
          let topRateStat = product.rating > 4 ? `<span class="stat top">top</span>` : '';

          let colorHtml = product.colors && product.colors.length > 0
            ? `<ul class="colors-holder d-flex-r-c-c">
                                ${product.colors.slice(0, 5).map((proColor) => {
              let backgroundStyle = '';

              if (proColor.includes('x')) {
                const colorArray = proColor.split('x').map(c => c.trim());
                if (colorArray.length === 2) {
                  backgroundStyle = `radial-gradient(${colorArray[0]}, ${colorArray[1]})`;
                } else {
                  backgroundStyle = `radial-gradient(${colorArray.join(', ')})`;
                }
              } else {
                backgroundStyle = proColor;
              }

              return `<li class="circle-outer"><div class="color-circle" style="background:${backgroundStyle};"></div></li>`;
            }).join('')}
                            </ul>`
            : '';

          let filterDescription = product.description ? product.description.replace(/[-:,]/g, "") :
            product.aboutThisItem ? product.aboutThisItem.replace(/[-:,]/g, "") : '';

          let descriptionHtml = filterDescription ? `<p>${filterDescription.split(" ").slice(0, 4).join(" ")}...</p>` : '';

          let ratingHtml = '';
          if (product.rating) {
            for (let i = 1; i <= 5; i++) {
              if (i <= product.rating) {
                ratingHtml += `<i class="fas fa-star"></i>`;
              } else if (i - 0.5 === product.rating) {
                ratingHtml += `<i class="fas fa-star-half-alt"></i>`;
              } else {
                ratingHtml += `<i class="far fa-star"></i>`;
              }
            }
            ratingHtml = `<div class="ratings d-flex-r-st-st">${ratingHtml}</div>`
          }

          return `<div class="product-item">
                      <div class="image-holder d-flex-r-c-c">
                        ${imageHtml}
                      </div>
                      <div class="stats d-flex-c-st-st">
                        ${hotDealStat}
                        ${topRateStat}
                        ${dealStat}
                      </div>
                      <div class="icons d-flex-c-st-st">
                        <button type="button"><i class="far fa-heart" id="icon"></i></button>
                        <button type="button" class="add-to-cart-btn"><i class="fas fa-shopping-cart" id="icon"></i></button>
                        <button type="button"><i class="fas fa-eye" id="icon"></i></button>
                        <button type="button"><i class="fas fa-compress-alt" id="icon"></i></button>
                      </div>
                      <div class="content d-flex-c-st-st">
                        ${colorHtml}
                        <a href="single.html?id=${product.id}" class="product-title">${truncateTitle}</a>
                        ${descriptionHtml}
                        ${ratingHtml}
                        <div class="product-price d-flex-r-bt-c">
                          <strong class="oldprice">${product.price}</strong>
                          <strong class="price">${product.salePrice}</strong>
                        </div>
                      </div>
            </div>`

        }).join('');

        const topRatedsiblingProductsBlock = document.createElement('div');
        topRatedsiblingProductsBlock.classList.add('top-rated-sibling-products-block');

        const topRatedsiblingProductsContainer = document.createElement('div');
        topRatedsiblingProductsContainer.classList.add('top-rated-sibling-products-container');

        const topRatedsiblingProductsWrapper = document.createElement('div');
        topRatedsiblingProductsWrapper.classList.add('slider-wrapper');

        const topRatedsiblingProductsHeading = document.createElement('div'); // block title
        topRatedsiblingProductsHeading.classList.add('block-heading');

        const topRatedsiblingProductsTitle = document.createElement('h3');
        topRatedsiblingProductsTitle.classList.add('block-heading-title');

        topRatedsiblingProductsTitle.textContent = 'top rated';

        topRatedsiblingProductsHeading.appendChild(topRatedsiblingProductsTitle);
        topRatedsiblingProductsContainer.appendChild(topRatedsiblingProductsHeading);

        topRatedsiblingProductsWrapper.innerHTML = topRatedsiblingProductsHtml;
        topRatedsiblingProductsContainer.appendChild(topRatedsiblingProductsWrapper);
        topRatedsiblingProductsBlock.appendChild(topRatedsiblingProductsContainer);

        document.querySelector('#single-page .featured-products-container').appendChild(topRatedsiblingProductsBlock);

        if (topRatedsiblingProductsWrapper.children.length > 6) {

          topRatedsiblingProductsWrapper.style.cssText = 'display:flex;margin:4rem auto 0;';

          topRatedsiblingProductsContainer.innerHTML += `<div class="arrows">
                                                                  <div class="arrow-left"><i class="fa fa-angle-left"></i></div>
                                                                  <div class="arrow-right"><i class="fa fa-angle-right"></i></div>
                                                                </div>
                                                                <div id="sliderdots" class="d-flex-r-c-c"></div>`;

          countSliderFullScreen({
            section: '.top-rated-sibling-products-block',
            containerSelector: '.top-rated-sibling-products-block .slider-wrapper',
            dotsSelector: '.top-rated-sibling-products-block #sliderdots',
            prevArrowSelector: '.top-rated-sibling-products-block .arrow-left',
            nextArrowSelector: '.top-rated-sibling-products-block .arrow-right',
          });

        } else {
          topRatedsiblingProductsWrapper.style.display = 'grid';
          topRatedsiblingProductsWrapper.style.gridTemplateColumns = 'repeat(auto-fill, minmax(190px, 1fr))';
        }
      }

      const highViewedSiblingProducts = siblingProducts.filter(product => product.viewed > 100);
      if (highViewedSiblingProducts.length > 0) {

        let highViewedSiblingProductsHtml = highViewedSiblingProducts.map((product) => {

          let truncateTitle = product.title.split(" ").slice(0, 3).join(" ");

          let imageHtml = '';

          if (Array.isArray(product.image)) {

            if (typeof product.image[0] === 'string') {// Case 1: Direct array of URLs
              imageHtml = product.image.slice(0, 2).map(src => `<img src="${src}" alt="${truncateTitle}">`).join('');
            }

            else if (typeof product.image[0] === 'object' && Array.isArray(product.image[0].url)) {// Case 2: Array of objects with {color, url: []}
              // Find the color that matches product.color (if exists) or take first
              const colorObj = product.image.find(img => img.color === product.color) || product.image[0];
              const urls = colorObj.url || [];
              imageHtml = urls.slice(0, 2).map(src => `<img src="${src}" alt="${truncateTitle}">`).join('');
            }

          }

          let hotDealStat = parseInt(product.off) > 20 ? `<span class="stat hot">hot</span>` : '';
          let dealStat = product.off ? `<span class="stat sale">-${product.off}</span>` : '';
          let topRateStat = product.rating > 4 ? `<span class="stat top">top</span>` : '';

          let colorHtml = product.colors && product.colors.length > 0
            ? `<ul class="colors-holder d-flex-r-c-c">
                                ${product.colors.slice(0, 5).map((proColor) => {
              let backgroundStyle = '';

              if (proColor.includes('x')) {
                const colorArray = proColor.split('x').map(c => c.trim());
                if (colorArray.length === 2) {
                  backgroundStyle = `radial-gradient(${colorArray[0]}, ${colorArray[1]})`;
                } else {
                  backgroundStyle = `radial-gradient(${colorArray.join(', ')})`;
                }
              } else {
                backgroundStyle = proColor;
              }

              return `<li class="circle-outer"><div class="color-circle" style="background:${backgroundStyle};"></div></li>`;
            }).join('')}
                            </ul>`
            : '';

          let filterDescription = product.description ? product.description.replace(/[-:,]/g, "") :
            product.aboutThisItem ? product.aboutThisItem.replace(/[-:,]/g, "") : '';

          let descriptionHtml = filterDescription ? `<p>${filterDescription.split(" ").slice(0, 4).join(" ")}...</p>` : '';

          let ratingHtml = '';
          if (product.rating) {
            for (let i = 1; i <= 5; i++) {
              if (i <= product.rating) {
                ratingHtml += `<i class="fas fa-star"></i>`;
              } else if (i - 0.5 === product.rating) {
                ratingHtml += `<i class="fas fa-star-half-alt"></i>`;
              } else {
                ratingHtml += `<i class="far fa-star"></i>`;
              }
            }
            ratingHtml = `<div class="ratings d-flex-r-st-st">${ratingHtml}</div>`
          }

          return `<div class="product-item">
                      <div class="image-holder d-flex-r-c-c">
                        ${imageHtml}
                      </div>
                      <div class="stats d-flex-c-st-st">
                        ${hotDealStat}
                        ${topRateStat}
                        ${dealStat}
                      </div>
                      <div class="icons d-flex-c-st-st">
                        <button type="button"><i class="far fa-heart" id="icon"></i></button>
                        <button type="button" class="add-to-cart-btn"><i class="fas fa-shopping-cart" id="icon"></i></button>
                        <button type="button"><i class="fas fa-eye" id="icon"></i></button>
                        <button type="button"><i class="fas fa-compress-alt" id="icon"></i></button>
                      </div>
                      <div class="content d-flex-c-st-st">
                        ${colorHtml}
                        <a href="single.html?id=${product.id}" class="product-title">${truncateTitle}</a>
                        ${descriptionHtml}
                        ${ratingHtml}
                        <div class="product-price d-flex-r-bt-c">
                          <strong class="oldprice">${product.price}</strong>
                          <strong class="price">${product.salePrice}</strong>
                        </div>
                      </div>
            </div>`

        }).join('');

        const highViewedSiblingProductsBlock = document.createElement('div');
        highViewedSiblingProductsBlock.classList.add('high-viewed-sibling-products-block');

        const highViewedSiblingProductsContainer = document.createElement('div');
        highViewedSiblingProductsContainer.classList.add('high-viewed-sibling-products-container');

        const highViewedSiblingProductsWrapper = document.createElement('div');
        highViewedSiblingProductsWrapper.classList.add('slider-wrapper');

        const highViewedSiblingProductsHeading = document.createElement('div'); // block title
        highViewedSiblingProductsHeading.classList.add('block-heading');

        const highViewedSiblingProductsTitle = document.createElement('h3');
        highViewedSiblingProductsTitle.classList.add('block-heading-title');

        highViewedSiblingProductsTitle.textContent = 'customers viewed related items';

        highViewedSiblingProductsHeading.appendChild(highViewedSiblingProductsTitle);
        highViewedSiblingProductsContainer.appendChild(highViewedSiblingProductsHeading);

        highViewedSiblingProductsWrapper.innerHTML = highViewedSiblingProductsHtml;
        highViewedSiblingProductsContainer.appendChild(highViewedSiblingProductsWrapper);
        highViewedSiblingProductsBlock.appendChild(highViewedSiblingProductsContainer);

        document.querySelector('#single-page .featured-products-container').appendChild(highViewedSiblingProductsBlock);

        if (highViewedSiblingProductsWrapper.children.length > 6) {

          highViewedSiblingProductsWrapper.style.cssText = 'display:flex;margin:4rem auto 0;';

          highViewedSiblingProductsContainer.innerHTML += `<div class="arrows">
                                                                  <div class="arrow-left"><i class="fa fa-angle-left"></i></div>
                                                                  <div class="arrow-right"><i class="fa fa-angle-right"></i></div>
                                                                </div>
                                                                <div id="sliderdots" class="d-flex-r-c-c"></div>`;

          countSliderFullScreen({
            section: '.high-viewed-sibling-products-block',
            containerSelector: '.high-viewed-sibling-products-block .slider-wrapper',
            dotsSelector: '.high-viewed-sibling-products-block #sliderdots',
            prevArrowSelector: '.high-viewed-sibling-products-block .arrow-left',
            nextArrowSelector: '.high-viewed-sibling-products-block .arrow-right',
          });

        } else {
          highViewedSiblingProductsWrapper.style.display = 'grid';
          highViewedSiblingProductsWrapper.style.gridTemplateColumns = 'repeat(auto-fill, minmax(190px, 1fr))';
        }
      }

      if (siblingCategoriesProducts.length > 0) {

        let siblingCategoriesProductsHtml = siblingCategoriesProducts.map((product) => {

          let truncateTitle = product.title.split(" ").slice(0, 3).join(" ");

          let imageHtml = '';

          if (Array.isArray(product.image)) {

            if (typeof product.image[0] === 'string') {// Case 1: Direct array of URLs
              imageHtml = product.image.slice(0, 2).map(src => `<img src="${src}" alt="${truncateTitle}">`).join('');
            }

            else if (typeof product.image[0] === 'object' && Array.isArray(product.image[0].url)) {// Case 2: Array of objects with {color, url: []}
              // Find the color that matches product.color (if exists) or take first
              const colorObj = product.image.find(img => img.color === product.color) || product.image[0];
              const urls = colorObj.url || [];
              imageHtml = urls.slice(0, 2).map(src => `<img src="${src}" alt="${truncateTitle}">`).join('');
            }

          }

          let hotDealStat = parseInt(product.off) > 20 ? `<span class="stat hot">hot</span>` : '';
          let dealStat = product.off ? `<span class="stat sale">-${product.off}</span>` : '';
          let topRateStat = product.rating > 4 ? `<span class="stat top">top</span>` : '';

          let colorHtml = product.colors && product.colors.length > 0
            ? `<ul class="colors-holder d-flex-r-c-c">
                                ${product.colors.slice(0, 5).map((proColor) => {
              let backgroundStyle = '';

              if (proColor.includes('x')) {
                const colorArray = proColor.split('x').map(c => c.trim());
                if (colorArray.length === 2) {
                  backgroundStyle = `radial-gradient(${colorArray[0]}, ${colorArray[1]})`;
                } else {
                  backgroundStyle = `radial-gradient(${colorArray.join(', ')})`;
                }
              } else {
                backgroundStyle = proColor;
              }

              return `<li class="circle-outer"><div class="color-circle" style="background:${backgroundStyle};"></div></li>`;
            }).join('')}
                            </ul>`
            : '';

          let filterDescription = product.description ? product.description.replace(/[-:,]/g, "") :
            product.aboutThisItem ? product.aboutThisItem.replace(/[-:,]/g, "") : '';

          let descriptionHtml = filterDescription ? `<p>${filterDescription.split(" ").slice(0, 4).join(" ")}...</p>` : '';

          let ratingHtml = '';
          if (product.rating) {
            for (let i = 1; i <= 5; i++) {
              if (i <= product.rating) {
                ratingHtml += `<i class="fas fa-star"></i>`;
              } else if (i - 0.5 === product.rating) {
                ratingHtml += `<i class="fas fa-star-half-alt"></i>`;
              } else {
                ratingHtml += `<i class="far fa-star"></i>`;
              }
            }
            ratingHtml = `<div class="ratings d-flex-r-st-st">${ratingHtml}</div>`
          }

          return `<div class="product-item">
                      <div class="image-holder d-flex-r-c-c">
                        ${imageHtml}
                      </div>
                      <div class="stats d-flex-c-st-st">
                        ${hotDealStat}
                        ${topRateStat}
                        ${dealStat}
                      </div>
                      <div class="icons d-flex-c-st-st">
                        <button type="button"><i class="far fa-heart" id="icon"></i></button>
                        <button type="button" class="add-to-cart-btn"><i class="fas fa-shopping-cart" id="icon"></i></button>
                        <button type="button"><i class="fas fa-eye" id="icon"></i></button>
                        <button type="button"><i class="fas fa-compress-alt" id="icon"></i></button>
                      </div>
                      <div class="content d-flex-c-st-st">
                        ${colorHtml}
                        <a href="single.html?id=${product.id}" class="product-title">${truncateTitle}</a>
                        ${descriptionHtml}
                        ${ratingHtml}
                        <div class="product-price d-flex-r-bt-c">
                          <strong class="oldprice">${product.price}</strong>
                          <strong class="price">${product.salePrice}</strong>
                        </div>
                      </div>
            </div>`

        }).join('');

        const siblingCategoriesProductsBlock = document.createElement('div');
        siblingCategoriesProductsBlock.classList.add('sibling-categories-products-block');

        const siblingCategoriesProductsContainer = document.createElement('div');
        siblingCategoriesProductsContainer.classList.add('sibling-categories-products-container');

        const siblingCategoriesProductsWrapper = document.createElement('div');
        siblingCategoriesProductsWrapper.classList.add('slider-wrapper');

        const siblingCategoriesProductsHeading = document.createElement('div'); // block title
        siblingCategoriesProductsHeading.classList.add('block-heading');

        const siblingCategoriesProductsTitle = document.createElement('h3');
        siblingCategoriesProductsTitle.classList.add('block-heading-title');

        siblingCategoriesProductsTitle.textContent = 'recommended for you';

        siblingCategoriesProductsHeading.appendChild(siblingCategoriesProductsTitle);
        siblingCategoriesProductsContainer.appendChild(siblingCategoriesProductsHeading);

        siblingCategoriesProductsWrapper.innerHTML = siblingCategoriesProductsHtml;
        siblingCategoriesProductsContainer.appendChild(siblingCategoriesProductsWrapper);
        siblingCategoriesProductsBlock.appendChild(siblingCategoriesProductsContainer);

        document.querySelector('#single-page .featured-products-container').appendChild(siblingCategoriesProductsBlock);

        if (siblingCategoriesProductsWrapper.children.length > 6) {

          siblingCategoriesProductsWrapper.style.cssText = 'display:flex;margin:4rem auto !important;';

          siblingCategoriesProductsContainer.innerHTML += `<div class="arrows">
                                                                  <div class="arrow-left"><i class="fa fa-angle-left"></i></div>
                                                                  <div class="arrow-right"><i class="fa fa-angle-right"></i></div>
                                                                </div>
                                                                <div id="sliderdots" class="d-flex-r-c-c"></div>`;

          countSliderFullScreen({
            section: '.sibling-categories-products-block',
            containerSelector: '.sibling-categories-products-block .slider-wrapper',
            dotsSelector: '.sibling-categories-products-block #sliderdots',
            prevArrowSelector: '.sibling-categories-products-block .arrow-left',
            nextArrowSelector: '.sibling-categories-products-block .arrow-right',
          });

        } else {
          siblingCategoriesProductsWrapper.style.display = 'grid';
          siblingCategoriesProductsWrapper.style.gridTemplateColumns = 'repeat(auto-fill, minmax(190px, 1fr))';
        }
      }

      const productImages = document.querySelectorAll('.image-holder img');
      productImages.forEach(function (img) {
        const clonedImage = img.cloneNode();
        removeBackground(clonedImage, '#ffffff');
        img.parentNode.replaceChild(clonedImage, img);
      });

      document.querySelectorAll(".product-item").forEach((item) => {
        const addToCartBtn = item.querySelector('.add-to-cart-btn');

        if (addToCartBtn) {

          addToCartBtn.addEventListener('click', async function () {

            const hrefTitle = item.querySelector('.product-title').getAttribute('href');

            if (hrefTitle.includes('=')) {
              const productId = hrefTitle.split('=')[1];

              const product = await loadProduct(productId);

              const productBox = {
                id: product.id,
                title: product.title,
                image: product.image[0],
                brand: product.brand ? product.brand : null,
                stock: product.instock,
                oldPrice: product.price,
                salePrice: product.salePrice,
                size: product.size ? product.size : null,
                color: product.color ? product.color : null,
                quantity: 1,
              }

              const productCart = JSON.parse(localStorage.getItem('ecommerce2-product-cart')) || [];

              const existingProductIndex = productCart.findIndex((item) => item.id === productBox.id);

              if (existingProductIndex > -1) {
                productCart[existingProductIndex] = productBox;
                alert('product updated to the cart');
              } else {
                productCart.push(productBox);
                alert('product added to the cart');
              }

              localStorage.setItem('ecommerce2-product-cart', JSON.stringify(productCart));
            } else {
              console.error('Invalid product link');
            }

          });

        }
      });

    } catch (error) {
      console.error('Failed to get products');
    }
  }

  displayParentCategories();

  displayFeaturedProducts();


  function fetchProduct(productId) {
    fetch('../database/products.json').then(response => response.json())
      .then(data => {
        const product = data.products.find(p => p.id == productId);
        if (product) {
          displayProductDetails(product);
        } else {
          document.querySelector("#single-page .product-container");
        }
      })
      .catch(error => {
        console.error('Error fetching the product data:', error);
        document.querySelector("#single-page .product-container").innerHTML = 'Error loading product';
      });
  }

  if (getProductId()) {
    fetchProduct(getProductId());
  } else {
    document.querySelector("#single-page .product-container").innerHTML = 'no product to view';
  }

  function displayProductDetails(product) {
    const productContainer = document.querySelector("#single-page .product-container");

    const smallImagesHolder = productContainer.querySelector(".left-block .small-images-holder");
    const bigImage = productContainer.querySelector(".left-block .big-image-holder img");
    const colorsHolder = productContainer.querySelector(".right-block .content .colors-holder");
    const selectedColor = productContainer.querySelector(".right-block .color-block #selected-color");

    smallImagesHolder.innerHTML = '';
    colorsHolder.innerHTML = '';

    if (product.title) { productContainer.querySelector(".right-block .content h1").textContent = product.title }
    if (product.id) { productContainer.querySelector(".right-block .content .description-block .id").textContent = product.id }

    if (product.description) {
      productContainer.querySelector(".right-block .content .description-block .description").textContent = product.description;
    } else {
      productContainer.querySelector(".right-block .content .description-block").style.display = "none";
    }

    if (product.brand) {
      productContainer.querySelector(".right-block .content .brand .brand-value").textContent = product.brand;
    } else {
      productContainer.querySelector(".right-block .content .brand").style.display = 'none';
    }

    if (product.instock) { productContainer.querySelector(".right-block .content .instock").textContent = product.instock; }
    if (product.aboutThisItem) {
      productContainer.querySelector(".right-block .content .about-item-block .about-this-item").textContent = product.aboutThisItem;
    } else {
      productContainer.querySelector(".right-block .content .about-item-block").style.display = "none";
    }

    if (product.price) { productContainer.querySelector(".right-block .content .oldprice").textContent = product.price; }
    if (product.salePrice) { productContainer.querySelector(".right-block .content .price").textContent = product.salePrice; }

    const sizeBlock = productContainer.querySelector(".right-block .content .size-block");
    const sizeElement = sizeBlock.querySelector(".size .size-value");
    const sizesContainer = sizeBlock.querySelector(".sizes");

    let hasSize = product.size || product.screenSize;
    let hasSizes = product.sizes && Array.isArray(product.sizes) && product.sizes.length > 0;

    if (hasSize) { sizeElement.textContent = product.size || product.screenSize } else { sizeElement.parentElement.style.display = 'none'; }

    if (hasSizes) {
      sizesContainer.innerHTML = '';
      product.sizes.forEach((size) => {
        sizesContainer.innerHTML += `<span>${size}</span>`;
      });
    } else {
      sizesContainer.style.display = 'none';
    }

    if (!hasSize && !hasSizes) { sizeBlock.style.display = 'none'; } else { sizeBlock.style.display = 'flex'; }

    if (product.color) { selectedColor.textContent = product.color; }

    const attachFlippingImages = () => {
      const smallImages = smallImagesHolder.querySelectorAll('.small-img');
      smallImages.forEach((img) => {
        img.addEventListener('click', () => {
          bigImage.src = img.src;
        });
      });
    };

    if (product.image && Array.isArray(product.image)) {
      const firstItem = product.image[0];

      if (typeof firstItem === "string") {
        product.image.forEach((img) => {
          smallImagesHolder.innerHTML += `
                <div class="small-image">
                  <img src="${img}" class="small-img" alt="${product.title}">
                </div>`;
        });
        bigImage.src = product.image[0];

      } else if (typeof firstItem === "object" && Array.isArray(firstItem.url)) {

        firstItem.url.forEach((img) => {
          smallImagesHolder.innerHTML += `
              <div class="small-image">
                <img src="${img}" class="small-img" alt="${product.title}">
              </div>`;
        });

        bigImage.src = firstItem.url[0];

        product.image.forEach((object) => {
          if (object.url && Array.isArray(object.url) && object.url.length > 0) {
            const colorThumb = document.createElement("div");
            colorThumb.className = "color-thumb";
            colorThumb.title = object.color;
            colorThumb.innerHTML = `
                  <img src="${object.url[0]}" alt="${product.title}">
                  <span class="color-name">${object.color}</span>
                `;
            colorsHolder.appendChild(colorThumb);

            colorThumb.addEventListener("click", () => {
              const colorName = object.color;
              selectedColor.textContent = colorName;

              colorsHolder.querySelectorAll("img").forEach(img => {
                img.style.border = '1.7px solid var(--gray6)';
                img.style.borderRadius = '';
              });

              const img = colorThumb.querySelector("img");
              const firstColor = colorName.split('x')[0].trim().toLowerCase();
              img.style.border = `1.5px solid ${firstColor}`;
              img.style.borderRadius = '0.2rem';

              smallImagesHolder.innerHTML = '';
              object.url.forEach((imgUrl) => {
                smallImagesHolder.innerHTML += `
                      <div class="small-image">
                        <img src="${imgUrl}" class="small-img" alt="${product.title}">
                      </div>`;
              });

              bigImage.src = object.url[0];
              attachFlippingImages();
            });
          }
        });
      }
    }

    attachFlippingImages();

    productContainer.querySelector(".right-block .content .product-quantity-block #subtotal").textContent = product.salePrice;

    magnify(document.querySelector('#single-page .product-container .left-block .big-image-holder img'));
    flippingSizes();
    handleQuantity();
    addToCart();
  }

  function magnify(bigImage) {
    const lens = document.querySelector('#single-page .product-container .left-block .big-image-holder .lens');
    const magnifierImage = document.querySelector('#single-page .product-container .right-block .content .magnifier-img');

    if (bigImage && lens && magnifierImage) {
      lens.addEventListener('mousemove', (e) => moveLens(e, bigImage, lens, magnifierImage));
      bigImage.addEventListener('mousemove', (e) => moveLens(e, bigImage, lens, magnifierImage));
      bigImage.addEventListener('mouseout', () => leaveLens(lens, magnifierImage));
    }
  }

  function moveLens(e, bigImage, lens, magnifierImage) {
    const bigImageRect = bigImage.getBoundingClientRect();
    let x = e.pageX - bigImageRect.left - lens.offsetWidth / 2;
    let y = e.pageY - bigImageRect.top - lens.offsetHeight / 2;

    x = Math.max(0, Math.min(x, bigImageRect.width - lens.offsetWidth));
    y = Math.max(0, Math.min(y, bigImageRect.height - lens.offsetHeight));

    lens.style.left = `${x}px`;
    lens.style.top = `${y}px`;

    const cx = magnifierImage.offsetWidth / lens.offsetWidth;
    const cy = magnifierImage.offsetHeight / lens.offsetHeight;

    magnifierImage.style.backgroundImage = `url('${bigImage.src}')`;
    magnifierImage.style.backgroundPosition = `-${x * cx}px -${y * cy}px`;
    magnifierImage.style.backgroundSize = `${bigImageRect.width * cx}px ${bigImageRect.height * cy}px`;

    lens.classList.add('active');
    magnifierImage.classList.add('active');
  }

  function leaveLens(lens, magnifierImage) {
    lens.classList.remove('active');
    magnifierImage.classList.remove('active');
  }

  function flippingSizes() {
    document.querySelectorAll("#single-page .size-block .sizes span").forEach((size) => {
      size.addEventListener('click', function () {
        document.querySelector("#single-page .size-block .size .size-value").textContent = size.textContent;
      });
    });
  }

  function handleQuantity() {
    const maxQuantity = parseInt(document.querySelector(".product-container .right-block .instock").textContent);
    const productPrice = parseFloat(document.querySelector(".product-container .right-block .product-price .price").textContent.replace('$', '').trim());
    const decreaseQuantityBtn = document.querySelector(".product-container .right-block .product-quantity-block .decrease-quantity-btn");
    const increaseQuantityBtn = document.querySelector(".product-container .right-block .product-quantity-block .increase-quantity-btn");
    const proQuantityElement = document.querySelector(".product-container .right-block .product-quantity-block #pro-quantity-no");
    const subtotalElement = document.querySelector(".product-container .right-block .product-quantity-block #subtotal");

    let proQuantityNumber = parseInt(proQuantityElement.textContent.trim());

    decreaseQuantityBtn.addEventListener('click', () => {
      if (proQuantityNumber > 1) {
        proQuantityNumber -= 1;
        proQuantityElement.textContent = proQuantityNumber;
        subtotalElement.textContent = `$${(proQuantityNumber * productPrice).toFixed(2)}`;
      }
    });

    increaseQuantityBtn.addEventListener('click', () => {
      if (proQuantityNumber < maxQuantity) {
        proQuantityNumber += 1;
        proQuantityElement.textContent = proQuantityNumber;
        subtotalElement.textContent = `$${(proQuantityNumber * productPrice).toFixed(2)}`;
      }
    });
  }

  function addToCart() {

    document.querySelector("#single-page .product-container .right-block .add-to-cart-btn").addEventListener('click', function () {
      const singlepProductContainer = document.querySelector("#single-page .product-container");

      const safeTextContent = (selector) => {
        const element = singlepProductContainer.querySelector(selector);
        return element ? element.textContent.trim() : '';
      };

      const safeGetAttribute = (selector, attr) => {
        const element = singlepProductContainer.querySelector(selector);
        return element ? element.getAttribute(attr) : '';
      };

      const productIdV = safeTextContent('.id');
      const productTitleV = safeTextContent('h1');
      const productImageV = safeGetAttribute(".big-image-holder img", 'src');
      const productBrandV = safeTextContent('.brand-value') || '';
      const productStockV = safeTextContent('.instock');
      const oldPriceV = safeTextContent('.oldprice');
      const salePriceV = safeTextContent('.price');
      const sizeV = safeTextContent('.size-value') || '';
      const colorV = safeTextContent('#selected-color');
      const quantityV = safeTextContent('#pro-quantity-no');

      const product = {
        id: productIdV,
        title: productTitleV,
        image: productImageV,
        brand: productBrandV,
        stock: productStockV,
        oldPrice: oldPriceV,
        salePrice: salePriceV,
        size: sizeV,
        color: colorV,
        quantity: quantityV
      };

      let productCart = JSON.parse(localStorage.getItem('ecommerce2-product-cart')) || [];

      const existingProductIndex = productCart.findIndex(item => item.id === product.id);

      if (existingProductIndex > -1) {
        productCart[existingProductIndex] = product;
        alert('Product updated in cart');
      } else {
        productCart.push(product);
        alert('Product added to cart');
      }

      localStorage.setItem('ecommerce2-product-cart', JSON.stringify(productCart));
    });

  }

}

/*
 ######################
 ####### GLOBAL #######
 ######################
*/
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
    updateSlidesToShow();
  }

  function setResponsive() {
    const responsiveSettings = [
      { breakpoint: 10, settings: { slidesToShow: 1, slidesToScroll: 1 } },
      { breakpoint: 360, settings: { slidesToShow: 2, slidesToScroll: 2 } },
      { breakpoint: 560, settings: { slidesToShow: 3, slidesToScroll: 3 } },
      { breakpoint: 720, settings: { slidesToShow: 4, slidesToScroll: 4 } },
      { breakpoint: 1000, settings: { slidesToShow: 5, slidesToScroll: 5 } },
      { breakpoint: 1400, settings: { slidesToShow: 6, slidesToScroll: 6 } },
      { breakpoint: 1600, settings: { slidesToShow: 7, slidesToScroll: 7 } }
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

    animateScroll(sliderContainer.scrollLeft, scrollPosition, 900);

    if (currentIndex >= slides.length) {
      currentIndex = 0;
      sliderContainer.scrollTo({ left: 0 });
    }
  }

  function prevSlide() {
    const maxIndex = slides.length - slidesToShow;

    if (currentIndex <= 0) {
        currentIndex = maxIndex;
    } else {
      currentIndex = Math.max(currentIndex - slidesToScroll, 0);
    }

    scrollToSlide();
  }

  function nextSlide() {
    const maxIndex = slides.length - slidesToShow;

    if (currentIndex >= maxIndex) {
        currentIndex = 0;
    } else {
      currentIndex = Math.min(
        currentIndex + slidesToScroll,
        maxIndex
      );
    }

    scrollToSlide();
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

function animatedFilterWithTabsAndArrows(tabs, groups, prevBtn, nextBtn) {
  tabs = Array.from(tabs);
  groups = Array.from(groups);

  let visibleCount = 8;
  let pageIndexes = {};
  let currentGroup = null;

  function paginate(group, page) {
    const productItems = Array.from(group.querySelectorAll('.product-item'));
    const totalPages = Math.ceil(productItems.length / visibleCount);
    page = Math.max(0, Math.min(page, totalPages - 1));

    const key = group.classList[1];
    pageIndexes[key] = page;

    productItems.forEach((item, i) => {
      item.classList.remove('show');
      item.style.display = 'none';

      if (i >= page * visibleCount && i < (page + 1) * visibleCount) {
        item.style.display = 'block';
        item.style.opacity = "0";
        item.style.transform = "scale(0.8) translateY(20px)";
        item.style.transition = "none";
        void item.offsetWidth; // force reflow

        setTimeout(() => {
          item.style.transition = "all 0.3s ease";
          item.style.opacity = "1";
          item.style.transform = "scale(1) translateY(0)";
        }, (i % visibleCount) * 40);
      }

    });

    prevBtn.disabled = page === 0;
    nextBtn.disabled = page === totalPages - 1;
  }

  function showGroup(filterClass) {
    groups.forEach(group => {
      const isActive = group.classList.contains(filterClass);
      group.classList.toggle('item-active', isActive);

      if (isActive) {
        currentGroup = group;
        const key = group.classList[1];
        if (!(key in pageIndexes)) pageIndexes[key] = 0;
        paginate(group, pageIndexes[key]);
      }
    });
  }

  // Initial setup
  tabs[0].classList.add('button-active');
  showGroup(tabs[0].getAttribute('filter-click'));

  tabs.forEach(tab => {
    tab.addEventListener('click', function () {
      tabs.forEach(t => t.classList.remove('button-active'));
      this.classList.add('button-active');
      const filterClass = this.getAttribute('filter-click');
      showGroup(filterClass);
    });
  });

  prevBtn.addEventListener('click', () => {
    if (currentGroup) {
      const key = currentGroup.classList[1];
      paginate(currentGroup, pageIndexes[key] - 1);
    }
  });

  nextBtn.addEventListener('click', () => {
    if (currentGroup) {
      const key = currentGroup.classList[1];
      paginate(currentGroup, pageIndexes[key] + 1);
    }
  });
}

function scrollSlider5Items(options) {
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
  const gapSize = parseFloat(getComputedStyle(document.documentElement).fontSize) * 1;

  function setupSlider() {
    slides = Array.from(sliderContainer.children);
    sliderContainer.style.display = 'flex';
    sliderContainer.style.overflow = 'hidden';
    updateSlidesToShow();
  }

  function setResponsive() {
    const responsiveSettings = [
      { breakpoint: 10, settings: { slidesToShow: 1, slidesToScroll: 1 } },
      { breakpoint: 360, settings: { slidesToShow: 2, slidesToScroll: 2 } },
      { breakpoint: 730, settings: { slidesToShow: 3, slidesToScroll: 3 } },
      { breakpoint: 1000, settings: { slidesToShow: 4, slidesToScroll: 4 } },
      { breakpoint: 1300, settings: { slidesToShow: 5, slidesToScroll: 5 } },
      { breakpoint: 1490, settings: { slidesToShow: 6, slidesToScroll: 6 } },
      { breakpoint: 1600, settings: { slidesToShow: 7, slidesToScroll: 7 } }
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
    const maxIndex = slides.length - slidesToShow;

    if (currentIndex <= 0) {
        currentIndex = maxIndex;
    } else {
      currentIndex = Math.max(currentIndex - slidesToScroll, 0);
    }

    scrollToSlide();
  }

  function nextSlide() {
    const maxIndex = slides.length - slidesToShow;

    if (currentIndex >= maxIndex) {
        currentIndex = 0;
    } else {
      currentIndex = Math.min(
        currentIndex + slidesToScroll,
        maxIndex
      );
    }

    scrollToSlide();
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

function scrollSlider4Items(options) {
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
    slides = Array.from(sliderContainer.children);
    sliderContainer.style.display = 'flex';
    sliderContainer.style.overflow = 'hidden';
    updateSlidesToShow();
  }

  function setResponsive() {
    const responsiveSettings = [
      { breakpoint: 10, settings: { slidesToShow: 1, slidesToScroll: 1 } },
      { breakpoint: 360, settings: { slidesToShow: 2, slidesToScroll: 2 } },
      { breakpoint: 730, settings: { slidesToShow: 3, slidesToScroll: 3 } },
      { breakpoint: 1000, settings: { slidesToShow: 4, slidesToScroll: 4 } },
      { breakpoint: 1600, settings: { slidesToShow: 5, slidesToScroll: 5 } }
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
    const maxIndex = slides.length - slidesToShow;

    if (currentIndex <= 0) {
        currentIndex = maxIndex;
    } else {
      currentIndex = Math.max(currentIndex - slidesToScroll, 0);
    }

    scrollToSlide();
  }

  function nextSlide() {
    const maxIndex = slides.length - slidesToShow;

    if (currentIndex >= maxIndex) {
        currentIndex = 0;
    } else {
      currentIndex = Math.min(
        currentIndex + slidesToScroll,
        maxIndex
      );
    }

    scrollToSlide();
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