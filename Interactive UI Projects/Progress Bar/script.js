// Defines a class to manage the progress bar functionality
class ProgressBar {
    constructor() {
        // DOM elements cached for efficient access
        this.progressBar = document.querySelector('.progress-bar');     // The progress bar element
        this.progressValue = document.querySelector('.progress-value'); // The text showing progress percentage
        this.triggerBtn = document.querySelector('.trigger-btn');       // Button to trigger progress animation
        this.progress = 0;                                              // Current progress value (0-100)
        this.isAnimating = false;                                       // Flag to track if animation is in progress

        // Initialize event listeners when the object is created
        this.initEventListeners();
    }

    // Sets up event listeners for button click and scroll events
    initEventListeners() {
        // Button click handler to start the progress animation
        this.triggerBtn.addEventListener('click', () => this.startProgress());

        // Scroll handler with debounce to optimize performance
        window.addEventListener('scroll', this.debounce(() => this.handleScroll(), 10));
    }

    // Debounce function to limit how often a function is called (e.g., during scroll)
    // @param {Function} func - The function to debounce
    // @param {number} wait - Delay in milliseconds before invoking the function
    debounce(func, wait) {
        let timeout; // Stores the timeout ID
        return (...args) => {
            clearTimeout(timeout); // Clear any existing timeout
            // Set a new timeout to call the function after the wait period
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    }

    // Starts the progress animation when the button is clicked
    startProgress() {
        if (this.isAnimating) return; // Prevent multiple animations from running simultaneously

        this.isAnimating = true; // Mark animation as active
        this.progress = 0;       // Reset progress to 0
        this.animateProgress();  // Begin the animation
    }

    // Animates the progress bar incrementally to 100%
    animateProgress() {
        // Recursive animation function using requestAnimationFrame for smooth updates
        const animation = () => {
            if (this.progress < 100) {           // Continue until progress reaches 100
                this.progress += 1;              // Increment progress by 1
                this.updateProgress();           // Update the UI
                requestAnimationFrame(animation); // Schedule the next frame
            } else {
                this.isAnimating = false;        // Stop animation when complete
            }
        };
        requestAnimationFrame(animation); // Start the animation loop
    }

    // Updates progress based on the user's scroll position
    handleScroll() {
        const scrollTop = window.scrollY;                         // Current scroll position from top
        const docHeight = document.documentElement.scrollHeight - // Total scrollable height
                         window.innerHeight;
        const scrollPercent = Math.min((scrollTop / docHeight) * 100, 100); // Calculate percentage scrolled

        this.progress = Math.round(scrollPercent); // Round to nearest integer
        this.updateProgress();                    // Reflect progress in UI
    }

    // Updates the progress bar's width and percentage text in the UI
    updateProgress() {
        this.progressBar.style.width = `${this.progress}%`;    // Set bar width based on progress
        this.progressValue.textContent = `${this.progress}%`;  // Update displayed percentage
    }
}

// Waits for the DOM to fully load before initializing the ProgressBar
document.addEventListener('DOMContentLoaded', () => {
    new ProgressBar(); // Create a new instance of ProgressBar
});