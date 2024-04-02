const X_CLASS = 'x';
const O_CLASS = 'o';
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const cells = document.querySelectorAll('[data-cell]');
const board = document.querySelector('.board'); // Seleccionamos la clase 'board'
const restartButton = document.getElementById('restartButton');
let currentPlayer;

startGame();

restartButton.addEventListener('click', startGame);

function startGame() {
    currentPlayer = X_CLASS;
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove(X_CLASS);
        cell.classList.remove(O_CLASS);
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { once: true });
    });
    setBoardHoverClass();
}

function handleClick(e) {
    const cell = e.target;
    const currentClass = currentPlayer === X_CLASS ? X_CLASS : O_CLASS;
    placeMark(cell, currentClass);
    if (checkWin(currentClass)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurns();
        setBoardHoverClass();
    }
}

function endGame(draw) {
    if (draw) {
        alert('Es un empate!');
    } else {
        alert(`${currentPlayer === X_CLASS ? "X" : "O"} Gano!!!`);
    }
    startGame();
}

function placeMark(cell, currentClass) {
    cell.textContent = currentClass;
    cell.classList.add(currentClass);
}

function swapTurns() {
    currentPlayer = currentPlayer === X_CLASS ? O_CLASS : X_CLASS;
}

function setBoardHoverClass() {
    board.classList.remove(X_CLASS);
    board.classList.remove(O_CLASS);
    board.classList.add(currentPlayer === X_CLASS ? X_CLASS : O_CLASS);
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cells[index].classList.contains(currentClass);
        });
    });
}

function isDraw() {
    return [...cells].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS);
    });
}
