let boardState = Array(9).fill(null);
const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
const previousWinner = sessionStorage.getItem('previousWinner');
let currentTurn = previousWinner ? previousWinner : 'X';
let scores = { X: 0, O: 0 };

document.addEventListener('DOMContentLoaded', () => {
    updateDraggableStatus();
    loadScores();
    displayScores();
    const previousWinner = sessionStorage.getItem('previousWinner');
    if (previousWinner) {
        currentTurn = previousWinner;
    }
});

function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    if ((currentTurn === 'X' && event.target.classList.contains('cross')) ||
        (currentTurn === 'O' && event.target.classList.contains('circle'))) {
        event.dataTransfer.setData("text", event.target.id);
    }
}

function drop(event) {
    event.preventDefault();
    const data = event.dataTransfer.getData("text");
    const target = event.target;
    if (!target.hasChildNodes() && target.classList.contains('drop-box')) {
        const draggedElement = document.getElementById(data);
        target.appendChild(draggedElement);
        updateBoardState(target.dataset.position, data);
        draggedElement.setAttribute('draggable', 'false');
        draggedElement.style.pointerEvents = 'none';
        checkWinner();
        switchTurn();
    }
}

function updateBoardState(position, data) {
    const marker = data.includes('cross') ? 'X' : 'O';
    boardState[position] = marker;
}

function checkWinner() {
    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            updateScore(boardState[a]);
            sessionStorage.setItem('previousWinner', boardState[a]);
            setTimeout(() => alert(`${boardState[a]} wins!`), 10);
            return;
        }
    }
    if (boardState.every(cell => cell)) {
        setTimeout(() => alert("It's a draw!"), 10);
        window.location.reload();
    }
}

function switchTurn() {
    currentTurn = currentTurn === 'X' ? 'O' : 'X';
    updateDraggableStatus();
}

function updateDraggableStatus() {
    document.querySelectorAll('.cross').forEach(cross => {
        cross.setAttribute('draggable', currentTurn === 'X');
    });
    document.querySelectorAll('.circle').forEach(circle => {
        circle.setAttribute('draggable', currentTurn === 'O');
    });
    document.getElementById("turn-set").innerHTML = currentTurn;
}

function resetGame() {
    const previousWinner = sessionStorage.getItem('previousWinner');
    currentTurn = previousWinner ? previousWinner : 'X';
    boardState.fill(null);
    document.querySelectorAll('.drop-box').forEach(box => box.innerHTML = '');
    resetDraggables();
    updateDraggableStatus();
    window.location.reload();
}

function resetDraggables() {
    const crosses = document.querySelectorAll('.cross');
    const circles = document.querySelectorAll('.circle');
    const dragBoxCross = document.getElementById('drag-cross');
    const dragBoxCircle = document.getElementById('drag-circle');
    crosses.forEach(cross => {
        if (!dragBoxCross.contains(cross) && !document.querySelector('.drop-box').contains(cross)) {
            dragBoxCross.appendChild(cross);
        }
        cross.setAttribute('draggable', 'true');
        cross.style.pointerEvents = 'auto';
    });
    circles.forEach(circle => {
        if (!dragBoxCircle.contains(circle) && !document.querySelector('.drop-box').contains(circle)) {
            dragBoxCircle.appendChild(circle);
        }
        circle.setAttribute('draggable', 'true');
        circle.style.pointerEvents = 'auto';
    });
}

function updateScore(winner) {
    scores[winner]++;
    localStorage.setItem('scores', JSON.stringify(scores));
    displayScores();
    window.location.reload();
}

function loadScores() {
    const storedScores = localStorage.getItem('scores');
    if (storedScores) {
        scores = JSON.parse(storedScores);
    }
}

function displayScores() {
    document.getElementById('scoreX').textContent = scores.X;
    document.getElementById('scoreO').textContent = scores.O;
}

function resetScores() {
    scores = { X: 0, O: 0 };
    localStorage.setItem('scores', JSON.stringify(scores));
    displayScores();
}