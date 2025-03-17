// State management
const state = {
    timeLeft: 0,
    timerId: null,
    isRunning: false,
};

// DOM elements
const elements = {
    hoursInput: document.getElementById('hours'),
    minutesInput: document.getElementById('minutes'),
    secondsInput: document.getElementById('seconds'),
    startBtn: document.getElementById('startBtn'),
    resetBtn: document.getElementById('resetBtn'),
    timerDisplay: document.getElementById('timerDisplay'),
    displayHours: document.getElementById('displayHours'),
    displayMinutes: document.getElementById('displayMinutes'),
    displaySeconds: document.getElementById('displaySeconds'),
    notification: document.getElementById('notification'),
    alarmSound: document.getElementById('alarmSound'),
};

// Utility function to format time
const formatTime = (time) => String(time).padStart(2, '0');

// Update display
const updateDisplay = () => {
    const hours = Math.floor(state.timeLeft / 3600);
    const minutes = Math.floor((state.timeLeft % 3600) / 60);
    const seconds = state.timeLeft % 60;
    elements.displayHours.textContent = formatTime(hours);
    elements.displayMinutes.textContent = formatTime(minutes);
    elements.displaySeconds.textContent = formatTime(seconds);
};

// Start timer
const startTimer = () => {
    if (state.isRunning || state.timeLeft <= 0) return;

    state.isRunning = true;
    elements.timerDisplay.classList.add('active');
    elements.startBtn.textContent = 'Pause';
    
    state.timerId = setInterval(() => {
        if (state.timeLeft > 0) {
            state.timeLeft--;
            updateDisplay();
        } else {
            clearInterval(state.timerId);
            state.isRunning = false;
            elements.timerDisplay.classList.remove('active');
            elements.startBtn.textContent = 'Start';
            elements.notification.style.display = 'block';
            elements.alarmSound.play().catch(err => console.error('Audio play failed:', err));
        }
    }, 1000);
};

// Pause timer
const pauseTimer = () => {
    clearInterval(state.timerId);
    state.isRunning = false;
    elements.timerDisplay.classList.remove('active');
    elements.startBtn.textContent = 'Start';
};

// Reset timer
const resetTimer = () => {
    clearInterval(state.timerId);
    state.isRunning = false;
    state.timeLeft = 0;
    elements.timerDisplay.classList.remove('active');
    elements.startBtn.textContent = 'Start';
    elements.notification.style.display = 'none';
    elements.hoursInput.value = '';
    elements.minutesInput.value = '';
    elements.secondsInput.value = '';
    updateDisplay();
};

// Event listeners
elements.startBtn.addEventListener('click', () => {
    if (!state.isRunning) {
        const hours = parseInt(elements.hoursInput.value) || 0;
        const minutes = parseInt(elements.minutesInput.value) || 0;
        const seconds = parseInt(elements.secondsInput.value) || 0;
        state.timeLeft = hours * 3600 + minutes * 60 + seconds;
        updateDisplay();
        startTimer();
    } else {
        pauseTimer();
    }
});

elements.resetBtn.addEventListener('click', resetTimer);

// Input validation
[elements.hoursInput, elements.minutesInput, elements.secondsInput].forEach(input => {
    input.addEventListener('input', () => {
        if (input.value < 0) input.value = 0;
        if (input === elements.minutesInput || input === elements.secondsInput) {
            if (input.value > 59) input.value = 59;
        }
    });
});