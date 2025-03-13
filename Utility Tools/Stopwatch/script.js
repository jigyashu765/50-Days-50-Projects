// State management
const stopwatchState = {
    time: 0, // Time in milliseconds
    isRunning: false,
    intervalId: null
};

// DOM elements
const timeDisplay = document.getElementById('time-display');
const startBtn = document.getElementById('start-btn');
const stopBtn = document.getElementById('stop-btn');
const resetBtn = document.getElementById('reset-btn');

// Format time to HH:MM:SS
function formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
    const minutes = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
    const seconds = (totalSeconds % 60).toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
}

// Update display
function updateDisplay() {
    timeDisplay.textContent = formatTime(stopwatchState.time);
}

// Start stopwatch
function startStopwatch() {
    if (!stopwatchState.isRunning) {
        stopwatchState.isRunning = true;
        timeDisplay.classList.add('active');
        stopwatchState.intervalId = setInterval(() => {
            stopwatchState.time += 1000;
            updateDisplay();
        }, 1000);
    }
}

// Stop stopwatch
function stopStopwatch() {
    if (stopwatchState.isRunning) {
        stopwatchState.isRunning = false;
        timeDisplay.classList.remove('active');
        clearInterval(stopwatchState.intervalId);
    }
}

// Reset stopwatch
function resetStopwatch() {
    stopStopwatch();
    stopwatchState.time = 0;
    updateDisplay();
}

// Event listeners
startBtn.addEventListener('click', startStopwatch);
stopBtn.addEventListener('click', stopStopwatch);
resetBtn.addEventListener('click', resetStopwatch);

// Initial display
updateDisplay();