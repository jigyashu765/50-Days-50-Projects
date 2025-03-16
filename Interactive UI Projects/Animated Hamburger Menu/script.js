class HamburgerMenu {
    constructor() {
        this.hamburger = document.querySelector('.hamburger');
        this.menu = document.querySelector('.menu');
        this.overlay = document.querySelector('.overlay');
        this.menuLinks = document.querySelectorAll('.menu-link');
        this.init();
    }

    init() {
        this.hamburger.addEventListener('click', () => this.toggleMenu());
        this.overlay.addEventListener('click', () => this.closeMenu());

        // Close menu when clicking a link (mobile only)
        this.menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    this.closeMenu();
                }
            });
        });

        // Handle window resize
        window.addEventListener('resize', () => this.handleResize());
    }

    toggleMenu() {
        this.hamburger.classList.toggle('active');
        this.menu.classList.toggle('active');
        this.overlay.classList.toggle('active');
        this.hamburger.setAttribute('aria-expanded', this.hamburger.classList.contains('active'));
    }

    closeMenu() {
        this.hamburger.classList.remove('active');
        this.menu.classList.remove('active');
        this.overlay.classList.remove('active');
        this.hamburger.setAttribute('aria-expanded', 'false');
    }

    handleResize() {
        if (window.innerWidth > 768) {
            this.closeMenu();
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new HamburgerMenu();
});