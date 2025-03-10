// Get the button element that triggers the color change
const button = document.getElementById('colorButton');
// Get the paragraph element that displays the current color code
const colorCode = document.getElementById('colorCode');

// Add a click event listener to the button
button.addEventListener('click', () => {
    // Generate a random color when the button is clicked
    const randomColor = getRandomColor();
    // Change the background color of the body to the random color
    document.body.style.backgroundColor = randomColor;
    // Update the text content of the colorCode element to show the current color
    colorCode.textContent = `Current Color: ${randomColor}`;
});

// Function to generate a random hex color
function getRandomColor() {
    // Define the characters used in the hex color code
    const letters = '0123456789ABCDEF';
    // Initialize the color string with a '#' for hex format
    let color = '#';
    // Loop 6 times to create a 6-digit hex color code
    for (let i = 0; i < 6; i++) {
        // Append a random character from the letters string to the color
        color += letters[Math.floor(Math.random() * 16)];
    }
    // Return the generated random color
    return color;
}
