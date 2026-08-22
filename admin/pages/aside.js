const asideContent = `
  <div class="sidebar-header">
      <div class="sidebar-logo">SV</div>
      <div class="sidebar-brand">Shop<span>Vista</span></div>
      <button class="sidebar-close-button"><i class="bi bi-x"></i></button>
    </div>

    <nav class="sidebar-nav">

      <div class="nav-section">
        <span class="nav-section-label">Main</span>
        <a href="/index.html" class="nav-item" aria-current="page">
          <i class="bi bi-grid-3x3-gap-fill"></i><span class="nav-text">Dashboard</span>
        </a>
      </div>

      <div class="nav-section">
        <span class="nav-section-label">Commerce</span>

        <div class="nav-item has-submenu"><i class="bi bi-boxes"></i><span class="nav-text">Products</span><i class="bi bi-chevron-right nav-arrow"></i></div>
        <div class="sub-menu">
          <a href="/pages/products/all-products.html" class="nav-sub-item"><span>All Products</span></a>
          <a href="/pages/products/add-product.html" class="nav-sub-item"><span>Add Product</span></a>
        </div>

        <div class="nav-item has-submenu"><i class="bi bi-tags-fill"></i><span class="nav-text">Categories</span><i class="bi bi-chevron-right nav-arrow"></i></div>
        <div class="sub-menu">
          <a href="/pages/categories/all-categories.html" class="nav-sub-item"><span>All Categories</span></a>
          <a href="/pages/categories/add-category.html" class="nav-sub-item"><span>Add Category</span></a>
        </div>

        <div class="nav-item has-submenu"><i class="bi bi-cart-fill"></i><span class="nav-text">Orders</span><span class="badge-count">12</span><i class="bi bi-chevron-right nav-arrow"></i></div>
        <div class="sub-menu">
          <a href="/pages/orders/all-orders.html" class="nav-sub-item"><span>All Orders</span></a>
          <a href="/pages/orders/order-status.html" class="nav-sub-item"><span>Order Status</span></a>
        </div>

        <div class="nav-item has-submenu"><i class="bi bi-people-fill"></i><span class="nav-text">Customers</span><i class="bi bi-chevron-right nav-arrow"></i></div>
        <div class="sub-menu">
          <a href="/pages/customers/all-customers.html" class="nav-sub-item"><span>All Customers</span></a>
          <a href="/pages/customers/add-customer.html" class="nav-sub-item"><span>Add Customer</span></a>
        </div>
      </div>

      <div class="nav-section">
        <span class="nav-section-label">Marketing</span>

        <div class="nav-item has-submenu"><i class="bi bi-ticket-detailed"></i><span class="nav-text">Coupons</span><i class="bi bi-chevron-right nav-arrow"></i></div>
        <div class="sub-menu">
          <a href="/pages/coupons/all-coupons.html" class="nav-sub-item"><span>All Coupons</span></a>
          <a href="/pages/coupons/create-coupon.html" class="nav-sub-item"><span>Create Coupon</span></a>
        </div>
        
        <div class="nav-item has-submenu"><i class="bi bi-star-fill"></i><span class="nav-text">Reviews</span><span class="badge-count">5</span><i class="bi bi-chevron-right nav-arrow"></i></div>
        <div class="sub-menu">
          <a href="/pages/reviews/all-reviews.html" class="nav-sub-item"><span>All Reviews</span></a>
          <a href="/pages/reviews/pending-reviews.html" class="nav-sub-item"><span>Pending</span></a>
          <a href="/pages/reviews/approved-reviews.html" class="nav-sub-item"><span>Approved</span></a>
        </div>
        <a href="/pages/messages/all-messages.html" class="nav-item">
          <i class="bi bi-envelope-fill"></i><span class="nav-text">Messages</span><span class="badge-count">3</span>
        </a>
      </div>

      <div class="nav-section">
        <span class="nav-section-label">Insights</span>

        <div class="nav-item has-submenu"><i class="bi bi-graph-up-arrow"></i><span class="nav-text">Analytics</span><i class="bi bi-chevron-right nav-arrow"></i></div>
        <div class="sub-menu">
          <a href="/pages/analytics/sales-report.html" class="nav-sub-item"><span>Sales Report</span></a>
          <a href="/pages/analytics/revenue-report.html" class="nav-sub-item"><span>Revenue Report</span></a>
          <a href="/pages/analytics/customers-report.html" class="nav-sub-item"><span>Customers Report</span></a>
          <a href="/pages/analytics/product-performance.html" class="nav-sub-item"><span>Product Performance</span></a>
        </div>
        <a href="/pages/notifications/all-notifications.html" class="nav-item">
          <i class="bi bi-bell-fill"></i><span class="nav-text">Notifications</span><span class="badge-count">8</span>
        </a>
      </div>

      <div class="nav-section">
        <span class="nav-section-label">System</span>

        <div class="nav-item has-submenu"><i class="bi bi-gear-wide-connected"></i><span class="nav-text">Settings</span><i class="bi bi-chevron-right nav-arrow"></i></div>
        <div class="sub-menu">
          <a href="/pages/settings/general.html" class="nav-sub-item"><span>General</span></a>
          <a href="/pages/settings/store.html" class="nav-sub-item"><span>Store</span></a>
          <a href="/pages/settings/payment.html" class="nav-sub-item"><span>Payment</span></a>
          <a href="/pages/settings/shipping.html" class="nav-sub-item"><span>Shipping</span></a>
          <a href="/pages/settings/email.html" class="nav-sub-item"><span>Email</span></a>
        </div>

        <div class="nav-item has-submenu"><i class="bi bi-person-circle"></i><span class="nav-text">Profile</span><i class="bi bi-chevron-right nav-arrow"></i></div>
        <div class="sub-menu">
          <a href="/pages/profile/my-profile.html" class="nav-sub-item"><span>My Profile</span></a>
          <a href="/pages/profile/edit-profile.html" class="nav-sub-item"><span>Edit Profile</span></a>
          <a href="/pages/profile/change-password.html" class="nav-sub-item"><span>Change Password</span></a>
        </div>

        <div class="nav-item has-submenu"><i class="bi bi-shield-shaded"></i><span class="nav-text">System</span><i class="bi bi-chevron-right nav-arrow"></i></div>
        <div class="sub-menu">
          <a href="/pages/system/activity-logs.html" class="nav-sub-item"><span>Activity Logs</span></a>
          <a href="/pages/system/roles-permissions.html" class="nav-sub-item"><span>Roles & Permissions</span></a>
        </div>
        
        <div class="nav-item has-submenu"><i class="bi bi-file-earmark-text-fill"></i><span class="nav-text">Pages</span><i class="bi bi-chevron-right nav-arrow"></i></div>
        <div class="sub-menu">
          <a href="/pages/pages/all-pages.html" class="nav-sub-item"><span>All Pages</span></a>
          <a href="/pages/pages/add-page.html" class="nav-sub-item"><span>Add Page</span></a>
        </div>

        <a href="/pages/media/media-library.html" class="nav-item">
          <i class="bi bi-images"></i><span class="nav-text">Media</span>
        </a>

        <div class="nav-item has-submenu"><i class="bi bi-life-preserver"></i><span class="nav-text">Support</span><i class="bi bi-chevron-right nav-arrow"></i></div>
        <div class="sub-menu">
          <a href="/pages/support/help-center.html" class="nav-sub-item"><span>Help Center</span></a>
          <a href="/pages/support/contact-support.html" class="nav-sub-item"><span>Contact Support</span></a>
        </div>
        <a href="/pages/auth/login.html" class="nav-item">
          <i class="bi bi-box-arrow-right"></i><span>Logout</span>
        </a>
      </div>

    </nav>

    <div class="sidebar-footer">
      <div class="sidebar-user">
        <div class="sidebar-avatar">JD</div>
        <div class="sidebar-user-info">
          <div class="sidebar-user-name">John Doe</div>
          <div class="sidebar-user-role">Administrator</div>
        </div>
      </div>
    </div>
`;