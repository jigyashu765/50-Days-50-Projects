// State management
const gameState = {
    playerScore: 0,
    computerScore: 0,
    choices: ['Rock', 'Paper', 'Scissors'],
    isProcessing: false // To track if a move is being processed
};

// DOM elements
const playerScoreEl = document.getElementById('player-score');
const computerScoreEl = document.getElementById('computer-score');
const resultTextEl = document.getElementById('result-text');
const playerChoiceEl = document.getElementById('player-choice');
const computerChoiceEl = document.getElementById('computer-choice');
const choiceButtons = document.querySelectorAll('.choice');

// Utility function to get computer's choice
function getComputerChoice() {
    const randomIndex = Math.floor(Math.random() * gameState.choices.length);
    return gameState.choices[randomIndex];
}

// Determine winner
function determineWinner(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) return 'Draw';
    if (
        (playerChoice === 'Rock' && computerChoice === 'Scissors') ||
        (playerChoice === 'Paper' && computerChoice === 'Rock') ||
        (playerChoice === 'Scissors' && computerChoice === 'Paper')
    ) {
        gameState.playerScore++;
        return 'You Win!';
    }
    gameState.computerScore++;
    return 'Computer Wins!';
}

// Update UI with animation
function updateUI(playerChoice, computerChoice, result) {
    playerChoiceEl.textContent = playerChoice;
    computerChoiceEl.textContent = computerChoice;
    resultTextEl.textContent = result;

    // Add pulse animation
    playerChoiceEl.classList.add('pulse');
    computerChoiceEl.classList.add('pulse');

    // Update scores
    playerScoreEl.textContent = gameState.playerScore;
    computerScoreEl.textContent = gameState.computerScore;

    // Remove animation after it completes
    setTimeout(() => {
        playerChoiceEl.classList.remove('pulse');
        computerChoiceEl.classList.remove('pulse');
    }, 500);
}

// Show computer's move with a delay
function showComputerMove(playerChoice, computerChoice, result) {
    // Delay to show computer's move
    setTimeout(() => {
        computerChoiceEl.textContent = computerChoice;
        resultTextEl.textContent = result;

        // Update scores
        playerScoreEl.textContent = gameState.playerScore;
        computerScoreEl.textContent = gameState.computerScore;

        // Add pulse animation
        playerChoiceEl.classList.add('pulse');
        computerChoiceEl.classList.add('pulse');

        // Remove animation after it completes
        setTimeout(() => {
            playerChoiceEl.classList.remove('pulse');
            computerChoiceEl.classList.remove('pulse');
        }, 500);

        // Allow the player to make another move after a short delay
        setTimeout(() => {
            gameState.isProcessing = false;
            resultTextEl.textContent = 'Make your move!';
            playerChoiceEl.textContent = '?';
            computerChoiceEl.textContent = '?';
        }, 1500); // 1.5 seconds delay before resetting
    }, 1000); // 1 second delay to show computer's move
}

// Event handling
function handleChoice(event) {
    if (gameState.isProcessing) return; // Prevent multiple clicks
    gameState.isProcessing = true;

    const playerChoice = event.target.textContent;
    const computerChoice = getComputerChoice();
    const result = determineWinner(playerChoice, computerChoice);

    // Show player's choice immediately
    playerChoiceEl.textContent = playerChoice;
    resultTextEl.textContent = 'Waiting for computer...';

    // Show computer's move and result after a delay
    showComputerMove(playerChoice, computerChoice, result);
}

// Add event listeners to choice buttons
choiceButtons.forEach(button => {
    button.addEventListener('click', handleChoice);
});