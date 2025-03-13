// State management
const navbarState = {
    isScrolled: false
};

// DOM elements
const navbar = document.getElementById('navbar');

// Throttle function to optimize scroll event
function throttle(fn, wait) {
    let lastTime = 0;
    return function (...args) {
        const now = Date.now();
        if (now - lastTime >= wait) {
            lastTime = now;
            fn(...args);
        }
    };
}

// Update navbar style based on scroll position
function updateNavbar() {
    const scrollPosition = window.scrollY;
    const shouldBeScrolled = scrollPosition > 50;

    if (shouldBeScrolled !== navbarState.isScrolled) {
        navbarState.isScrolled = shouldBeScrolled;
        navbar.classList.toggle('scrolled', shouldBeScrolled);
    }
}

// Event listener with throttling
window.addEventListener('scroll', throttle(updateNavbar, 100));

// Initial check
updateNavbar();