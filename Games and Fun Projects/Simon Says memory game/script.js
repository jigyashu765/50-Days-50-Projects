class SimonGame {
    constructor() {
        this.sequence = [];
        this.playerSequence = [];
        this.score = 0;
        this.highScore = parseInt(localStorage.getItem('highScore')) || 0;
        this.isPlaying = false;
        this.sounds = [
            new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'),
            new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3'),
            new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3'),
            new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3')
        ];

        // DOM Elements
        this.pads = document.querySelectorAll('.color-pad');
        this.scoreDisplay = document.getElementById('score');
        this.highScoreDisplay = document.getElementById('high-score');
        this.messageDisplay = document.getElementById('message');
        this.startButton = document.getElementById('start-btn');
        this.startText = document.getElementById('start-text');
        this.loadingSpinner = document.getElementById('loading-spinner');

        // Bind methods
        this.handlePadClick = this.handlePadClick.bind(this);
        this.startGame = this.startGame.bind(this);

        // Initialize
        this.setupEventListeners();
        this.updateScoreDisplay();
        console.log('SimonGame initialized!'); // Debugging
    }

    setupEventListeners() {
        this.pads.forEach(pad => pad.addEventListener('click', this.handlePadClick));
        this.startButton.addEventListener('click', this.startGame);
        console.log('Event listeners set up!'); // Debugging
    }

    startGame() {
        console.log('Start Game button clicked!'); // Debugging
        if (this.isPlaying) return;
        this.isPlaying = true;
        this.sequence = [];
        this.playerSequence = [];
        this.score = 0;
        this.startButton.disabled = true;
        this.startText.classList.add('hidden');
        this.loadingSpinner.classList.remove('hidden');
        this.messageDisplay.textContent = 'Get ready...';
        this.updateScoreDisplay();

        setTimeout(() => {
            this.nextRound();
            this.startText.classList.remove('hidden');
            this.loadingSpinner.classList.add('hidden');
        }, 2000); // Add a 2-second delay before starting
    }

    nextRound() {
        this.playerSequence = [];
        this.sequence.push(Math.floor(Math.random() * 4));
        this.playSequence();
    }

    async playSequence() {
        this.pads.forEach(pad => pad.style.pointerEvents = 'none');
        
        for (const color of this.sequence) {
            await this.playColor(color);
        }
        
        this.pads.forEach(pad => pad.style.pointerEvents = 'auto');
        this.messageDisplay.textContent = 'Your turn!';
    }

    playColor(color) {
        return new Promise(resolve => {
            const pad = this.pads[color];
            pad.classList.add('active');
            this.sounds[color].play();
            
            setTimeout(() => {
                pad.classList.remove('active');
                setTimeout(resolve, 200);
            }, 500);
        });
    }

    handlePadClick(e) {
        if (!this.isPlaying) return;

        const color = parseInt(e.target.dataset.color);
        this.playerSequence.push(color);
        this.playColor(color);

        if (!this.checkSequence()) {
            this.gameOver();
            return;
        }

        if (this.playerSequence.length === this.sequence.length) {
            this.score++;
            this.updateScoreDisplay();
            this.messageDisplay.textContent = 'Good job! Next round...';
            setTimeout(() => this.nextRound(), 1000);
        }
    }

    checkSequence() {
        return this.playerSequence.every((color, index) => 
            color === this.sequence[index]);
    }

    gameOver() {
        this.isPlaying = false;
        this.startButton.disabled = false;
        this.messageDisplay.textContent = 'Game Over! Press Start to try again.';
        
        if (this.score > this.highScore) {
            this.highScore = this.score;
            localStorage.setItem('highScore', this.highScore);
            this.highScoreDisplay.textContent = this.highScore;
        }
    }

    updateScoreDisplay() {
        this.scoreDisplay.textContent = this.score;
        this.highScoreDisplay.textContent = this.highScore;
    }
}

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const game = new SimonGame();
    console.log('Game initialized!'); // Debugging
});