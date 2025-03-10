// Define the GuessGame class to encapsulate all game logic
class GuessGame {
    constructor() {
        // Initialize game state
        this.targetNumber = this.generateRandomNumber(); // The number to guess
        this.attempts = 0; // Track number of guesses
        this.isGameOver = false; // Flag to control game state
        
        // Cache DOM elements for better performance
        this.guessInput = document.getElementById('guessInput'); // Input field for guesses
        this.submitButton = document.getElementById('submitGuess'); // Submit button
        this.feedback = document.getElementById('feedback'); // Feedback display area
        this.attemptCount = document.getElementById('attemptCount'); // Attempts counter display
        this.resetButton = document.getElementById('resetGame'); // Reset game button

        // Set up event listeners when the game initializes
        this.initEventListeners();
    }

    // Generate a random number between 1 and 100
    generateRandomNumber() {
        return Math.floor(Math.random() * 100) + 1; // Math.random() gives 0-0.99, scaled to 1-100
    }

    // Initialize all event listeners for user interactions
    initEventListeners() {
        // Handle click on submit button
        this.submitButton.addEventListener('click', () => this.handleGuess());
        
        // Handle click on reset button
        this.resetButton.addEventListener('click', () => this.resetGame());
        
        // Handle Enter key press in input field
        this.guessInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.handleGuess(); // Trigger guess on Enter
        });
    }

    // Process the user's guess
    handleGuess() {
        // Prevent guessing if game is over
        if (this.isGameOver) return;

        // Convert input value to integer
        const guess = parseInt(this.guessInput.value);
        
        // Validate the input before proceeding
        if (!this.validateInput(guess)) {
            this.showFeedback('Please enter a number between 1 and 100', 'error');
            return;
        }

        // Increment attempts and update display
        this.attempts++;
        this.updateAttempts();

        // Check if guess is correct
        if (guess === this.targetNumber) {
            this.showFeedback(`Congratulations! You won in ${this.attempts} attempts!`, 'success');
            this.endGame(); // End game on win
        } else if (guess < this.targetNumber) {
            this.showFeedback('Too Low! Try again.', 'hint'); // Hint for too low
        } else {
            this.showFeedback('Too High! Try again.', 'hint'); // Hint for too high
        }

        // Clear input and refocus for next guess
        this.guessInput.value = '';
        this.guessInput.focus();
    }

    // Validate the user's input
    validateInput(guess) {
        // Check if guess is a number and within range
        return !isNaN(guess) && guess >= 1 && guess <= 100;
    }

    // Display feedback messages with styling
    showFeedback(message, type) {
        this.feedback.textContent = message; // Set feedback text
        this.feedback.className = 'feedback'; // Reset to base class
        this.feedback.classList.add(type); // Add specific type class (success, error, hint)
        
        // Trigger animation for visual feedback
        this.feedback.style.animation = 'none'; // Reset animation
        this.feedback.offsetHeight; // Force reflow to restart animation
        this.feedback.style.animation = 'pulse 0.3s ease'; // Apply pulse animation
    }

    // Update the attempts counter display
    updateAttempts() {
        this.attemptCount.textContent = this.attempts; // Update DOM with current attempts
    }

    // End the game by disabling inputs
    endGame() {
        this.isGameOver = true; // Set game over flag
        this.submitButton.disabled = true; // Disable submit button
        this.guessInput.disabled = true; // Disable input field
    }

    // Reset game to initial state
    resetGame() {
        this.targetNumber = this.generateRandomNumber(); // Generate new number
        this.attempts = 0; // Reset attempts
        this.isGameOver = false; // Reset game state
        
        // Reset UI elements
        this.guessInput.value = ''; // Clear input
        this.guessInput.disabled = false; // Enable input
        this.submitButton.disabled = false; // Enable submit button
        this.feedback.textContent = ''; // Clear feedback
        this.feedback.className = 'feedback'; // Reset feedback classes
        this.updateAttempts(); // Reset attempts display
        
        this.guessInput.focus(); // Focus input for immediate play
    }
}

// Dynamically add CSS keyframes and styles
const styleSheet = document.createElement('style'); // Create new style element
styleSheet.textContent = `
    /* Define pulse animation for feedback */
    @keyframes pulse {
        0% { transform: scale(1); }    /* Start at normal size */
        50% { transform: scale(1.05); } /* Peak at slightly larger */
        100% { transform: scale(1); }  /* Return to normal */
    }
    
    /* Style feedback based on type */
    .feedback.success { background: rgba(0, 255, 0, 0.2); } /* Green for success */
    .feedback.error { background: rgba(255, 0, 0, 0.2); }   /* Red for error */
    .feedback.hint { background: rgba(0, 0, 0, 0.2); }     /* Gray for hints */
`;
document.head.appendChild(styleSheet); // Add styles to document head

// Initialize game when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    const game = new GuessGame(); // Create new game instance
});