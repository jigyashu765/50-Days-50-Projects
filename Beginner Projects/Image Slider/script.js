// JavaScript with modern best practices

// Define a Slider class to encapsulate all slider functionality
class Slider {
    constructor() {
        // Select the slider container element
        this.slider = document.querySelector('.slider');
        // Get all slide elements as a NodeList
        this.slides = document.querySelectorAll('.slide');
        // Select the previous button
        this.prevBtn = document.querySelector('.prev-btn');
        // Select the next button
        this.nextBtn = document.querySelector('.next-btn');
        // Track the current slide index (starts at 0)
        this.currentIndex = 0;
        // Store the total number of slides
        this.totalSlides = this.slides.length;
        // Store the autoplay interval ID (null initially)
        this.autoplayInterval = null;
        // Flag to prevent multiple transitions at once
        this.isTransitioning = false;

        // Call the initialization method
        this.init();
    }

    // Initialize the slider with event listeners and features
    init() {
        // Add click event listener to previous button
        // Using arrow function to maintain 'this' context
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        // Add click event listener to next button
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        
        // Add touch event handlers for mobile support
        this.addTouchEvents();
        
        // Start the automatic sliding
        this.startAutoplay();
        
        // Pause autoplay when mouse enters slider
        this.slider.addEventListener('mouseenter', () => this.stopAutoplay());
        // Resume autoplay when mouse leaves slider
        this.slider.addEventListener('mouseleave', () => this.startAutoplay());
    }

    // Update the slider's position based on currentIndex
    updateSlider() {
        // Prevent updates if a transition is already in progress
        if (this.isTransitioning) return;
        // Set flag to indicate transition is happening
        this.isTransitioning = true;
        
        // Calculate the translation distance (-100% per slide)
        const translateX = -this.currentIndex * 100;
        // Apply the transformation to move slides
        this.slider.style.transform = `translateX(${translateX}%)`;
        
        // Reset transition flag when animation completes
        // Using 'once: true' to automatically remove listener after firing
        this.slider.addEventListener('transitionend', () => {
            this.isTransitioning = false;
        }, { once: true });
    }

    // Move to the next slide
    nextSlide() {
        // Update currentIndex with modulo to loop back to start
        this.currentIndex = (this.currentIndex + 1) % this.totalSlides;
        // Update the slider position
        this.updateSlider();
    }

    // Move to the previous slide
    prevSlide() {
        // Update currentIndex with modulo to loop from end to start
        this.currentIndex = (this.currentIndex - 1 + this.totalSlides) % this.totalSlides;
        // Update the slider position
        this.updateSlider();
    }

    // Start automatic sliding
    startAutoplay() {
        // Set interval to call nextSlide every 3 seconds
        this.autoplayInterval = setInterval(() => {
            this.nextSlide();
        }, 3000); // 3000ms = 3 seconds
    }

    // Stop automatic sliding
    stopAutoplay() {
        // Clear the interval using stored ID
        clearInterval(this.autoplayInterval);
    }

    // Add touch event handlers for mobile swipe support
    addTouchEvents() {
        // Variables to track touch positions
        let touchStartX = 0;  // X position where touch begins
        let touchEndX = 0;    // X position where touch moves to

        // Record starting position on touch start
        this.slider.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
        });

        // Update ending position as finger moves
        this.slider.addEventListener('touchmove', (e) => {
            touchEndX = e.touches[0].clientX;
        });

        // Determine swipe direction when touch ends
        this.slider.addEventListener('touchend', () => {
            // Calculate the difference in X position
            const diff = touchStartX - touchEndX;
            // Only trigger if swipe distance exceeds 50px
            if (Math.abs(diff) > 50) {
                // Swipe right to left (positive diff) = next slide
                if (diff > 0) {
                    this.nextSlide();
                }
                // Swipe left to right (negative diff) = previous slide
                else {
                    this.prevSlide();
                }
            }
        });
    }
}

// Wait for DOM content to load before initializing
document.addEventListener('DOMContentLoaded', () => {
    // Create a new Slider instance
    const slider = new Slider();
});