class PongGame {
    constructor() {
        // DOM Elements
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.scoreDisplay = document.getElementById('score');
        this.restartBtn = document.getElementById('restartBtn');

        // Game Settings
        this.canvas.width = 600;
        this.canvas.height = 400;
        this.gameState = {
            paddle: { x: 250, y: 360, width: 100, height: 20, speed: 8 },
            ball: { x: 300, y: 200, radius: 10, dx: 4, dy: -4 },
            score: 0,
            gameOver: false
        };

        // Bind methods
        this.update = this.update.bind(this);
        this.handleMouseMove = this.handleMouseMove.bind(this);

        this.initializeGame();
        this.setupEventListeners();
    }

    initializeGame() {
        this.gameState.score = 0;
        this.gameState.gameOver = false;
        this.resetBall();
        this.updateScore();
        this.gameLoop();
    }

    resetBall() {
        this.gameState.ball.x = this.canvas.width / 2;
        this.gameState.ball.y = this.canvas.height / 2;
        this.gameState.ball.dx = 4 * (Math.random() > 0.5 ? 1 : -1);
        this.gameState.ball.dy = -4;
    }

    setupEventListeners() {
        document.addEventListener('keydown', (e) => this.handleKeyPress(e));
        this.canvas.addEventListener('mousemove', this.handleMouseMove);
        this.restartBtn.addEventListener('click', () => this.initializeGame());
    }

    handleKeyPress(e) {
        if (!this.gameState.gameOver) {
            const paddle = this.gameState.paddle;
            if (e.key === 'ArrowLeft' && paddle.x > 0) {
                paddle.x -= paddle.speed;
            } else if (e.key === 'ArrowRight' && paddle.x < this.canvas.width - paddle.width) {
                paddle.x += paddle.speed;
            }
        }
    }

    handleMouseMove(e) {
        if (!this.gameState.gameOver) {
            const rect = this.canvas.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const paddle = this.gameState.paddle;
            paddle.x = Math.max(0, Math.min(mouseX - paddle.width / 2, this.canvas.width - paddle.width));
        }
    }

    update() {
        if (this.gameState.gameOver) return;

        // Ball movement
        const ball = this.gameState.ball;
        ball.x += ball.dx;
        ball.y += ball.dy;

        // Wall collision
        if (ball.x + ball.radius > this.canvas.width || ball.x - ball.radius < 0) {
            ball.dx = -ball.dx;
        }
        if (ball.y - ball.radius < 0) {
            ball.dy = -ball.dy;
        }

        // Paddle collision
        const paddle = this.gameState.paddle;
        if (
            ball.y + ball.radius > paddle.y &&
            ball.x > paddle.x &&
            ball.x < paddle.x + paddle.width
        ) {
            ball.dy = -Math.abs(ball.dy);
            this.gameState.score++;
            this.updateScore();
            // Increase difficulty
            ball.dx *= 1.05;
            ball.dy *= 1.05;
        }

        // Game over
        if (ball.y + ball.radius > this.canvas.height) {
            this.gameState.gameOver = true;
        }

        this.draw();
        requestAnimationFrame(this.update);
    }

    draw() {
        const ctx = this.ctx;
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw paddle
        ctx.fillStyle = '#3498db';
        ctx.fillRect(
            this.gameState.paddle.x,
            this.gameState.paddle.y,
            this.gameState.paddle.width,
            this.gameState.paddle.height
        );

        // Draw ball
        ctx.beginPath();
        ctx.arc(
            this.gameState.ball.x,
            this.gameState.ball.y,
            this.gameState.ball.radius,
            0,
            Math.PI * 2
        );
        ctx.fillStyle = '#e74c3c';
        ctx.fill();
        ctx.closePath();

        // Draw game over message
        if (this.gameState.gameOver) {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
            ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            ctx.fillStyle = '#fff';
            ctx.font = '30px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(
                `Game Over! Score: ${this.gameState.score}`,
                this.canvas.width / 2,
                this.canvas.height / 2
            );
        }
    }

    updateScore() {
        this.scoreDisplay.textContent = `Score: ${this.gameState.score}`;
    }

    gameLoop() {
        this.update();
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new PongGame();
});