document.addEventListener('DOMContentLoaded', () => {
    const parallaxContainer = document.querySelector('.parallax-container');
    const layers = document.querySelectorAll('.parallax-layer');

    // Parallax Effect Function
    const applyParallax = () => {
        const scrollY = window.scrollY;

        layers.forEach(layer => {
            const speed = parseFloat(layer.getAttribute('data-speed'));
            const offset = scrollY * speed;
            layer.style.transform = `translateY(${offset}px)`;
        });
    };

    // Event Listener for Scroll
    window.addEventListener('scroll', () => {
        requestAnimationFrame(applyParallax);
    });

    // Initial Call to Avoid Flicker
    applyParallax();
});