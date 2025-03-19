document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const gridSizeInput = document.getElementById('gridSize');
    const resetGridBtn = document.getElementById('resetGrid');
    const COLORS = [
        '#00ddeb', '#ff00cc', '#ff6b6b', '#00ff9f', '#ffcc00', '#8a2be2'
    ];

    let gridSize = parseInt(gridSizeInput.value);

    // Create initial grid
    createGrid(gridSize);

    // Reset grid on button click
    resetGridBtn.addEventListener('click', () => {
        gridSize = Math.min(Math.max(parseInt(gridSizeInput.value), 5), 30);
        gridSizeInput.value = gridSize;
        createGrid(gridSize);
    });

    // Ensure grid size stays within bounds
    gridSizeInput.addEventListener('input', () => {
        gridSize = Math.min(Math.max(parseInt(gridSizeInput.value), 5), 30);
        gridSizeInput.value = gridSize;
    });

    function createGrid(size) {
        board.innerHTML = ''; // Clear existing grid
        board.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
        board.style.gridTemplateRows = `repeat(${size}, 1fr)`;

        const squareSize = Math.min(500 / size, 50); // Limit max size for responsiveness
        for (let i = 0; i < size * size; i++) {
            const square = document.createElement('div');
            square.classList.add('square');
            square.style.width = `${squareSize}px`;
            square.style.height = `${squareSize}px`;

            square.addEventListener('mouseover', () => setColor(square));
            square.addEventListener('mouseout', () => removeColor(square));

            board.appendChild(square);
        }
    }

    function setColor(element) {
        const color = getRandomColor();
        element.style.background = color;
        element.style.boxShadow = `0 0 10px ${color}, 0 0 20px ${color}`;
    }

    function removeColor(element) {
        setTimeout(() => {
            element.style.background = 'rgba(255, 255, 255, 0.05)';
            element.style.boxShadow = 'none';
        }, 500); // Fade back after 0.5s
    }

    function getRandomColor() {
        return COLORS[Math.floor(Math.random() * COLORS.length)];
    }
});