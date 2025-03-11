// Define the ThemeManager class to handle theme switching functionality
class ThemeManager {
    // Constructor: Initializes the class properties when a new instance is created
    constructor() {
        // Get the toggle switch element (checkbox) from the DOM by its ID
        this.toggleSwitch = document.getElementById('theme-toggle');
        // Store a reference to the <body> element for applying theme classes
        this.body = document.body;
        // Define the key used to store the user's theme preference in localStorage
        this.themeKey = 'userTheme';
        // Call the init method to set up the theme manager
        this.init();
    }

    // init: Sets up the theme manager by loading the saved theme and adding event listeners
    init() {
        // Log initialization for debugging purposes
        console.log('Initializing ThemeManager');
        // Check if required DOM elements (toggleSwitch and body) are available
        if (!this.toggleSwitch || !this.body) {
            // Log an error and exit if elements are missing (e.g., DOM not loaded or ID mismatch)
            console.error('Required DOM elements not found');
            return;
        }
        // Load the user's saved theme preference
        this.loadTheme();
        // Set up the event listener for theme toggling
        this.addEventListener();
    }

    // loadTheme: Retrieves the saved theme from localStorage and applies it
    loadTheme() {
        // Get the saved theme value from localStorage (returns null if not set)
        const savedTheme = localStorage.getItem(this.themeKey);
        // Log the saved theme for debugging
        console.log('Saved theme:', savedTheme);
        // If the saved theme is 'dark', apply the dark theme; otherwise, apply the light theme
        if (savedTheme === 'dark') {
            this.setDarkTheme();
        } else {
            this.setLightTheme();
        }
    }

    // addEventListener: Attaches a change event listener to the toggle switch
    addEventListener() {
        // Listen for the 'change' event on the checkbox (fires when checked/unchecked)
        this.toggleSwitch.addEventListener('change', (e) => {
            // Log the toggle state for debugging (true = checked, false = unchecked)
            console.log('Toggle changed, checked:', e.target.checked);
            // If the checkbox is checked, switch to dark theme; otherwise, switch to light theme
            if (e.target.checked) {
                this.setDarkTheme();
            } else {
                this.setLightTheme();
            }
        });
    }

    // setDarkTheme: Applies the dark theme by updating classes and localStorage
    setDarkTheme() {
        // Log the action for debugging
        console.log('Setting dark theme');
        // Add the 'dark' class to the body to apply dark theme styles
        this.body.classList.add('dark');
        // Ensure the toggle switch reflects the dark theme state (checked = true)
        this.toggleSwitch.checked = true;
        // Save the 'dark' preference to localStorage
        localStorage.setItem(this.themeKey, 'dark');
        // Log the updated body classes for verification
        console.log('Body classes:', this.body.classList.toString());
    }

    // setLightTheme: Applies the light theme by updating classes and localStorage
    setLightTheme() {
        // Log the action for debugging
        console.log('Setting light theme');
        // Remove the 'dark' class from the body to revert to light theme styles
        this.body.classList.remove('dark');
        // Ensure the toggle switch reflects the light theme state (checked = false)
        this.toggleSwitch.checked = false;
        // Save the 'light' preference to localStorage
        localStorage.setItem(this.themeKey, 'light');
        // Log the updated body classes for verification
        console.log('Body classes:', this.body.classList.toString());
    }
}

// Add an event listener to ensure the DOM is fully loaded before creating the ThemeManager
document.addEventListener('DOMContentLoaded', () => {
    // Log when the DOM is ready and the ThemeManager is about to be instantiated
    console.log('DOM loaded, creating ThemeManager');
    // Create a new instance of ThemeManager to initialize the theme functionality
    const themeManager = new ThemeManager();
});