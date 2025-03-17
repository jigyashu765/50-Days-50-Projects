// State management
const state = {
    score: 0,
    timeLeft: 30,
    isPlaying: false,
    moleInterval: null,
    timerInterval: null,
    moleSpeed: 1200, // Initial mole appearance speed
};

// DOM elements
const elements = {
    score: document.getElementById('score'),
    timeLeft: document.getElementById('timeLeft'),
    startBtn: document.getElementById('startBtn'),
    gameBoard: document.getElementById('gameBoard'),
    moles: document.querySelectorAll('.mole'),
    hitSound: document.getElementById('hitSound'),
};

// Random mole selection
const getRandomMole = () => elements.moles[Math.floor(Math.random() * elements.moles.length)];

// Show/hide mole
const showMole = () => {
    const mole = getRandomMole();
    mole.classList.add('active');
    setTimeout(() => mole.classList.remove('active'), 800); // Mole stays visible for 800ms
};

// Update score
const updateScore = () => {
    state.score++;
    elements.score.textContent = state.score;
    elements.score.classList.add('score-update'); // Add visual feedback
    setTimeout(() => elements.score.classList.remove('score-update'), 200); // Remove feedback after 200ms
};

// Start game
const startGame = () => {
    if (state.isPlaying) return;
    state.isPlaying = true;
    state.score = 0;
    state.timeLeft = 30;
    state.moleSpeed = 1200; // Reset mole speed
    elements.score.textContent = state.score;
    elements.timeLeft.textContent = state.timeLeft;
    elements.startBtn.textContent = 'Playing...';
    elements.startBtn.disabled = true;

    state.moleInterval = setInterval(() => {
        showMole();
        if (state.moleSpeed > 600) state.moleSpeed -= 50; // Increase difficulty
    }, state.moleSpeed);

    state.timerInterval = setInterval(() => {
        state.timeLeft--;
        elements.timeLeft.textContent = state.timeLeft;
        if (state.timeLeft <= 0) endGame();
    }, 1000);
};

// End game
const endGame = () => {
    clearInterval(state.moleInterval);
    clearInterval(state.timerInterval);
    state.isPlaying = false;
    elements.startBtn.textContent = 'Start Game';
    elements.startBtn.disabled = false;
    alert(`Game Over! Your score: ${state.score}`);
};

// Handle mole click
const handleMoleClick = (e) => {
    if (!state.isPlaying || !e.target.classList.contains('active')) return;
    e.target.classList.remove('active');
    updateScore();
    elements.hitSound.play().catch(err => console.error('Audio play failed:', err));
};

// Event listeners
elements.startBtn.addEventListener('click', startGame);
elements.moles.forEach(mole => mole.addEventListener('click', handleMoleClick));