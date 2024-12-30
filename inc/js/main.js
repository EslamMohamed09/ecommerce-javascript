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

  function hideAllItems() { // Function to hide all card items
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

  hideAllItems(); // Initial display setup
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