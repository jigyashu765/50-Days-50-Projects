class HangmanGame {
    constructor() {
        this.words = ['javascript', 'developer', 'programming', 'interface', 'algorithm'];
        this.maxAttempts = 6;
        this.state = {
            currentWord: '',
            guessedLetters: new Set(),
            attemptsLeft: this.maxAttempts
        };
        
        // DOM Elements
        this.wordDisplay = document.getElementById('wordDisplay');
        this.attemptsLeft = document.getElementById('attemptsLeft');
        this.keyboard = document.getElementById('keyboard');
        this.message = document.getElementById('message');
        this.restartBtn = document.getElementById('restartBtn');
        this.hangmanParts = document.querySelectorAll('.hangman-svg > *');

        this.initializeGame();
        this.setupEventListeners();
    }

    initializeGame() {
        this.state.currentWord = this.words[Math.floor(Math.random() * this.words.length)];
        this.state.guessedLetters.clear();
        this.state.attemptsLeft = this.maxAttempts;
        
        this.updateDisplay();
        this.createKeyboard();
        this.resetHangman();
    }

    updateDisplay() {
        const displayWord = this.state.currentWord
            .split('')
            .map(letter => this.state.guessedLetters.has(letter) ? letter : '_')
            .join(' ');
        
        this.wordDisplay.textContent = displayWord;
        this.attemptsLeft.textContent = `Attempts left: ${this.state.attemptsLeft}`;
        this.updateHangman();
        this.checkGameStatus();
    }

    createKeyboard() {
        this.keyboard.innerHTML = '';
        const alphabet = 'abcdefghijklmnopqrstuvwxyz';
        
        alphabet.split('').forEach(letter => {
            const button = document.createElement('button');
            button.textContent = letter;
            button.className = 'key';
            button.addEventListener('click', () => this.handleGuess(letter));
            this.keyboard.appendChild(button);
        });
    }

    handleGuess(letter) {
        if (!this.state.guessedLetters.has(letter)) {
            this.state.guessedLetters.add(letter);
            
            if (!this.state.currentWord.includes(letter)) {
                this.state.attemptsLeft--;
            }
            
            this.updateDisplay();
            this.keyboard.querySelectorAll('.key').forEach(btn => {
                if (btn.textContent === letter) {
                    btn.disabled = true;
                }
            });
        }
    }

    updateHangman() {
        const partsToShow = this.maxAttempts - this.state.attemptsLeft;
        this.hangmanParts.forEach((part, index) => {
            part.style.opacity = index < partsToShow ? 1 : 0;
        });
    }

    resetHangman() {
        this.hangmanParts.forEach(part => part.style.opacity = 0);
    }

    checkGameStatus() {
        const wordGuessed = this.state.currentWord
            .split('')
            .every(letter => this.state.guessedLetters.has(letter));
            
        if (wordGuessed) {
            this.message.textContent = 'You Won! 🎉';
            this.disableKeyboard();
        } else if (this.state.attemptsLeft <= 0) {
            this.message.textContent = `Game Over! The word was: ${this.state.currentWord}`;
            this.disableKeyboard();
        } else {
            this.message.textContent = '';
        }
    }

    disableKeyboard() {
        this.keyboard.querySelectorAll('.key').forEach(btn => {
            btn.disabled = true;
        });
    }

    setupEventListeners() {
        this.restartBtn.addEventListener('click', () => this.initializeGame());
        document.addEventListener('keydown', (e) => {
            if (/^[a-z]$/.test(e.key.toLowerCase()) && this.state.attemptsLeft > 0) {
                this.handleGuess(e.key.toLowerCase());
            }
        });
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new HangmanGame();
});