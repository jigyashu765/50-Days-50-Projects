class SnakeGame {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        if (!this.canvas || !this.canvas.getContext) {
            console.error('Canvas not supported or not found');
            return;
        }
        this.ctx = this.canvas.getContext('2d');
        this.scoreElement = document.getElementById('score');
        this.highScoreElement = document.getElementById('high-score');
        this.gameOverElement = document.getElementById('gameOver');
        this.finalScoreElement = document.getElementById('finalScore');
        this.restartButton = document.getElementById('restart');

        this.gridSize = 20;
        this.tileCount = 20;
        this.canvas.width = this.gridSize * this.tileCount;
        this.canvas.height = this.gridSize * this.tileCount;

        this.state = this.getInitialState();
        this.setupEventListeners();
        this.loadHighScore();
        this.initialDraw();
        this.gameLoop();
    }

    getInitialState() {
        return {
            snake: [{ x: 10, y: 10 }],
            food: this.getRandomPosition(),
            dx: 1,
            dy: 0,
            score: 0,
            gameOver: false,
            lastTime: 0,
            speed: 1000 // Initial speed (milliseconds per update)
        };
    }

    setupEventListeners() {
        document.addEventListener('keydown', this.handleKeyPress.bind(this));
        this.restartButton.addEventListener('click', this.restartGame.bind(this));
    }

    handleKeyPress(event) {
        const key = event.key;
        const head = this.state.snake[0];

        if (key === 'ArrowUp' && this.state.dy === 0) {
            this.state.dx = 0;
            this.state.dy = -1;
        } else if (key === 'ArrowDown' && this.state.dy === 0) {
            this.state.dx = 0;
            this.state.dy = 1;
        } else if (key === 'ArrowLeft' && this.state.dx === 0) {
            this.state.dx = -1;
            this.state.dy = 0;
        } else if (key === 'ArrowRight' && this.state.dx === 0) {
            this.state.dx = 1;
            this.state.dy = 0;
        }
    }

    getRandomPosition() {
        return {
            x: Math.floor(Math.random() * this.tileCount),
            y: Math.floor(Math.random() * this.tileCount)
        };
    }

    increaseSpeed() {
        // Decrease speed as the score increases (minimum speed is 50ms)
        return Math.max(200, 1000 - this.state.score * 5);
    }

    update() {
        if (this.state.gameOver) return;

        const head = { x: this.state.snake[0].x + this.state.dx, y: this.state.snake[0].y + this.state.dy };
        this.state.snake.unshift(head);

        if (head.x === this.state.food.x && head.y === this.state.food.y) {
            this.state.score += 10;
            this.state.food = this.getRandomPosition();
            this.updateScore();
            this.state.speed = this.increaseSpeed(); // Update speed based on score
        } else {
            this.state.snake.pop();
        }

        if (head.x < 0 || head.x >= this.tileCount || head.y < 0 || head.y >= this.tileCount) {
            this.endGame();
            return;
        }

        for (let i = 1; i < this.state.snake.length; i++) {
            if (head.x === this.state.snake[i].x && head.y === this.state.snake[i].y) {
                this.endGame();
                return;
            }
        }
    }

    draw() {
        this.ctx.fillStyle = '#0f0f23';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.fillStyle = '#00cc66';
        this.state.snake.forEach(segment => {
            this.ctx.fillRect(
                segment.x * this.gridSize,
                segment.y * this.gridSize,
                this.gridSize - 2,
                this.gridSize - 2
            );
        });

        this.ctx.fillStyle = '#ff4444';
        this.ctx.beginPath();
        this.ctx.arc(
            this.state.food.x * this.gridSize + this.gridSize / 2,
            this.state.food.y * this.gridSize + this.gridSize / 2,
            this.gridSize / 2 - 2,
            0,
            Math.PI * 2
        );
        this.ctx.fill();
    }

    initialDraw() {
        this.draw();
    }

    gameLoop(timestamp = 0) {
        if (!this.state.gameOver) {
            if (timestamp - this.state.lastTime >= this.state.speed) {
                this.update();
                this.draw();
                this.state.lastTime = timestamp;
            }
            requestAnimationFrame(this.gameLoop.bind(this));
        }
    }

    endGame() {
        this.state.gameOver = true;
        this.finalScoreElement.textContent = this.state.score;
        this.gameOverElement.style.display = 'block';
        this.updateHighScore();
    }

    restartGame() {
        this.gameOverElement.style.display = 'none';
        this.state = this.getInitialState();
        this.updateScore();
        this.initialDraw();
        requestAnimationFrame(this.gameLoop.bind(this));
    }

    updateScore() {
        this.scoreElement.textContent = this.state.score;
    }

    loadHighScore() {
        const highScore = localStorage.getItem('snakeHighScore') || 0;
        this.highScoreElement.textContent = highScore;
    }

    updateHighScore() {
        const highScore = parseInt(localStorage.getItem('snakeHighScore') || 0);
        if (this.state.score > highScore) {
            localStorage.setItem('snakeHighScore', this.state.score);
            this.highScoreElement.textContent = this.state.score;
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    try {
        new SnakeGame();
    } catch (error) {
        console.error('Error initializing SnakeGame:', error);
    }
});