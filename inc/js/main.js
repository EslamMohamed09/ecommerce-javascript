const header = document.querySelector('header');

if(header){

  document.body.style.paddingTop = `${header.offsetHeight}px`;

}

document.addEventListener('DOMContentLoaded', () => {
    const categoriesContainer = document.getElementById('categories-container');
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
      const categoryLink = document.createElement('a');
      categoryLink.href = category.link;
      categoryLink.className = 'cat-link';
      categoryLink.textContent = category.name;
      categoriesContainer.appendChild(categoryLink);
    });
});
  