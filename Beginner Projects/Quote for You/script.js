// Array of quotes to be displayed
const quotes = [
    "The best way to predict the future is to invent it. - Alan Kay",
    "Life is 10% what happens to us and 90% how we react to it. - Charles R. Swindoll",
    "The only way to do great work is to love what you do. - Steve Jobs",
    "Success is not the key to happiness. Happiness is the key to success. - Albert Schweitzer",
    "You miss 100% of the shots you don't take. - Wayne Gretzky",
    "The purpose of our lives is to be happy. - Dalai Lama",
    "Get busy living or get busy dying. - Stephen King",
    "You have within you right now, everything you need to deal with whatever the world can throw at you. - Brian Tracy"
];

// Array to keep track of recently displayed quotes
let recentQuotes = [];

// Event listener for the button to generate a new quote
document.getElementById('new-quote').addEventListener('click', function() {
    // Check if all quotes have been displayed
    if (recentQuotes.length === quotes.length) {
        recentQuotes = []; // Reset recentQuotes to allow for new selections
    }

    let randomIndex;
    // Generate a random index that hasn't been used recently
    do {
        randomIndex = Math.floor(Math.random() * quotes.length);
    } while (recentQuotes.includes(quotes[randomIndex]));

    // Add the selected quote to recentQuotes
    recentQuotes.push(quotes[randomIndex]);
    // Update the quote displayed in the HTML
    document.getElementById('quote').innerText = quotes[randomIndex];
});
