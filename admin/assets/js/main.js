document.addEventListener("DOMContentLoaded", () => {

  const preloader = document.createElement('div');
        preloader.classList.add('loader7');

  preloader.innerHTML = `
    <div class="loader7-container">
      <div class="loader7-block">
        <div class="loader-square"></div>
        <div class="loader-square"></div>
        <div class="loader-square"></div>
        <div class="loader-square"></div>
        <div class="loader-square"></div>
        <div class="loader-square"></div>
        <div class="loader-square"></div>
      </div>
    </div>
  `;
  document.body.insertBefore(preloader, document.body.firstChild);

  preloader.style.display = "flex";

  window.addEventListener("load", () => {
    setTimeout(() => {
      preloader.style.opacity = "0";
      preloader.style.transition = "opacity 0.5s ease";

      preloader.addEventListener("transitionend", () => {
        preloader.remove();
      });
    }, 500);
  });
});

function loadHtml(selector, htmlContent, type){
  document.querySelector(selector).innerHTML = htmlContent;

  if(type === "header"){document.dispatchEvent(new Event("headerLoaded"));}
  if(type === "aside"){document.dispatchEvent(new Event("asideLoaded"));}
}

if(document.querySelector('.header')){

document.addEventListener('headerLoaded', () => {
  const themeToggler = document.getElementById("theme-toggler");
  const adjustIcon = document.getElementById("adjust-icon");
  const moonIcon = document.getElementById("moon-icon");

  function saveTheme(theme) {
    if (theme === 'dark') {
        document.body.classList.add('dark-theme-variable');
        moonIcon.classList.add('active');
        adjustIcon.classList.remove('active');
    } else {
      document.body.classList.remove('dark-theme-variable');
      adjustIcon.classList.add('active');
      moonIcon.classList.remove('active');
    }
  }

  saveTheme(localStorage.getItem('ecommerce2-dashboard-theme'));

  themeToggler.addEventListener("click", () => {
      document.body.classList.toggle('dark-theme-variable');
      
      themeToggler.querySelector('.fa-moon').classList.toggle('active');
      themeToggler.querySelector('.fa-adjust').classList.toggle('active');

      const currentTheme = document.body.classList.contains('dark-theme-variable') ? 'dark' : 'light';
      localStorage.setItem('ecommerce2-dashboard-theme', currentTheme);
  });

  let dropmenu = document.querySelector('.header .right-header .content .drop-menu');
  let rightheader = document.querySelector('.header .right-header');
  const profileImg = document.querySelector('.header .right-header #profile-img');

  profileImg.onclick = (event) => {
    event.stopPropagation(); // Prevents the click event from propagating to the document body
    dropmenu.classList.toggle('dropactive');
    rightheader.classList.remove('dropactive');
  };
  document.body.addEventListener('click', (event) => { // Add click event listener to the document body
    if (!profileImg.contains(event.target) && !dropmenu.contains(event.target)) {// Check if the clicked element is not the image or the dropdown menu
        dropmenu.classList.remove('dropactive');
    }
  });
});

}

if(window.location.pathname.split('/').pop().split('.')[0] !== "login"){
   loadHtml('#header', headerContent, "header");
}

$('body').css('paddingTop', $('.header').innerHeight() - 1);

/*
======================================
######## LOGIN & REGISTER PAGE #######
======================================
*/
/* #### Add Tags to Textarea #### */
function addTag(event, inputElement, textareaElement){
  if(event && event.keycode !== 13){return}

  const input = document.querySelector(inputElement);
  const textarea = document.querySelector(textareaElement);

  if(input.value.trim() !== ''){
     const P = document.createElement('div');
     P.className = 'tag';
     P.textContent = input.value.trim();

     textarea.value += `[${input.value.trim()}]`;
     textarea.appendChild(P);
     input.value = '';
  }

}

// Show Register & Login Form
if(document.querySelector("#login-section")){

  const registerForm = document.querySelector("#login-section .register-form");
  const loginForm = document.querySelector("#login-section .login-form");
  const goToRegisterFormBtn = document.querySelector('#login-section #goToRegisterFormBtn');
  const goToLoginFormBtn = document.querySelector('#login-section #goToLoginFormBtn');

  registerForm.style.display = "none";

  goToRegisterFormBtn.addEventListener('click', function(){
    registerForm.style.display = "block";
    loginForm.style.display = "none";
  });

  goToLoginFormBtn.addEventListener('click', function(){
    registerForm.style.display = "none";
    loginForm.style.display = "block";
  });


  /** Register Steps **/
  const registerphase1 = document.getElementById("registerphase1");
  const registerphase2 = document.getElementById("registerphase2");
  const registerphase3 = document.getElementById("registerphase3");
  const Rstep1 = document.querySelector("#login-section #Rstep1");
  const Rstep2 = document.querySelector("#login-section #Rstep2");
  const Rstep3 = document.querySelector("#login-section #Rstep3");

  const submitRphase1 = document.querySelector("#login-section .submitregisterphase1");
  const backRphase2 = document.querySelector("#login-section .backregisterphase2");
  const submitRphase2 = document.querySelector("#login-section .submitregisterphase2");
  const backRphase3 = document.querySelector("#login-section .backregisterphase3");

  submitRphase1.addEventListener("click", function () {
    registerphase1.classList.remove("active");
    registerphase2.classList.add("active");
    Rstep1.classList.remove("active");
    Rstep2.classList.add("active");
  });

  backRphase2.addEventListener("click", function () {
      registerphase2.classList.remove("active");
      registerphase1.classList.add("active");
      Rstep2.classList.remove("active");
      Rstep1.classList.add("active");
  });

  submitRphase2.addEventListener("click", function () {
      registerphase2.classList.remove("active");
      registerphase3.classList.add("active");
      Rstep2.classList.remove("active");
      Rstep3.classList.add("active");
  });

  backRphase3.addEventListener("click", function () {
      registerphase3.classList.remove("active");
      registerphase2.classList.add("active");
      Rstep3.classList.remove("active");
      Rstep2.classList.add("active");
  });


  /** Add Certifications & Skills Fields **/
  const certificationsContainer = document.getElementById('certificationsContainer');
  const skillsContainer = document.getElementById('skillsContainer');
  const addCertificationBtn = document.querySelector('.addCertificationBtn');
  const deleteCertificationBtn = document.querySelector('.add-delete-btns .deleteCertificationBtn');
  const maximumCertificationMsg = document.getElementById('maximumCertificationMsg');
  const addSkillsBtn = document.querySelector('.addSkillsBtn');
  const deleteSkillsBtn = document.querySelector('.deleteSkillsBtn');
  const submitRegister = document.querySelector('#login-section .submit-register');

  let certificationCounter = 0;
  let certificationNo = 1;

  addCertificationBtn.addEventListener('click', function () { // Certification
      const newCertificationField = document.createElement('div');
      newCertificationField.className = 'certification-block';

      newCertificationField.innerHTML = `
          <h2 class="block-title3 d-flex-r-bt-c">Certification ${certificationNo}<hr></h2>

          <div class="double-input-box d-flex-r-bt-c">
              
              <div class="input-box row">
                <label class="control-label col-lg-2 col-md-2 col-sm-3">Title</label>
                <div class="inputt col-lg-10 col-md-10 col-sm-9"><input type="text" name="certification[${certificationCounter}][etitle]" placeholder="Bachelor Of Arts" autocomplete="off" class="input-control"/></div>
              </div>

              <div class="input-box row">
                <label class="control-label col-lg-2 col-md-2 col-sm-3">Duration</label>
                <div class="inputt col-lg-10 col-md-10 col-sm-9"><input type="text" name="certification[${certificationCounter}][eduration]" placeholder="2013 - 2018" autocomplete="off" class="input-control"/></div>
              </div>

          </div>

          <div class="description-input-box row">
            <label class="control-label col-lg-1 col-md-2 col-sm-2">Description</label>
            <div class="input-holder col-lg-11 col-md-10 col-sm-10"><input type="text" name="certification[${certificationCounter}][edescription]" placeholder="I Succeed In Php Diploma From Egyptian Technology Center" autocomplete="off" class="input-control"/></div>
          </div>
      `;

      certificationsContainer.appendChild(newCertificationField);
      certificationCounter++;
      certificationNo++;

      if(certificationCounter > 0){
        addCertificationBtn.innerHTML = `add more certification`;
        deleteCertificationBtn.style.display = 'block';
      }

      if(certificationCounter === 1){
        submitRphase2.innerHTML = `submit certification`;
      }

      if(submitRphase2 && certificationCounter > 1){
        submitRphase2.innerHTML = `submit certifications`;
      }

      if (certificationCounter === 4) {
          addCertificationBtn.disabled = true;
          addCertificationBtn.style.cursor = "not-allowed";
          maximumCertificationMsg.style.display = 'block';
      }

  });

  deleteCertificationBtn.addEventListener('click', function () {
      if (certificationCounter > 0) {
          const lastCertificationField = certificationsContainer.lastElementChild;
          certificationsContainer.removeChild(lastCertificationField);
          certificationCounter--;
          certificationNo--;

          if (certificationCounter === 0) {
              deleteCertificationBtn.style.display = 'none';
              addCertificationBtn.innerHTML = 'Add Certification';
          }

          if(submitRphase2 && certificationCounter === 0) {submitRphase2.innerHTML = `submit without certification`;}

          if(submitRphase2 && certificationCounter === 1) {submitRphase2.innerHTML = `submit certification`;}

          if(submitRphase2 && certificationCounter > 1) {submitRphase2.innerHTML = `submit certifications`;}

          if (certificationCounter < 4) {
              addCertificationBtn.disabled = false;
              maximumCertificationMsg.style.display = 'none';
          }
      }
  });
  
  let skillsCounter = 0;

  addSkillsBtn.addEventListener('click', function () { // Skills
      const skillsform = document.createElement('form');
      skillsform.className = 'skills-form';

      skillsform.innerHTML = `
          <div class="block-title2 d-flex-r-bt-c"><hr><h2>Add skills</h2><hr></div>

          <div class="skills-blocks d-flex-r-st-st">

            <div class="computer-skills-block block d-flex-c-st-st">  <!-- Computer Skills -->
              <label class="control-label">Computer Skills</label>
              <textarea name="computerskills" id="computerSkillsTextarea"></textarea>
              <input type="text" value="" maxlength="28" class="computerSkillsInput input-control" onkeydown="if(event.keyCode === 13) {addTag(null, '#skillsContainer .computerSkillsInput', '#skillsContainer #computerSkillsTextarea'); return false;}">
              <button type="button" class="btn2" onclick="addTag(null, '#skillsContainer .computerSkillsInput', '#skillsContainer #computerSkillsTextarea')">add skill</button>
            </div>

            <div class="personal-skills-block block d-flex-c-st-st">  <!-- Personal Skills -->
              <label class="control-label">Personal Skills</label>
              <textarea name="personalskills" id="personalSkillsTextarea"></textarea>
              <input type="text" value="" maxlength="28" class="personalSkillsInput input-control" onkeydown="if(event.keyCode === 13) {addTag(null, '#skillsContainer .personalSkillsInput', '#skillsContainer #personalSkillsTextarea'); return false;}">
              <button type="button" class="btn2" onclick="addTag(null, '#skillsContainer .personalSkillsInput', '#skillsContainer #personalSkillsTextarea')">add skill</button>
            </div>

          </div>
      `;
      skillsContainer.appendChild(skillsform);
      skillsCounter++;

      if(skillsCounter > 0) {deleteSkillsBtn.style.display = `block`;
                             addSkillsBtn.style.display = `none`;
                             submitRegister.value = `register`;}

      if(skillsCounter === 0) {addSkillsBtn.style.display = `block`;
                               deleteSkillsBtn.style.display = `none`;}
  });

  deleteSkillsBtn.addEventListener('click', function () {
      if (skillsCounter > 0) {
          const lastSkillsField = skillsContainer.lastElementChild;
          skillsContainer.removeChild(lastSkillsField);
          skillsCounter--;

          addSkillsBtn.style.display = `none`;
          
          if (skillsCounter === 0) {addSkillsBtn.style.display = `block`;
                                    deleteSkillsBtn.style.display = `none`;}

          if (submitRegister && skillsCounter === 0) {submitRegister.value = `register without skills`;}
      }
  });

  function checkErrors() {
    var errors = [];
  
    var username = document.getElementById("usernameinput");
    var password = document.getElementById("passinput");
    var fullname = document.getElementById("fullnameinput");
    var email = document.getElementById("emailinput");
    var whatsapp = document.getElementById("whatsinput");
  
    if(username && !username.validity.valid) {errors.push(username.title);}
    if(password && !password.validity.valid) {errors.push(password.title);}
    if(fullname && !fullname.validity.valid) {errors.push(fullname.title);}
    if(email && !email.validity.valid) {errors.push(email.title);}
    if(whatsapp && !whatsapp.validity.valid) {errors.push(whatsapp.title);}
  
    if(errors.length > 0) {
        var errorMessage = "Please fix the following errors:\n" + errors.join("\n");
        alert(errorMessage);
  
        // var errorContainer = document.getElementById("error-container");
        //     errorContainer.innerHTML = errorMessage;
        //     errorContainer.classList.add("error-alert");
   
        // for (var i=0; i<errors.length; i++) {
        //      // errorContainer.children[i].classList.add("error-object");
   
        //      var errorElement = document.createElement("div");
        //      errorElement.classList.add("error-object");
        //      errorElement.innerHTML = errors[i];
        //      errorContainer.appendChild(errorElement);
        // }
  
        return false;
    }
  
    return true;
  
  }
}


/*
======================
######## ASIDE #######
======================
*/
document.addEventListener('asideLoaded', () => {
  
  const currentPage = window.location.pathname.split('/').pop();

  document.querySelectorAll('#main-aside .main-aside-menu li .sidebar-link').forEach(function(item) {
    const itemHref = item.getAttribute('href');
    if (itemHref === currentPage) {item.classList.add('active');}
  });

    /*** BIG & SMALL ASIDE ***/
    const asideMenu = document.getElementById("main-aside");
    const pageContainer = document.querySelector(".page-container");
    const asideComponent = document.querySelector("header .asidecomponent");
    const asideButton = document.getElementById("asidebutton");
    const asideButton2 = document.getElementById("asidebutton2");

    let isToggledByButton = false;

    function updateAsideMenuClass(){
      if(!isToggledByButton){
        if(window.innerWidth < 768){
            asideMenu.classList.add("smallaside");
            asideButton.style.transform = "rotate(180deg)";
        } else {
          asideMenu.classList.remove("smallaside");
          asideButton.style.transform = "rotate(0deg)";
        }
      }

      handleSectionMargin();
    }

    function toggleSmallAside(){
      asideMenu.classList.toggle("smallaside");
      isToggledByButton = asideMenu.classList.contains("smallaside");
      if (asideMenu.classList.contains("smallaside")) {
          asideButton.style.transform = "rotate(180deg)";
      } else {
        asideButton.style.transform = "rotate(0deg)";
      }
      if (asideMenu.classList.length === 0) {asideMenu.removeAttribute("class");}
      handleSectionMargin();
    }

    function handleSectionMargin(){
      const mainAsideWidth = asideMenu.offsetWidth;
      if(window.innerWidth > 768){
        pageContainer.style.marginLeft = `${mainAsideWidth}px`;
        if (asideMenu.classList.contains("smallaside")){pageContainer.style.marginLeft = '4.3rem';}
      } else {
        pageContainer.style.marginLeft = '4.3rem';
      }
    }

    updateAsideMenuClass();
    handleSectionMargin();

    window.addEventListener("resize", updateAsideMenuClass);
    asideComponent.addEventListener('click', toggleSmallAside);
    asideButton2.addEventListener('click', toggleSmallAside);
    
    asideMenu.addEventListener("transitionend", handleSectionMargin);
    pageContainer.addEventListener("transitionend", handleSectionMargin);
});


if(window.location.pathname.split('/').pop().split('.')[0] !== "login"){
   loadHtml('#main-aside', asideContent, "aside");
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

/*
=============================
######## PROFILE PAGE #######
=============================
*/
/*** Profile-Data ***/
function filterWithTabs(tabButton, cardItem) {

  let firstFilterclick = tabButton.first().attr('filter-click');
  cardItem.not('.' + firstFilterclick).hide(0);
  cardItem.filter('.' + firstFilterclick).show(0);

  tabButton.click(function () {
    filterClick = $(this).attr('filter-click');
    cardItem.not('.' + filterClick).hide(0);
    cardItem.filter('.' + filterClick).show(0);
    $(this).addClass('button-active').siblings().removeClass('button-active');
  });
  tabButton.first().addClass('button-active');
}

// profile-info
filterWithTabs($('.profile-page .profile-data .tabs-area li'), $('.profile-page .profile-data .info-cards .info-card'));
filterWithTabs($('.home-page .right-aside .all-users-block .buttons li'), $('.home-page .right-aside .all-users-block .items'));

/**** Collapsible in Profile Page ****/
const collapsibleProfileBtn = document.getElementById("edit-profile-collapsible");

if(collapsibleProfileBtn){
collapsibleProfileBtn.addEventListener("click", function() {
  this.classList.toggle("active");
  let editProfileData = document.querySelector(".profile-page .edit-profile-data");
  if (editProfileData.style.display === "block") {
      editProfileData.style.display = "none";
  } else {
      editProfileData.style.display = "block";
  }
});
}

/*
 ===============================
 ######## CUSTOMERS PAGE #######
 ===============================
*/
if(document.getElementById("visaInput")){

  const VisaInput = document.getElementById("visaInput");

  VisaInput.addEventListener("input", function (event) {
      var inputValue = event.target.value.replace(/[^0-9]/g, "");

      var formattedValue = inputValue.replace(/(\d{4})(?=\d)/g, "$1-");

      event.target.value = formattedValue;
  });
}

if(document.querySelector('.customers-page')){
fetch('database/customers.json').then(response => response.json())
.then(data => {
  const customers = data.customers;
  const manageCustomersTable = document.querySelector('.customers-page #manage-customers-table');
  const paginationContainer = document.querySelector('.manage-table-form .pagination');
  const customersCountElement = document.querySelector('.customers-page .table-header .counting .no');
        customersCountElement.textContent = customers.length;

  function renderCustomersTable(customers){
    manageCustomersTable.innerHTML = '';

    customers.forEach((customer) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>
          <label class="checkbox-label">
            <input type="checkbox" name="checkbox[]">
            <span class="checkmark"></span>
          </label>
        </td>
        <td>
          <div class="title-field d-flex-r-st-c">
            <a href="#" class="image"><img src="${customer.cust_image}" alt=""></a>
            <a href="#" class="title">${customer.fullname}</a>
          </div>
        </td>
        <td>${customer.email}</td>
        <td>${customer.phone_no}</td>
        <td>${customer.gender}</td>
        <td>${customer.country}</td>
        <td>${customer.city}</td>
        <td>${customer.postalcode}</td>
        <td>${customer.question}</td>
        <td>${customer.date}</td>
        <td>${customer.id}</td>
      `;
      manageCustomersTable.appendChild(row);
    });
    
    displayRowsActionButtons(document.querySelector('.customers-page .manage-customers-table-form'));
  }
  pagination(customers, 10, renderCustomersTable, paginationContainer);
}).catch(error => console.error('Error loading JSON:', error));
}

/*
 ===============================
 ######## CATEGORIES PAGE ######
 ===============================
*/
if(document.querySelector('.category-page')){
fetch('database/categories.json').then(response => response.json())
.then(data => {
  const categories = data.categories;
  const categoriesMap = new Map(categories.map(cat => [cat.id, cat]));
  const manageCategoriesTable = document.querySelector('.category-page #manage-category-table');
  const paginationContainer = document.querySelector('.manage-table-form .pagination');

  function getCategoryDetails(category) {
    if (!category.parent_id) {return { parentName: 'no parent', level: 1 };}
    const parentCategory = categoriesMap.get(category.parent_id);
    const parentDetails = getCategoryDetails(parentCategory);
    return { parentName: parentCategory.name, level: parentDetails.level + 1 };
  }

  function renderCategoryContent(currentCategories) {
    manageCategoriesTable.innerHTML = '';

    currentCategories.forEach((category) => {
      const { parentName, level } = getCategoryDetails(category);

      const row = document.createElement('tr');
      row.innerHTML = `
        <td><input type="checkbox" name="checkbox[]" id="cat-name-${category.id}"></td>
        <td>
          <label for="cat-name-${category.id}">${category.name}</label>
          <div class="buttons">
            <a href="#">edit</a> | <a href="#">delete</a>
          </div>
        </td>
        <td><img src="${category.Image}" alt="${category.name}" width="50"></td>
        <td>${parentName}</td>
        <td class="level-${level}">level ${level}</td>
        <td>${category.id}</td>
      `;
      manageCategoriesTable.appendChild(row);
    });
  }

  pagination(categories, 10, renderCategoryContent, paginationContainer);
}).catch(error => console.error('Error loading JSON:', error));
}

/*
 ===========================
 ######## ORDERS PAGE ######
 ===========================
*/
if(document.querySelector('.orders-list-page')){

  async function loadOrders(){
    const response = await fetch('database/orders.json');
    if(!response.ok){throw new Error('Failed to load orders')}
    const data = await response.json();
    return data.orders;
  }

  async function displayOrders(){
    try {

      const orders = await loadOrders();

      let filteredOrders = [...orders];

      const ordersCountMenuElement = document.querySelector('.orders-list-page .table-header .orders-tabs-menu');
      const ordersListTbody = document.querySelector('.orders-list-page .manage-orders-table-form #orders-list-tbody');
      const paginationContainer = document.querySelector('.orders-list-page .manage-orders-table-form .pagination');

        function renderOrders(ordersToRender){

          ordersListTbody.innerHTML = ordersToRender.map((order) => {
            return `
                <tr class="${order.status}">
                    <td>
                      <label class="checkbox-label">
                        <input type="checkbox" name="checkbox[]">
                        <span class="checkmark"></span>
                      </label>
                    </td>
                    <td>${order.id}</td>
                    <td>
                      <div class="title-field d-flex-r-st-c">
                        <a href="#" class="image"><img src="${order.image}" alt=""></a>
                        <a href="#" class="title"${order.customername}</a>
                      </div>
                    </td>  
                    <td>${order.totalPrice}</td>
                    <td><p class="${order.status}">${order.status}</p></td>
                    <td>${order.paymentMethod}</td>
                    <td>${order.date}</td>
                    <td class="action-buttons-field">
                      <div class="action-buttons-dropdown">
                        <button type="button" class="action-buttons-dropdown-toggle"><i class="fas fa-ellipsis-v"></i></button>
                        <ul class="action-buttons-menu">
                          <li><i class="fas fa-eye"></i>view</li>
                          <li><i class="far fa-edit"></i></i>edit</li>
                          <li><i class="fas fa-trash-alt"></i><input type="submit" value="delete"></li>
                        </ul>
                      </div>
                    </td>
                </tr>
            `
          }).join('');
          initDropdownActions();
          displayRowsActionButtons(document.querySelector('.orders-list-page .manage-orders-table-form'));
        }

        function filterOrders(status) {
          filteredOrders = status === "all" ? [...orders] : orders.filter(o => o.status === status);
          pagination(filteredOrders, 5, renderOrders, paginationContainer);
        }

        function setupTabs(){
          tabs = [
            {class:"all", label:"All", count:orders.length},
            {class:"delivered", label:"Delivered", count:orders.filter(o => o.status === 'delivered').length},
            {class:"pending", label:"Pending", count:orders.filter(o => o.status === 'pending').length},
            {class:"canceled", label:"Canceled", count:orders.filter(o => o.status === 'canceled').length}
          ];
  
          ordersCountMenuElement.innerHTML = tabs.map(tab => {
            return `<li class="${tab.class}" data-status="${tab.class}"><p>${tab.label}</p><span>${tab.count}</span></li>`;
          }).join('');
          
          const ordersTabs = document.querySelectorAll('.orders-list-page .table-header .orders-tabs-menu li');
  
          ordersTabs.forEach(tab => {
            tab.addEventListener('click', () => {
              ordersTabs.forEach((tab) => {tab.classList.remove('active')});
              tab.classList.add('active');
              filterOrders(tab.dataset.status);
            });
          });

          const defaultTab = Array.from(ordersTabs).find((tab) => tab.classList.contains("all"));
          if (defaultTab) defaultTab.click();
        }


        function initDropdownActions() {
            const dropdownToggles = document.querySelectorAll('.action-buttons-dropdown-toggle');

            dropdownToggles.forEach(toggle => {
                toggle.addEventListener('click', function (event) {
                    event.stopPropagation();
                    const dropdownMenu = this.nextElementSibling;

                    // Close all other dropdowns
                    dropdownToggles.forEach(t => {
                        if (t !== toggle) {
                            t.parentElement.classList.remove('active');
                            t.nextElementSibling.style.top = '';
                            t.nextElementSibling.style.bottom = '';
                        }
                    });

                    const isActive = this.parentElement.classList.contains('active');
                    if (!isActive) {
                        this.parentElement.classList.add('active');

                        // Adjust dropdown position
                        const rect = dropdownMenu.getBoundingClientRect();
                        if (rect.bottom > window.innerHeight) {
                            dropdownMenu.style.top = 'auto';
                            dropdownMenu.style.bottom = '100%';
                        } else {
                            dropdownMenu.style.top = '100%';
                            dropdownMenu.style.bottom = 'auto';
                        }
                    } else {
                        this.parentElement.classList.remove('active');
                    }
                });
            });

            document.body.addEventListener('click', (event) => {
                dropdownToggles.forEach(toggle => {
                    if (!toggle.contains(event.target) && !toggle.parentElement.contains(event.target)) {
                        toggle.parentElement.classList.remove('active');
                    }
                });
            });
        }
        
        setupTabs();
        filterOrders("all");

    } catch (error) {
      console.error('failed to load orders', error);
    }
  }

  displayOrders();

}

/*
 =============================
 ######## MESSAGES PAGE ######
 =============================
*/
if(document.querySelector('.messages-page')){
  const buttonsAsideMenuLists = document.querySelectorAll('.messages-page .buttons-aside .buttons-aside-menu .menu-list');
  let buttonsAsideProfileDropmenu = document.querySelector('.messages-page .buttons-aside .buttons-aside-profile-image .buttons-aside-dropmenu');
  const buttonsAsideProfileImg = document.querySelector('#buttonsAsideProfileimg');
  const chatDepartmentsBtns = document.querySelectorAll('.messages-page .chat-block .chat-departments button');
  const contactedPersonsLists = document.querySelectorAll('.messages-page .chat-block .contacted-persons .contacted-persons-menu li');
  const conversations = document.querySelectorAll('.messages-page .chat-block .main-conversation .core-conversation .conversation-wrapper');
  const conversationItemDropdownToggle = document.querySelectorAll('.messages-page .main-conversation .conversation-item .conversation-item-dropdown-toggle');
  const startChat = document.querySelector('.messages-page .chat-block .main-conversation .core-conversation .start-chat');

  buttonsAsideMenuLists.forEach((buttonsAsideMenuList) => {
    buttonsAsideMenuList.addEventListener('click', () => {
      buttonsAsideMenuLists.forEach((item) => {
        item.classList.remove('active');
      });
      buttonsAsideMenuList.classList.add('active');
    });
  });

  buttonsAsideProfileImg.onclick = (event) => {
    event.stopPropagation();
    buttonsAsideProfileDropmenu.classList.toggle('dropactive');
  };

  chatDepartmentsBtns.forEach((button) => {
    button.addEventListener('click', function(){
      chatDepartmentsBtns.forEach((button) => button.classList.remove('active'));
      button.classList.add('active');
    });
  });

  contactedPersonsLists.forEach((button) => {
    button.addEventListener('click', () => {
      const filter = button.getAttribute('data-filter');
  
      conversations.forEach((box) => {
        if (box.classList.contains(filter)) {
            box.style.display = 'block';
        } else {
          box.style.display = 'none';
        }
      });

      startChat.style.display = 'none';
      contactedPersonsLists.forEach((btn) => btn.classList.remove('button-active'));
      button.classList.add('button-active');
    });
  });

  document.body.addEventListener('click', (event) => {
    if (!buttonsAsideProfileImg.contains(event.target) && !buttonsAsideProfileDropmenu.contains(event.target)) {
        buttonsAsideProfileDropmenu.classList.remove('dropactive');
    }
  });
  
  conversationItemDropdownToggle.forEach((item) => {
    item.addEventListener('click', function(event){
      event.stopPropagation();
      const isActive = this.parentElement.classList.contains('active');
      const dropdownMenu = this.nextElementSibling;

      conversationItemDropdownToggle.forEach((toggle) => {
        toggle.parentElement.classList.remove('active');
        toggle.nextElementSibling.style.top = '';
        toggle.nextElementSibling.style.bottom = '';
      });

      if (!isActive) {
          this.parentElement.classList.add('active');

          const rect = dropdownMenu.getBoundingClientRect();
          const viewportHeight = window.innerHeight;

          if(rect.bottom > viewportHeight){
             dropdownMenu.style.top = 'auto';
             dropdownMenu.style.bottom = '100%';
          } else {
            dropdownMenu.style.top = '100%';
            dropdownMenu.style.bottom = 'auto';
          }
      } else {
        this.parentElement.classList.remove('active'); 
      }
    });
  });
  
  document.body.addEventListener('click', (event) => {
    conversationItemDropdownToggle.forEach((item) => {
      if (!item.contains(event.target) && !item.parentElement.contains(event.target)) {
          item.parentElement.classList.remove('active');
      }
    });
  });

  const conversationFormInput = document.querySelector('.messages-page .conversation-form-input');
  conversationFormInput.addEventListener('input', function () {
      this.style.height = 'auto';
      this.style.height = this.scrollHeight + 'px';
  });
}

/*
 =============================
 ######## PRODUCTS PAGE ######
 =============================
*/
if(document.querySelector('.products-page')){

fetch('database/products.json').then(response => response.json())
.then(data => {
  const products = data.products;
  const productstbody = document.querySelector('.products-page #products-tbody');
  const productsPagePaginationContainer = document.querySelector('.products-page .pagination');

  function renderProductsTable(products){
    productstbody.innerHTML = '';

    products.forEach((product) => {
      const row = document.createElement('tr');
      const truncateTitle = truncateWords(product.title, 4);
      row.innerHTML = `
        <td>
          <label class="checkbox-label">
            <input type="checkbox" name="checkbox[]">
            <span class="checkmark"></span>
          </label>
        </td>
        <td>
          <div class="title-field d-flex-r-st-c">
            <a href="#" class="image"><img src="${product.image[0]}" alt=""></a>
            <a href="#" class="title">${truncateTitle}</a>
          </div>
        </td>  
        <td>${product.id}</td>
        <td>${product.instock}</td>
        <td>${product.salePrice}</td>
        <td>
          <div class="rating d-flex-r-c-c"><i class="fas fa-star"></i><span>${product.rating}</span></div>
        </td>
        <td>sheduled</td>
        <td>watches</td>
        <td>
          <div class="action-buttons d-flex-r-c-c">
            <button class="view"><i class="fas fa-eye"></i></button>
            <button class="edit"><i class="far fa-edit"></i></button>
            <button class="delete"><i class="fas fa-trash-alt"></i></button>
          </div>
        </td>
      `;
      productstbody.appendChild(row);
    });
    displayRowsActionButtons(document.querySelector('.products-page .manage-products-table-form'));
  }

  pagination(products, 10, renderProductsTable, productsPagePaginationContainer);
}).catch(error => console.error('Error loading JSON:', error));

}

/*
 =================================
 ######## ADD PRODUCTS PAGE ######
 =================================
*/
if(document.querySelector('.add-product-page')){

  async function loadCategories(){
    const response = await fetch('database/categories.json');
    if(!response.ok){throw new Error('failed to load categories')}
    const data = await response.json();
    return data.categories;
  }

  async function displayCategoriesLevels(){
    try {

    const categories = await loadCategories();

    function arrangeCategories(categories, parentId = null, level = 0) {
      let arrangedHTML = '';

      categories.filter(category => category.parent_id === parentId).forEach(category => {
        const indent = '--'.repeat(level);

        let levelLabel = '';
        if (level === 3) {
            levelLabel = ' (4)';
        } else if (level === 4) {
          levelLabel = ' (5)';
        } else if (level === 5) {
          levelLabel = ' (6)';
        }

        arrangedHTML += `
          <option value="${category.id}" class="level-${level}">
            ${indent}${category.name}${levelLabel}
          </option>`;

        arrangedHTML += arrangeCategories(categories, category.id, level + 1);
      });
      return arrangedHTML;
    }

    const arrangedCategories = arrangeCategories(categories);

    const categorySelect = document.querySelector('.add-product-page .add-product-page-container .add-product-form .left-block .category-input-holder #category-select');

          categorySelect.innerHTML = '<option value="0">...</option>' + arrangedCategories;

    } catch (error) {
      console.error(error.message);
    }
  }

  displayCategoriesLevels();

}


/*
 =============================
 ######### USERS PAGE ########
 =============================
*/
if(document.querySelector('#users-page')){

fetch('database/users.json').then(response => response.json())
.then(data => {
  const users = data.users
  const manageUsersTable = document.querySelector('#users-page #manage-users-table');
  const usersCountElement = document.querySelector('#users-page .table-header .counting .no');
        usersCountElement.textContent = users.length;
  const paginationContainer = document.querySelector('.manage-table-form .pagination');
    
  function renderUsersTable(users){
    manageUsersTable.innerHTML = '';
    users.forEach((user) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <tr>
          <td>
            <label class="checkbox-label">
              <input type="checkbox" name="checkbox[]">
              <span class="checkmark"></span>
            </label>
          </td>
          <td>
            <div class="title-field d-flex-r-st-c">
              <a href="#" class="image"><img src="${user.image}" alt=""></a>
              <a href="#" class="title">${user.username}</a>
            </div>
          </td>
          <td>${user.email}</td>
          <td>${user.fullname}</td>
          <td>${user.groupId}</td>
          <td>${user.regStatus}</td>
          <td>${user.date}</td>
          <td>${user.id}</td>
        </tr>
      `;
      manageUsersTable.appendChild(row);
    });
    
    displayRowsActionButtons(document.querySelector('#users-page #manage-users-table'));
  }

  pagination(users, 10, renderUsersTable, paginationContainer);
}).catch(error => console.error('Error loading JSON:', error));

  const certificationsContainer = document.getElementById('certificationsContainer');
  const skillsContainer = document.getElementById('skillsContainer');
  const addCertificationBtn = document.querySelector('.addCertificationBtn');
  const deleteCertificationBtn = document.querySelector('.add-delete-btns .deleteCertificationBtn');
  const maximumCertificationMsg = document.getElementById('maximumCertificationMsg');
  const addSkillsBtn = document.querySelector('.addSkillsBtn');
  const deleteSkillsBtn = document.querySelector('.deleteSkillsBtn');

  let certificationCounter = 0;
  let certificationNo = 1;

  addCertificationBtn.addEventListener('click', function () { // Certification
      const newCertificationField = document.createElement('div');
      newCertificationField.className = 'certification-block';

      newCertificationField.innerHTML = `
          <h2 class="block-title3 d-flex-r-bt-c">Certification ${certificationNo}<hr></h2>

          <div class="double-input-box d-flex-r-bt-c">
              
              <div class="input-box row">
                <label class="control-label col-lg-2 col-md-2 col-sm-3">Title</label>
                <div class="inputt col-lg-10 col-md-10 col-sm-9"><input type="text" name="certification[${certificationCounter}][etitle]" placeholder="Bachelor Of Arts" autocomplete="off" class="input-control"/></div>
              </div>

              <div class="input-box row">
                <label class="control-label col-lg-2 col-md-2 col-sm-3">Duration</label>
                <div class="inputt col-lg-10 col-md-10 col-sm-9"><input type="text" name="certification[${certificationCounter}][eduration]" placeholder="2013 - 2018" autocomplete="off" class="input-control"/></div>
              </div>

          </div>

          <div class="description-input-box row">
            <label class="control-label col-lg-1 col-md-2 col-sm-2">Description</label>
            <div class="input-holder col-lg-11 col-md-10 col-sm-10"><input type="text" name="certification[${certificationCounter}][edescription]" placeholder="I Succeed In Php Diploma From Egyptian Technology Center" autocomplete="off" class="input-control"/></div>
          </div>
      `;

      certificationsContainer.appendChild(newCertificationField);
      certificationCounter++;
      certificationNo++;

      if(certificationCounter > 0){
        addCertificationBtn.innerHTML = `add more certification`;
        deleteCertificationBtn.style.display = 'block';
      }

      if (certificationCounter === 4) {
          addCertificationBtn.disabled = true;
          addCertificationBtn.style.cursor = "not-allowed";
          maximumCertificationMsg.style.display = 'block';
      }

  });

  deleteCertificationBtn.addEventListener('click', function () {
      if (certificationCounter > 0) {
          const lastCertificationField = certificationsContainer.lastElementChild;
          certificationsContainer.removeChild(lastCertificationField);
          certificationCounter--;
          certificationNo--;

          if (certificationCounter === 0) {
              deleteCertificationBtn.style.display = 'none';
              addCertificationBtn.innerHTML = 'Add Certification';
          }


          if (certificationCounter < 4) {
              addCertificationBtn.disabled = false;
              maximumCertificationMsg.style.display = 'none';
          }
      }
  });
  
  let skillsCounter = 0;

  addSkillsBtn.addEventListener('click', function () { // Skills
      const skillsform = document.createElement('form');
      skillsform.className = 'skills-form';

      skillsform.innerHTML = `
          <div class="block-title2 d-flex-r-bt-c"><hr><h2>Add skills</h2><hr></div>

          <div class="skills-blocks d-flex-r-st-st">

            <div class="computer-skills-block block d-flex-c-st-st">  <!-- Computer Skills -->
              <label class="control-label">Computer Skills</label>
              <textarea name="computerskills" id="computerSkillsTextarea"></textarea>
              <input type="text" value="" maxlength="28" class="computerSkillsInput input-control" onkeydown="if(event.keyCode === 13) {addTag(null, '#skillsContainer .computerSkillsInput', '#skillsContainer #computerSkillsTextarea'); return false;}">
              <button type="button" class="btn2" onclick="addTag(null, '#skillsContainer .computerSkillsInput', '#skillsContainer #computerSkillsTextarea')">add skill</button>
            </div>

            <div class="personal-skills-block block d-flex-c-st-st">  <!-- Personal Skills -->
              <label class="control-label">Personal Skills</label>
              <textarea name="personalskills" id="personalSkillsTextarea"></textarea>
              <input type="text" value="" maxlength="28" class="personalSkillsInput input-control" onkeydown="if(event.keyCode === 13) {addTag(null, '#skillsContainer .personalSkillsInput', '#skillsContainer #personalSkillsTextarea'); return false;}">
              <button type="button" class="btn2" onclick="addTag(null, '#skillsContainer .personalSkillsInput', '#skillsContainer #personalSkillsTextarea')">add skill</button>
            </div>

          </div>
      `;
      skillsContainer.appendChild(skillsform);
      skillsCounter++;

      if(skillsCounter > 0) {deleteSkillsBtn.style.display = `block`;
                             addSkillsBtn.style.display = `none`;}

      if(skillsCounter === 0) {addSkillsBtn.style.display = `block`;
                               deleteSkillsBtn.style.display = `none`;}
  });

  deleteSkillsBtn.addEventListener('click', function () {
      if (skillsCounter > 0) {
          const lastSkillsField = skillsContainer.lastElementChild;
          skillsContainer.removeChild(lastSkillsField);
          skillsCounter--;

          addSkillsBtn.style.display = `none`;
          
          if (skillsCounter === 0) {addSkillsBtn.style.display = `block`;
                                    deleteSkillsBtn.style.display = `none`;}
      }
  });

}


/*
 ######################
 ####### GLOBAL #######
 ######################
*/
function displayRowsActionButtons(tableForm){
    const headCheckBox = tableForm.querySelector("#head-checkbox");
    const checkboxes = tableForm.querySelectorAll("input[name='checkbox[]']");
    const actionBtnsHolder = tableForm.querySelector(".action-buttons-holder");

    if (headCheckBox){
        
        function checkedCheckBoxes(){
          const selectedCheckBoxes = Array.from(checkboxes).filter(checkboxes => checkboxes.checked);
          if(selectedCheckBoxes.length > 1){
             actionBtnsHolder.style.display = "flex";
          } else {
            actionBtnsHolder.style.display = "none";
          }
        }

        checkboxes.forEach(checkbox => {
          checkbox.addEventListener("change", checkedCheckBoxes);
        });

        headCheckBox.addEventListener("change", () => {
          checkboxes.forEach(checkbox => checkbox.checked = headCheckBox.checked);
          checkedCheckBoxes();
        });
    }
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

function truncateWords(text, wordsCount){
  return text.split(' ').slice(0,wordsCount).join(' ');
}

function filterTableItems(tabs, items){

  if (tabs.length === 0 || items.length === 0) return;

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      let tabClass = tab.classList[0];

      tabs.forEach((tab) => {tab.classList.remove('active')});
      items.forEach((item) => {item.style.display = "none";});

      tab.classList.add('active');
      
      if (tabClass === "all") {
          items.forEach((item) => (item.style.display = "table-row"));
      } else {
        items.forEach((item) => {
          if (item.classList.contains(tabClass)) {
              item.style.display = "table-row";
          }
        });
      }
    });
  });

  const defaultTab = Array.from(tabs).find((tab) => tab.classList.contains("all"));
  if (defaultTab) defaultTab.click();
}