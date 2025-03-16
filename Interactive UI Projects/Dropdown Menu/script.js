class DropdownMenu {
    constructor() {
        this.navbar = document.querySelector('.navbar');
        this.navToggle = document.querySelector('.navbar-toggle');
        this.navMenu = document.querySelector('.nav-menu');
        this.dropdowns = document.querySelectorAll('.dropdown');
        this.init();
    }

    init() {
        // Toggle mobile menu
        this.navToggle.addEventListener('click', () => this.toggleMobileMenu());

        // Desktop dropdown handling
        this.dropdowns.forEach(dropdown => {
            const menu = dropdown.querySelector('.dropdown-menu');

            // Hover for desktop
            dropdown.addEventListener('mouseenter', () => {
                if (window.innerWidth > 768) {
                    menu.classList.add('active');
                }
            });

            dropdown.addEventListener('mouseleave', () => {
                if (window.innerWidth > 768) {
                    menu.classList.remove('active');
                }
            });

            // Click for mobile
            dropdown.addEventListener('click', (e) => {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    menu.classList.toggle('active');
                }
            });
        });
    }

    toggleMobileMenu() {
        this.navMenu.classList.toggle('active');
        this.navToggle.classList.toggle('active');
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new DropdownMenu();
});