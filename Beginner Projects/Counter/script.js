// Initialize the count variable to keep track of the current counter value
let count = 0;

// Get references to the DOM elements for displaying the counter and buttons
const counterDisplay = document.getElementById('counter');
const incrementButton = document.getElementById('increment');
const decrementButton = document.getElementById('decrement');
const resetButton = document.getElementById('reset');

// Add event listener for the increment button to increase the count
incrementButton.addEventListener('click', () => {
    count++; // Increment the count by 1
    updateDisplay(); // Update the displayed counter value
});

// Add event listener for the decrement button to decrease the count
decrementButton.addEventListener('click', () => {
    count--; // Decrement the count by 1
    updateDisplay(); // Update the displayed counter value
});

// Add event listener for the reset button to reset the count to zero
resetButton.addEventListener('click', () => {
    count = 0; // Reset the count to 0
    updateDisplay(); // Update the displayed counter value
});

// Function to update the counter display with the current count value
function updateDisplay() {
    counterDisplay.textContent = count; // Set the text content of the counter display
}
