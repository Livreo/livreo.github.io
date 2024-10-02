// MENU
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.menu');
  
    menuToggle.addEventListener('click', () => {
      menu.classList.toggle('show');
      menuToggle.classList.toggle('x');
    });
  
    document.addEventListener('click', (event) => {
      const isClickInsideMenu = menu.contains(event.target);
      const isClickOnToggle = menuToggle.contains(event.target);
  
      if (!isClickInsideMenu && !isClickOnToggle && menu.classList.contains('show')) {
        menu.classList.remove('show');
        menuToggle.classList.remove('x');
      }
    });
  });