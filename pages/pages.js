// MENU
document.addEventListener('DOMContentLoaded', function () {
    const menuIcon = document.getElementById('menu-icon');
    const menu = document.getElementById('menu');

    menuIcon.addEventListener('click', function () {
        menu.classList.toggle('show');
    });

    document.addEventListener('click', (event) => {
        const isClickInsideMenu = menu.contains(event.target);
        const isClickOnToggle = menuIcon.contains(event.target);

        if (!isClickInsideMenu && !isClickOnToggle && menu.classList.contains('show')) {
            menu.classList.remove('show');
        }
    });
});
