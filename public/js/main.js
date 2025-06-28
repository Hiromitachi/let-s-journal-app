// Main JavaScript file

document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu toggle
  const menuToggle = document.querySelector('.mobile-menu-toggle');
  const sidebar = document.querySelector('.sidebar');
  
  if (menuToggle && sidebar) {
    menuToggle.addEventListener('click', function() {
      sidebar.classList.toggle('active');
    });
    
    const closeSidebar = document.querySelector('.close-sidebar');
    if (closeSidebar) {
      closeSidebar.addEventListener('click', function() {
        sidebar.classList.remove('active');
      });
    }
  }
  
  // User dropdown animation
  const userMenuButtons = document.querySelectorAll('.user-menu-button');
  userMenuButtons.forEach(button => {
    const dropdown = button.nextElementSibling;
    if (dropdown) {
      button.addEventListener('click', function(e) {
        e.stopPropagation();
        dropdown.classList.toggle('show');
      });
    }
  });
  
  // Close dropdowns when clicking outside
  document.addEventListener('click', function() {
    const dropdowns = document.querySelectorAll('.user-dropdown.show');
    dropdowns.forEach(dropdown => {
      dropdown.classList.remove('show');
    });
  });
  
  // Add smooth scrolling to anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href !== '#' && href.startsWith('#')) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });
});