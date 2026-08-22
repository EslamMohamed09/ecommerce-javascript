/* 
  ============================================
   E-COMMERCE DASHBOARD - MAIN JAVASCRIPT
  ============================================ 
*/

document.addEventListener('DOMContentLoaded', () => {

  // ── Preloader ──
  const preloader = document.getElementById('preloader');
  if(preloader) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        preloader.classList.add('hidden');
      }, 400); // Slight delay for smooth transition
    });
  }

  // ── Sidebar Toggle ──
  const sidebar = document.querySelector('.sidebar');
  const mainHeader = document.querySelector('.main-header');
  const mainContent = document.querySelector('.main-content');

  sidebar.innerHTML = asideContent;
  mainHeader.innerHTML = mainHeaderContent;

  document.addEventListener('click', function (e) { // Sidebar toggle
    const sidebarToggleBtn = e.target.closest('.sidebar-toggle');
    const sidebarCloseBtn = e.target.closest('.sidebar-close-button');

    if(sidebarToggleBtn) {
      const isMobile = window.innerWidth <= 768;
      if(isMobile) {
        document.body.classList.toggle('mobile-sidebar-open');
        document.body.classList.toggle('sidebar-overlay');
      } else {
        const bodyCollapsed = document.body.classList.toggle('sidebar-collapsed');
        if(!document.body.classList.length) {document.body.removeAttribute('class');}
        localStorage.setItem('ecommerce-dashboard-collapsed', bodyCollapsed);
        sidebarToggleBtn.setAttribute('aria-expanded', !bodyCollapsed);
        sidebarToggleBtn.style.transform = bodyCollapsed ? 'rotate(180deg)' : 'rotate(0deg)';
      }
      return;
    }

    if(sidebarCloseBtn) {
      document.body.classList.remove('mobile-sidebar-open');
      document.body.classList.remove('sidebar-overlay');
      if(!document.body.classList.length) {document.body.removeAttribute('class');}
    }

    const asideNavItemSubMenu = e.target.closest('.nav-item.has-submenu'); // sidebar submenu
    if(asideNavItemSubMenu){
      const subMenu = asideNavItemSubMenu.nextElementSibling;
      if(subMenu && subMenu.classList.contains('sub-menu')){
          const isOpen = subMenu.classList.toggle('open');
          asideNavItemSubMenu.classList.toggle('open', isOpen);
          asideNavItemSubMenu.setAttribute('aria-expanded', isOpen);
      }
      return;
    }

  });

  if(localStorage.getItem('ecommerce-dashboard-collapsed') === 'true'){
     document.body.classList.add('sidebar-collapsed');
     const sidebarToggleBtn = document.querySelector('.main-header .header-left-block .sidebar-toggle');
     sidebarToggleBtn.style.transform = 'rotate(180deg)';
  }

    // ── Active sidebar link ──
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.sidebar a.nav-item, .sidebar a.nav-sub-item').forEach(link => {
    const href = link.getAttribute('href');
    if(href) {
      const linkPage = href.split('/').pop();
      if(linkPage === currentPage) {
        link.classList.add('active');

        const subMenu = link.closest('.sub-menu');
        if(subMenu) {
          const parentSubmenu = subMenu.previousElementSibling;

          if(parentSubmenu?.classList.contains('has-submenu')) {
            parentSubmenu.classList.add('open');
            subMenu.classList.add('open');
          }
        }
      }
    }
  });

  // ── Theme Toggle ──
  const themeToggle = document.getElementById('theme-toggle');
  if(themeToggle) {
    const savedTheme = localStorage.getItem('dashboard-theme');
    if(savedTheme === 'light') document.body.classList.add('light-theme');

    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('light-theme');
      const isLight = document.body.classList.contains('light-theme');
      localStorage.setItem('dashboard-theme', isLight ? 'light' : 'dark');
      const icon = themeToggle.querySelector('i');
      if(icon) {
        icon.className = isLight ? 'fas fa-moon' : 'fas fa-sun';
      }
    });
  }

  // ── Scroll Animations (Intersection Observer) ──
  const animateOnScroll = document.querySelectorAll('[data-animate]');
  if(animateOnScroll.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if(entry.isIntersecting) {
          entry.target.classList.add('animate-fade-up');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    animateOnScroll.forEach(el => observer.observe(el));
  }

  // ── Staggered Card Animations ──
  document.querySelectorAll('.stat-card, .card').forEach((card, i) => {
    card.style.opacity = '0';
    card.style.animation = `fadeInUp 0.5s ease ${i * 0.08}s forwards`;
  });

  // ── Counter Animation ──
  document.querySelectorAll('.stat-value[data-count]').forEach(el => {
    const target = parseFloat(el.dataset.count);
    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';
    const decimals = el.dataset.decimals ? parseInt(el.dataset.decimals) : 0;
    const duration = 1500;
    let start = 0;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = start + (target - start) * eased;
      el.textContent = prefix + current.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + suffix;
      if(progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  });

  // ── Progress Bars Animation ──
  document.querySelectorAll('.stat-bar-fill').forEach(bar => {
    const width = bar.dataset.width || '0%';
    setTimeout(() => { bar.style.width = width; }, 300);
  });

  // ── Chart.js Initialization ──
  const revenueCtx = document.getElementById('revenueChart');
  if(revenueCtx && typeof Chart !== 'undefined') {
    new Chart(revenueCtx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
          label: 'Revenue',
          data: [18500, 22300, 19800, 27400, 31200, 28900, 35600, 32100, 38400, 41200, 39800, 45600],
          borderColor: '#0A84FF',
          backgroundColor: 'rgba(10,132,255,0.08)',
          borderWidth: 2.5,
          fill: true,
          tension: 0.4,
          pointBackgroundColor: '#0A84FF',
          pointBorderColor: '#0B1120',
          pointBorderWidth: 2,
          pointRadius: 0,
          pointHoverRadius: 6,
        }, {
          label: 'Expenses',
          data: [12200, 14100, 13500, 16800, 18900, 17200, 21300, 19800, 23400, 25100, 24300, 27800],
          borderColor: '#6C5CE7',
          backgroundColor: 'rgba(108,92,231,0.05)',
          borderWidth: 2,
          fill: true,
          tension: 0.4,
          pointRadius: 0,
          pointHoverRadius: 6,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'top',
            align: 'end',
            labels: { color: '#8899AA', usePointStyle: true, pointStyle: 'circle', padding: 20, font: { size: 12 } }
          },
          tooltip: {
            backgroundColor: 'rgba(13,21,38,0.95)',
            titleColor: '#fff',
            bodyColor: '#8899AA',
            borderColor: 'rgba(255,255,255,0.1)',
            borderWidth: 1,
            padding: 12,
            cornerRadius: 8,
            displayColors: false,
            callbacks: {
              label: ctx => `$${ctx.parsed.y.toLocaleString()}`
            }
          }
        },
        scales: {
          x: {
            grid: { color: 'rgba(255,255,255,0.04)', drawBorder: false },
            ticks: { color: '#556677', font: { size: 11 } }
          },
          y: {
            grid: { color: 'rgba(255,255,255,0.04)', drawBorder: false },
            ticks: { color: '#556677', font: { size: 11 }, callback: v => '$' + (v/1000) + 'k' }
          }
        },
        interaction: { intersect: false, mode: 'index' }
      }
    });
  }

  // Orders Chart
  const ordersCtx = document.getElementById('ordersChart');
  if(ordersCtx && typeof Chart !== 'undefined') {
    new Chart(ordersCtx, {
      type: 'doughnut',
      data: {
        labels: ['Completed', 'Processing', 'Pending', 'Cancelled'],
        datasets: [{
          data: [540, 180, 95, 32],
          backgroundColor: ['#00E676', '#0A84FF', '#FFB300', '#FF1744'],
          borderColor: '#0B1120',
          borderWidth: 3,
          hoverOffset: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '72%',
        plugins: {
          legend: {
            position: 'bottom',
            labels: { color: '#8899AA', usePointStyle: true, pointStyle: 'circle', padding: 16, font: { size: 12 } }
          }
        }
      }
    });
  }

  // ── Password Toggle ──
  document.querySelectorAll('.password-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const input = btn.previousElementSibling || btn.parentElement.querySelector('input');
      if(input) {
        const isPassword = input.type === 'password';
        input.type = isPassword ? 'text' : 'password';
        const icon = btn.querySelector('i');
        if(icon) icon.className = isPassword ? 'fas fa-eye-slash' : 'fas fa-eye';
      }
    });
  });

  // ── Tab Navigation ──
  document.querySelectorAll('.tab-nav').forEach(nav => {
    const btns = nav.querySelectorAll('.tab-btn');
    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        btns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const target = btn.dataset.tab;
        if(target) {
          document.querySelectorAll('.tab-pane').forEach(pane => {
            pane.style.display = pane.id === target ? 'block' : 'none';
          });
        }
      });
    });
  });

  // ── Select All Checkbox ──
  // const selectAll = document.getElementById('select-all');
  // if(selectAll) {
  //   selectAll.addEventListener('change', () => {
  //     document.querySelectorAll('.row-check').forEach(cb => {
  //       cb.checked = selectAll.checked;
  //     });
  //   });
  // }

  // ── Notification Dropdown ──
  const notifBtn = document.querySelector('.notif-btn');
  const notifDropdown = document.querySelector('.notif-dropdown');
  if(notifBtn && notifDropdown) {
    notifBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      notifDropdown.classList.toggle('show');
    });
    document.addEventListener('click', () => notifDropdown.classList.remove('show'));
  }

  // ── User Dropdown ──
  const userBtn = document.querySelector('.topbar-user');
  const userDropdown = document.querySelector('.user-dropdown');
  if(userBtn && userDropdown) {
    userBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      userDropdown.classList.toggle('show');
    });
    document.addEventListener('click', () => userDropdown.classList.remove('show'));
  }

});

/*
 ========================
 ####### HOME PAGE ######
 ========================
*/
if(document.querySelector('.home-page')) {

  async function loadOrders() {
    const response = await fetch('../../database/orders.json');
    if(!response.ok) {throw new Error('failed to load orders');}
    const data = await response.json();
    return data.orders;
  }

  async function displayOrders() {

    try {
      
      const orders = await loadOrders();
            orders.reverse();
      const ordersTbody = document.querySelector('.home-page .orders-table-card table tbody');
      const paginationInfo = document.querySelector('.home-page .orders-table-card .pagination-wrapper .pagination-info');
      const paginationWrapper = document.querySelector('.home-page .orders-table-card .pagination-wrapper .pagination-btns');
      const rowsPerPage = 8;

      function renderOrdersRow(orders) {
        ordersTbody.innerHTML = '';

        orders.forEach(order => {
          const row = document.createElement('tr');
                row.innerHTML = `
                    <td>
                      <label class="checkbox-label">
                        <input type="checkbox" name="checkbox[]" class="row-check">
                        <span class="checkmark"></span>
                      </label>
                    </td>
                    <td class="order-id-field">#ORD-${order.id}</td>
                    <td class="customer-field">
                      <div class="customer-field-holder">
                        <div class="avatar" style="background:linear-gradient(135deg,#6C5CE7,#a855f7)">SK</div>
                        <div>
                          <div class="customer-name">${order.customername}</div>
                          <div class="customer-email">sara@email.com</div>
                        </div>
                      </div>
                    </td>
                    <td>iPhone 15 Pro Max</td>
                    <td>Mar 17, 2026</td>
                    <td class="pro-price-field">${order.totalPrice}</td>
                    <td>
                      ${order.status === 'completed' ? '<span class="badge badge-success"><span class="status-dot active"></span> Completed</span>' :
                        order.status === 'shipped' ? '<span class="badge badge-info"><span class="status-dot pending"></span>Shipped</span>' :
                        order.status === 'pending' ? '<span class="badge badge-warning"><span class="status-dot pending"></span> Processing</span>' :
                        order.status === 'canceled' ? '<span class="badge badge-danger"><span class="status-dot inactive"></span>Canceled</span>' :''
                      }                      
                    </td>
                    <td>
                      <button class="btn-icon" aria-label="View"><i class="fas fa-eye"></i></button>
                      <button class="btn-icon" aria-label="Edit"><i class="fas fa-pen"></i></button>
                    </td>
                `;
          ordersTbody.appendChild(row);
        });

        displayRowsActionButtons(document.querySelector('.home-page .manage-orders-table-form'));
      }

      pagination(orders, rowsPerPage, renderOrdersRow, paginationWrapper, paginationInfo, ItemName = 'orders');

    } catch (error) {
      console.error(error);
    }

  }

  displayOrders();

}

/*
 ==============================
 ####### ALL ORDERS PAGE ######
 ==============================
*/
if(document.querySelector('.all-orders-page')) {

  async function loadOrders() {
    const response = await fetch('../../database/orders.json');
    if(!response.ok) {throw new Error('failed to load orders');}
    const data = await response.json();
    return data.orders;
  }

  async function displayOrders() {

    try {
      
      const orders = await loadOrders();
      orders.reverse();
      let filteredOrders = [...orders];
      const ordersTbody = document.querySelector('.all-orders-page .orders-table-card table tbody');
      const orderStatusSelect = document.querySelector('.all-orders-page .orders-table-card .table-actions .order-status-select');
      const paginationInfo = document.querySelector('.all-orders-page .orders-table-card .pagination-wrapper .pagination-info');
      const paginationWrapper = document.querySelector('.all-orders-page .orders-table-card .pagination-wrapper .pagination-btns');
      const rowsPerPage = 8;

      function renderOrdersRow(orders) {
        ordersTbody.innerHTML = '';

        orders.forEach(order => {
          const row = document.createElement('tr');
                row.innerHTML = `
                    <td>
                      <label class="checkbox-label">
                        <input type="checkbox" name="checkbox[]" id="checkbox-${order.id}" class="row-check">
                        <span class="checkmark"></span>
                      </label>
                    </td>
                    <td class="order-id-field"><label for="checkbox-${order.id}">#ORD-${order.id}</label></td>
                    <td>${order.customername}</td><td>Mar 18, 2026</td>
                    <td>3</td>
                    <td style="font-weight:600">${order.totalPrice}</td>
                    <td> 
                        ${order.status === 'completed' ? '<span class="badge badge-success">Paid</span>' :
                          order.status === 'shipped' ? '<span class="badge badge-success">Paid</span>' :
                          order.status === 'pending' ? '<span class="badge badge-warning">Pending</span>' :
                          order.status === 'canceled' ? '<span class="badge badge-danger">Canceled</span>' :''
                        }
                    </td>
                   <td>
                      ${order.status === 'completed' ? '<span class="badge badge-success"><span class="status-dot active"></span> Completed</span>' :
                        order.status === 'shipped' ? '<span class="badge badge-info"><span class="status-dot pending"></span>Shipped</span>' :
                        order.status === 'pending' ? '<span class="badge badge-warning"><span class="status-dot pending"></span> Processing</span>' :
                        order.status === 'canceled' ? '<span class="badge badge-danger"><span class="status-dot inactive"></span>Canceled</span>' :''
                      }                      
                    </td>
                    <td><a href="order-details.html" class="btn-icon"><i class="fas fa-eye"></i></a></td>
                `;
          ordersTbody.appendChild(row);
        });

        displayRowsActionButtons(document.querySelector('.all-orders-page .manage-orders-table-form'));
      }

      function filterOrders(orderStatus){

        if(orderStatus === 'all'){
          filteredOrders = [...orders];
        } else {
          filteredOrders = orders.filter(order => order.status === orderStatus);
        }

        pagination(filteredOrders, rowsPerPage, renderOrdersRow, paginationWrapper, paginationInfo, itemName = 'orders');
      }

      function setupOrdersTabs() {
        orderStatusSelect.innerHTML = '';

        const allOption = document.createElement('option');
              allOption.value = 'all';
              allOption.textContent = 'All Status';
              orderStatusSelect.appendChild(allOption);

        const statuses = [...new Set(orders.map(order => order.status))];

        statuses.forEach(status => {
          const count = orders.filter(order => order.status === status).length;

          const option = document.createElement('option');
                option.value = status;
                option.textContent = `${status} (${count})`;

          orderStatusSelect.appendChild(option);
        });

        orderStatusSelect.addEventListener('change', (e) => {
          filterOrders(e.target.value);
        });
      }

      setupOrdersTabs();
      filterOrders('all');

    } catch (error) {
      console.error(error);
    }

  }

  displayOrders();

}

/*
 ================================
 ####### ALL PRODUCTS PAGE ######
 ================================
*/
if(document.querySelector('.all-products-page')) {

  async function loadProducts() {
    const response = await fetch('../../database/products.json');
    if(!response.ok) {throw new Error('failed to load products');}
    const data = await response.json();
    return data.products
  }

  async function loadCategories() {
    const response = await fetch('../../database/categories.json');
    if(!response.ok) {throw new Error('failed to load categories');}
    const data = await response.json();
    return data.categories;
  }

  function getAllCategoryIds(categoryId, categories) { // get all children of category
    let result = [categoryId];

    function findChildren(id) {
      let children = categories.filter(cat => cat.parent_id === id);

      children.forEach(child => {
        result.push(child.id);
        findChildren(child.id)
      });
    }

    findChildren(categoryId);
    return result;
  }

  async function displayProducts() {
    try {
      
      const products = await loadProducts();
      const categories = await loadCategories();
      let filteredProducts = [...products];
      const categorySelect = document.querySelector('.all-products-page .category-select');
      const productsTbody = document.querySelector('.all-products-page .data-table tbody');
      const paginationInfo = document.querySelector('.all-products-page .manage-products-table-form .pagination-wrapper .pagination-info');
      const paginationWrapper = document.querySelector('.all-products-page .pagination-wrapper .pagination-btns');

      function renderProductsRow(products) {
        productsTbody.innerHTML = '';

        products.forEach(product => {
          const row = document.createElement('tr');
          const truncateTitle = truncateWords(product.title, 3);

          let imageHtml = '';

          if(Array.isArray(product.image)) {

            // Case 1: Direct array of URLs
            if(typeof product.image[0] === 'string') {
                imageHtml = product.image.slice(0, 1).map(src => `<img src="${src}" alt="${truncateTitle}">`).join('');
            }

            // Case 2: Array of objects with {color, url: []}
            else if(typeof product.image[0] === 'object' && Array.isArray(product.image[0].url)) {
              // Find the color that matches product.color (if exists) or take first
              const colorObj = product.image.find(img => img.color === product.color) || product.image[0];
              const urls = colorObj.url || [];
              imageHtml = urls.slice(0, 1).map(src => `<img src="${src}" alt="${truncateTitle}">`).join('');
            }

          }

          row.innerHTML = `
            <td>
              <label class="checkbox-label">
                <input type="checkbox" name="checkbox[]" class="row-check">
                <span class="checkmark"></span>
              </label>
            </td>
            <td class="product-name-field">
              <div class="product-name-thumb-holder">
                <div class="product-thumb">${imageHtml}</div>
                <div class="product-name-holder">
                  <div class="product-title">${truncateTitle}</div>
                  ${product.brand ? `<div class="product-brand">${product.brand}</div>` : ''}
                </div>
              </div>
            </td>
            <td>${product.id}</td>
            <td>Electronics</td>
            <td class="product-price-field">${product.salePrice}</td>
            ${product.instock > 0 ? product.instock < 10 ? 
              `<td><span class="badge badge-warning">Low Stock (${product.instock})</span></td>` 
              : `<td><span class="badge badge-success">In Stock (${product.instock})</span></td>` 
              : `<td><span class="badge badge-danger">Out of Stock</span></td>`}
            <td><span class="badge badge-success"><span class="status-dot active"></span> Active</span></td>
            <td>
              <a href="product-details.html" class="btn-icon"><i class="fas fa-eye"></i></a>
              <a href="edit-product.html" class="btn-icon"><i class="fas fa-pen"></i></a>
              <button class="btn-icon"><i class="fas fa-trash"></i></button>
            </td>
          `;
          productsTbody.appendChild(row);
          displayRowsActionButtons(document.querySelector('.all-products-page .manage-products-table-form'));
        });
      }

      function filterProducts(categoryid){

        if(categoryid === 'all') {
           filteredProducts = [...products];
        } else {
          const allCategoryIds = getAllCategoryIds(categoryid, categories);
          filteredProducts = products.filter(product => allCategoryIds.includes(product.catId));
        }

        pagination(filteredProducts, 8, renderProductsRow, paginationWrapper, paginationInfo, itemName = 'products');
      }

      function setupCategoriesTabs() {
        categorySelect.innerHTML = '';

        const allOption = document.createElement('option');
              allOption.value = 'all';
              allOption.textContent = 'All';
        categorySelect.appendChild(allOption);


        categories.forEach(category => {
          const option = document.createElement('option');
                option.value = category.id;
                option.textContent = category.title;
          categorySelect.appendChild(option);
        });

        categorySelect.addEventListener('change', (e) => {
          filterProducts(e.target.value);
        });
      }

      setupCategoriesTabs();
      filterProducts('all');

    } catch (error) {
      console.error(error);
    }
  }

  displayProducts();
  
}

/*
 ===============================
 ####### ADD PRODUCT PAGE ######
 ===============================
*/
if(document.querySelector('.add-product-page')) {
   
  async function loadCategories() {
    const response = await fetch('../../database/categories.json');
    if(!response.ok){throw new Error('failed to load categories');}
    const data = await response.json();
    return data.categories;
  }

  async function displayCategoriesLevels() {
    try {

      const categories = await loadCategories();

      function arrangeCategories(categories, parentId = null, level = 0) {
        let arrangedHTML = '';

        categories.filter(category => category.parent_id === parentId).forEach(category => {
          const indent = '--'.repeat(level);

          let levelLabel = '';
          if(level === 3) {
              levelLabel = ' (4)';
          } else if(level === 4) {
            levelLabel = ' (5)';
          } else if(level === 5) {
            levelLabel = ' (6)';
          }

          arrangedHTML += `
            <option value="${category.id}" class="level-${level}">
              ${indent}${category.title}${levelLabel}
            </option>`;

          arrangedHTML += arrangeCategories(categories, category.id, level + 1);
        });
        return arrangedHTML;
      }

      const arrangedCategories = arrangeCategories(categories);

      const categorySelect = document.querySelector('.add-product-page .product-form-card .category-select');

            categorySelect.innerHTML = '<option value="0">...</option>' + arrangedCategories;

    } catch (error) {
      console.error('failed to load categories levels');
    }
  }

  displayCategoriesLevels();

}

/*
 ================================
 ###### ALL CATEGORIES PAGE #####
 ================================
*/
if(document.querySelector('.all-categories-page')){

  async function loadCategories() {
    const response = await fetch('../../database/categories.json');
    if(!response.ok){throw new Error('failed to load categories');}
    const data = await response.json();
    return data.categories;
  }

  async function displayCategories(){
    try {
      
      const categories = await loadCategories();
      const categoriesContainer = document.querySelector('.all-categories-page .categories-container');

      categoriesContainer.innerHTML = '';

      categories.forEach(category => {
        const categoryCard = document.createElement('div');
        categoryCard.className = 'category-card card';
        categoryCard.innerHTML = `
            <div class="image-holder"><img src="${category.Image}" alt="${category.title}"></div>
            <h3 class="card-title">${category.title}</h3>
            <p>186 products</p>
            <div class="action-btns">
              <a href="edit-category.html" class="btn-icon"><i class="fas fa-pen"></i></a>
              <button class="btn-icon"><i class="fas fa-trash"></i></button>
            </div>
        `;
        categoriesContainer.appendChild(categoryCard);
      });

    } catch (error) {
      console.error('failed to load categories');
    }
  }

  displayCategories();
   
}

/*
 ================================
 ####### ALL CUSTOMERS PAGE #####
 ================================
*/
if(document.querySelector('.all-customers-page')) {
  const tableBody = document.querySelector('.all-customers-page .data-table tbody');
  const originalRows = Array.from(document.querySelectorAll('.all-customers-page .data-table tbody tr'));
  const paginationInfo = document.querySelector('.all-customers-page .table-card .pagination-wrapper .pagination-info');
  const paginationWrapper = document.querySelector('.all-customers-page .pagination-wrapper .pagination-btns');

  function renderTableRows(currentRows) {
    tableBody.innerHTML = '';
    currentRows.forEach(row => {tableBody.appendChild(row);});
    displayRowsActionButtons(document.querySelector('.all-customers-page .manage-customers-table-form'));
  }

  pagination(originalRows, 5, renderTableRows, paginationWrapper, paginationInfo, itemName = 'customers');
}

/*
 ######################
 ####### GLOBAL #######
 ######################
*/
function displayRowsActionButtons(tableForm){
  const headCheckBox = tableForm.querySelector("#head-checkbox");
  const rowsCheckBoxes = tableForm.querySelectorAll(".row-check");
  const actionBtnsHolder = tableForm.querySelector(".action-buttons-holder");

  if(headCheckBox){
      
      function checkedCheckBoxes(){
        const selectedCheckBoxes = Array.from(rowsCheckBoxes).filter(rowsCheckBoxes => rowsCheckBoxes.checked);
        if(selectedCheckBoxes.length > 1){
            actionBtnsHolder.style.display = "flex";
        } else {
          actionBtnsHolder.style.display = "none";
        }
      }

      rowsCheckBoxes.forEach(checkbox => {
        checkbox.addEventListener("change", checkedCheckBoxes);
      });

      headCheckBox.addEventListener("change", () => {
        rowsCheckBoxes.forEach(checkbox => checkbox.checked = headCheckBox.checked);
        checkedCheckBoxes();
      });
  }
}

function paginationwithoutInfo(data, itemsPerPage, renderContent, paginationContainer) {
  const totalPages = Math.ceil(data.length / itemsPerPage);

  if(totalPages <= 1) {
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

    if(currentPage > 1) {
       const prevButton = createPaginationLink('<i class="fas fa-chevron-left"></i>', currentPage - 1);
       prevButton.classList.add('previous');
       paginationContainer.appendChild(prevButton);
    }

    if(currentPage <= range) {
      for (let i = 1; i <= range; i++) {
        paginationContainer.appendChild(createPaginationLink(i, i, currentPage));
      }
      if(totalPages > visiblePages) {
        appendDots();
        paginationContainer.appendChild(createPaginationLink(totalPages, totalPages, currentPage));
      }
    } else if(currentPage > totalPages - range) {
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

    if(currentPage < totalPages) {
       const nextButton = createPaginationLink('<i class="fas fa-chevron-right"></i>', currentPage + 1);
       nextButton.classList.add('next');
       paginationContainer.appendChild(nextButton);
    }
  }

  function createPaginationLink(innerButton, page, currentPage) {
    const button = document.createElement('button');
    // link.href = '#';
    button.className = 'pagination-link';
    button.innerHTML = innerButton;
    if(page === currentPage) {button.classList.add('active');}
    button.addEventListener('click', (e) => {
      e.preventDefault();
      renderPage(page);
      renderPagination(page);
    });
    return button;
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

function pagination(data, itemsPerPage, renderContent, paginationContainer, infoContainer, itemName = 'items') {

  const totalPages = Math.ceil(data.length / itemsPerPage);

  function updateInfo(page) {
    if (!infoContainer) return;

    const startItem = data.length ? ((page - 1) * itemsPerPage) + 1 : 0;
    const endItem = Math.min(page * itemsPerPage, data.length);

    infoContainer.textContent = `Showing ${startItem}-${endItem} of ${data.length} ${itemName}`;
  }

  if (totalPages <= 1) {
    paginationContainer.style.display = 'none';
    renderContent(data, 1);
    updateInfo(1);
    return;
  } else {
    paginationContainer.style.display = 'flex';
  }

  function renderPage(page) {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = page * itemsPerPage;
    const currentItems = data.slice(startIndex, endIndex);

    renderContent(currentItems, page);
    updateInfo(page);
  }

  function renderPagination(currentPage) {
    paginationContainer.innerHTML = '';

    const visiblePages = 3;
    const range = Math.min(visiblePages, totalPages);

    if (currentPage > 1) {
      const prevButton = createPaginationLink(
        '<i class="bi bi-chevron-left"></i>',
        currentPage - 1
      );
      prevButton.classList.add('previous');
      paginationContainer.appendChild(prevButton);
    }

    if (currentPage <= range) {
      for (let i = 1; i <= range; i++) {
        paginationContainer.appendChild(
          createPaginationLink(i, i, currentPage)
        );
      }

      if (totalPages > visiblePages) {
        appendDots();
        paginationContainer.appendChild(
          createPaginationLink(totalPages, totalPages, currentPage)
        );
      }
    } else if (currentPage > totalPages - range) {
      paginationContainer.appendChild(
        createPaginationLink(1, 1, currentPage)
      );

      appendDots();

      for (let i = totalPages - range + 1; i <= totalPages; i++) {
        paginationContainer.appendChild(
          createPaginationLink(i, i, currentPage)
        );
      }
    } else {
      paginationContainer.appendChild(createPaginationLink(1, 1, currentPage));

      appendDots();

      for (
        let i = currentPage - Math.floor(visiblePages / 2);
        i <= currentPage + Math.floor(visiblePages / 2);
        i++
      ) {
        paginationContainer.appendChild(
          createPaginationLink(i, i, currentPage)
        );
      }

      appendDots();

      paginationContainer.appendChild(createPaginationLink(totalPages, totalPages, currentPage));
    }

    if (currentPage < totalPages) {
      const nextButton = createPaginationLink(
        '<i class="bi bi-chevron-right"></i>',
        currentPage + 1
      );

      nextButton.classList.add('next');
      paginationContainer.appendChild(nextButton);
    }
  }

  function createPaginationLink(innerButton, page, currentPage) {
    const button = document.createElement('button');

    button.className = 'pagination-link';
    button.innerHTML = innerButton;

    if (page === currentPage) {
      button.classList.add('active');
    }

    button.addEventListener('click', (e) => {
      e.preventDefault();
      renderPage(page);
      renderPagination(page);
    });

    return button;
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

function truncateWords(text, wordsCount){
  return text.split(' ').slice(0,wordsCount).join(' ');
}