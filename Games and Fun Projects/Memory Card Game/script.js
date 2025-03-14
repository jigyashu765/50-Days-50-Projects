class MemoryGame {
    constructor() {
        this.cards = [];
        this.flippedCards = [];
        this.matches = 0;
        this.score = 0;
        this.moves = 0;
        this.totalPairs = 8;
        this.gameGrid = document.getElementById('gameGrid');
        this.scoreElement = document.getElementById('score');
        this.matchesElement = document.getElementById('matches');
        this.timerElement = document.getElementById('timer');
        this.movesElement = document.getElementById('moves');
        this.restartBtn = document.getElementById('restartBtn');
        this.winOverlay = document.getElementById('winOverlay');
        this.finalScoreElement = document.getElementById('finalScore');
        this.finalTimeElement = document.getElementById('finalTime');
        this.finalMovesElement = document.getElementById('finalMoves');
        this.playAgainBtn = document.getElementById('playAgainBtn');
        this.startTime = null;
        this.timerInterval = null;

        this.init();
    }

    init() {
        this.bindEvents();
        this.createCards();
        this.shuffleCards();
        this.renderCards();
        this.startTimer();
    }

    bindEvents() {
        this.restartBtn.addEventListener('click', () => this.restart());
        this.playAgainBtn.addEventListener('click', () => this.restart());
    }

    startTimer() {
        this.startTime = Date.now();
        this.timerInterval = setInterval(() => {
            const elapsedTime = Math.floor((Date.now() - this.startTime) / 1000);
            const minutes = Math.floor(elapsedTime / 60).toString().padStart(2, '0');
            const seconds = (elapsedTime % 60).toString().padStart(2, '0');
            this.timerElement.textContent = `${minutes}:${seconds}`;
        }, 1000);
    }

    stopTimer() {
        clearInterval(this.timerInterval);
    }

    createCards() {
        const symbols = ['♠', '♣', '♥', '♦', '★', '●', '▲', '■'];
        const cardPairs = [...symbols, ...symbols];
        this.cards = cardPairs.map((symbol, index) => ({
            id: index,
            symbol,
            isFlipped: false,
            isMatched: false
        }));
    }

    shuffleCards() {
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
    }

    renderCards() {
        this.gameGrid.innerHTML = '';
        this.cards.forEach(card => {
            const cardElement = document.createElement('div');
            cardElement.classList.add('card');
            cardElement.dataset.id = card.id;

            const front = document.createElement('div');
            front.classList.add('card-front');
            front.textContent = card.symbol;

            const back = document.createElement('div');
            back.classList.add('card-back');

            cardElement.appendChild(front);
            cardElement.appendChild(back);
            cardElement.addEventListener('click', () => this.handleCardClick(card, cardElement));
            
            this.gameGrid.appendChild(cardElement);
        });
    }

    handleCardClick(card, cardElement) {
        if (this.flippedCards.length >= 2 || card.isFlipped || card.isMatched) return;

        card.isFlipped = true;
        cardElement.classList.add('flipped');
        this.flippedCards.push({ card, element: cardElement });
        this.updateScore(-10); // Small penalty for each flip
        this.moves++;
        this.movesElement.textContent = this.moves;

        if (this.flippedCards.length === 2) {
            this.checkMatch();
        }
    }

    checkMatch() {
        const [card1, card2] = this.flippedCards;
        
        if (card1.card.symbol === card2.card.symbol) {
            card1.card.isMatched = card2.card.isMatched = true;
            this.matches++;
            this.updateScore(100);
            this.matchesElement.textContent = this.matches;
            this.flippedCards = [];
            
            if (this.matches === this.totalPairs) {
                this.showWinScreen();
            }
        } else {
            setTimeout(() => {
                card1.element.classList.remove('flipped');
                card2.element.classList.remove('flipped');
                card1.card.isFlipped = card2.card.isFlipped = false;
                this.flippedCards = [];
            }, 1000);
        }
    }

    updateScore(points) {
        this.score = Math.max(0, this.score + points);
        this.scoreElement.textContent = this.score;
    }

    flipCard(card) {
        const cardElement = document.querySelector(`[data-id="${card.id}"]`);
        card.isFlipped = true;
        cardElement.classList.add('flipped');
    }

    showWinScreen() {
        this.stopTimer();
        this.finalScoreElement.textContent = this.score;
        this.finalTimeElement.textContent = this.timerElement.textContent;
        this.finalMovesElement.textContent = this.moves;
        this.winOverlay.style.display = 'flex';
    }

    restart() {
        // Reset game state
        this.matches = 0;
        this.score = 0;
        this.moves = 0;
        this.flippedCards = [];
        this.matchesElement.textContent = '0';
        this.scoreElement.textContent = '0';
        this.movesElement.textContent = '0';
        this.winOverlay.style.display = 'none';

        // Stop and reset the timer
        this.stopTimer();
        this.timerElement.textContent = '00:00';

        // Reinitialize the game
        this.createCards();
        this.shuffleCards();
        this.renderCards();
        this.startTimer();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new MemoryGame();
});