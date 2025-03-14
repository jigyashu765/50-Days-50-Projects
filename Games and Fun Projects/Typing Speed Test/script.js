class TypingTest {
    constructor() {
        this.textDisplay = document.getElementById('textDisplay');
        this.textSlider = document.getElementById('textSlider');
        this.inputArea = document.getElementById('inputArea');
        this.startBtn = document.getElementById('startBtn');
        this.timerElement = document.getElementById('timer');
        this.wpmElement = document.getElementById('wpm');
        this.accuracyElement = document.getElementById('accuracy');
        this.highScoreElement = document.getElementById('highScore');
        this.resultsOverlay = document.getElementById('resultsOverlay');
        this.finalWpmElement = document.getElementById('finalWpm');
        this.finalAccuracyElement = document.getElementById('finalAccuracy');
        this.restartBtn = document.getElementById('restartBtn');
        this.difficultySelect = document.getElementById('difficulty');
        this.caseSelect = document.getElementById('case');
        this.progressBar = document.getElementById('progress');

        this.charSets = {
            1: 'asdfghjkl',
            2: 'qwertyuiop',
            3: 'zxcvbnm',
            4: 'abcdefghijklmnopqrstuvwxyz.,!?@#$%^&*()',
            5: '0123456789'
        };
        this.timeLeft = 60;
        this.timer = null;
        this.isTestRunning = false;
        this.correctChars = 0;
        this.totalChars = 0;
        this.highScore = localStorage.getItem('highScore') || 0;
        this.sampleText = '';
        this.displayedTextLength = 200; // Initial text length
        this.charWidth = 12; // Approximate width of a character in pixels
        this.visibleChars = 0; // Number of visible characters in the display area
        this.slideThreshold = 0.8; // Slide when 80% of the text is typed

        this.init();
    }

    init() {
        this.bindEvents();
        this.highScoreElement.textContent = this.highScore;
        this.generateRandomText();
        this.renderText();
        this.calculateVisibleChars();
    }

    bindEvents() {
        this.startBtn.addEventListener('click', () => this.startTest());
        this.inputArea.addEventListener('input', () => this.handleInput());
        this.restartBtn.addEventListener('click', () => this.resetTest());
        this.difficultySelect.addEventListener('change', () => {
            this.generateRandomText();
            this.renderText();
        });
        this.caseSelect.addEventListener('change', () => {
            this.generateRandomText();
            this.renderText();
        });
        window.addEventListener('resize', () => this.calculateVisibleChars());
    }

    calculateVisibleChars() {
        const containerWidth = this.textDisplay.offsetWidth;
        this.visibleChars = Math.floor(containerWidth / this.charWidth);
    }

    generateRandomText() {
        const difficulty = this.difficultySelect.value;
        const caseOption = this.caseSelect.value;
        const charSet = this.charSets[difficulty];
        let text = '';
        let lastWasSpace = false;

        for (let i = 0; i < this.displayedTextLength; i++) {
            if (Math.random() < 0.2 && text.length > 0 && !lastWasSpace) {
                text += ' ';
                lastWasSpace = true;
            } else {
                const randomChar = charSet[Math.floor(Math.random() * charSet.length)];
                text += this.applyCase(randomChar, caseOption);
                lastWasSpace = false;
            }
        }

        this.sampleText = text;
    }

    applyCase(char, caseOption) {
        if (caseOption === 'lowercase') return char.toLowerCase();
        if (caseOption === 'uppercase') return char.toUpperCase();
        return Math.random() > 0.5 ? char.toUpperCase() : char.toLowerCase();
    }

    renderText() {
        this.textSlider.innerHTML = this.sampleText.split('').map(char => `<span>${char}</span>`).join('');
    }

    startTest() {
        if (this.isTestRunning) return;
        
        this.isTestRunning = true;
        this.inputArea.disabled = false;
        this.inputArea.focus();
        this.startBtn.style.display = 'none';
        this.timeLeft = 60;
        this.correctChars = 0;
        this.totalChars = 0;
        this.inputArea.value = '';
        this.generateRandomText();
        this.renderText();

        this.timer = setInterval(() => this.updateTimer(), 1000);
    }

    updateTimer() {
        this.timeLeft--;
        this.timerElement.textContent = this.timeLeft;

        if (this.timeLeft <= 0) {
            this.endTest();
        }
    }

    handleInput() {
        const inputText = this.inputArea.value;
        const textSpans = this.textSlider.querySelectorAll('span');
        
        textSpans.forEach((span, index) => {
            span.classList.remove('correct', 'incorrect', 'current');
            if (index < inputText.length) {
                const isCorrect = inputText[index] === span.textContent;
                span.classList.add(isCorrect ? 'correct' : 'incorrect');
            } else if (index === inputText.length) {
                span.classList.add('current');
            }
        });

        this.totalChars = inputText.length;
        this.correctChars = Array.from(textSpans)
            .slice(0, inputText.length)
            .filter((span, i) => span.textContent === inputText[i]).length;

        this.slideText(inputText.length);

        if (inputText.length > this.sampleText.length - 50) {
            this.appendMoreText();
        }

        this.updateStats();
        this.updateProgressBar();
    }

    slideText(currentPosition) {
        const containerWidth = this.textDisplay.offsetWidth;
        const textWidth = this.sampleText.length * this.charWidth;
        const visibleChars = this.visibleChars;
        const triggerPoint = Math.floor(visibleChars * this.slideThreshold); // Slide when 80% of visible text is typed

        if (currentPosition > triggerPoint) {
            const scrollPosition = (currentPosition - triggerPoint) * this.charWidth;
            const maxScroll = Math.max(0, textWidth - containerWidth);
            this.textSlider.style.transform = `translateX(-${Math.min(scrollPosition, maxScroll)}px)`;
        } else {
            this.textSlider.style.transform = 'translateX(0)';
        }
    }

    appendMoreText() {
        const difficulty = this.difficultySelect.value;
        const caseOption = this.caseSelect.value;
        const charSet = this.charSets[difficulty];
        let additionalText = '';
        let lastWasSpace = this.sampleText.endsWith(' ');

        for (let i = 0; i < 50; i++) {
            if (Math.random() < 0.2 && additionalText.length > 0 && !lastWasSpace) {
                additionalText += ' ';
                lastWasSpace = true;
            } else {
                const randomChar = charSet[Math.floor(Math.random() * charSet.length)];
                additionalText += this.applyCase(randomChar, caseOption);
                lastWasSpace = false;
            }
        }

        this.sampleText += additionalText;
        this.renderText();
        this.reapplyStyles(this.inputArea.value);
    }

    reapplyStyles(inputText) {
        const textSpans = this.textSlider.querySelectorAll('span');
        textSpans.forEach((span, index) => {
            span.classList.remove('correct', 'incorrect', 'current');
            if (index < inputText.length) {
                span.classList.add(inputText[index] === span.textContent ? 'correct' : 'incorrect');
            } else if (index === inputText.length) {
                span.classList.add('current');
            }
        });
        this.slideText(inputText.length);
    }

    updateStats() {
        const elapsedTime = (60 - this.timeLeft) / 60;
        const wpm = elapsedTime > 0 ? Math.round((this.correctChars / 5) / elapsedTime) : 0;
        const accuracy = this.totalChars > 0 ? Math.round((this.correctChars / this.totalChars) * 100) : 0;

        this.wpmElement.textContent = wpm;
        this.accuracyElement.textContent = `${accuracy}%`;

        if (wpm > this.highScore) {
            this.highScore = wpm;
            localStorage.setItem('highScore', this.highScore);
            this.highScoreElement.textContent = this.highScore;
        }
    }

    updateProgressBar() {
        const progress = (this.correctChars / this.displayedTextLength) * 100;
        this.progressBar.style.width = `${Math.min(progress, 100)}%`;
    }

    endTest() {
        clearInterval(this.timer);
        this.isTestRunning = false;
        this.inputArea.disabled = true;
        
        const elapsedTime = 1;
        const wpm = Math.round((this.correctChars / 5) / elapsedTime);
        const accuracy = this.totalChars > 0 ? Math.round((this.correctChars / this.totalChars) * 100) : 0;

        this.finalWpmElement.textContent = wpm;
        this.finalAccuracyElement.textContent = `${accuracy}%`;
        this.resultsOverlay.style.display = 'flex';
    }

    resetTest() {
        this.resultsOverlay.style.display = 'none';
        this.startBtn.style.display = 'block';
        this.timerElement.textContent = '60';
        this.wpmElement.textContent = '0';
        this.accuracyElement.textContent = '0%';
        this.inputArea.value = '';
        this.inputArea.disabled = true;
        this.progressBar.style.width = '0%';
        this.textSlider.style.transform = 'translateX(0)';
        this.generateRandomText();
        this.renderText();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new TypingTest();
});