// Function to append value to the display
function appendToDisplay(value) {
    const display = document.getElementById('display');
    display.value = display.value + value; // Manually concatenate the value
}

// Function to clear the display
function clearDisplay() {
    const display = document.getElementById('display');
    display.value = ''; // Manually set the value to an empty string
}

// Function to calculate the result
function calculateResult() {
    const display = document.getElementById('display');
    try {
        const result = new Function('return ' + display.value)(); // Evaluate the expression safely
        display.value = result; // Set the result to the display
    } catch (error) {
        display.value = 'Error'; // Handle any errors
    }
}
