console.log('working')
const gameBoard = document.querySelector('#game-board')
const info1 = document.querySelector('#info1')
const info2 = document.querySelector('#info2')
const playAgaenButton = document.querySelector('#play-again')
const squares = [12, 13, 14, 15, 16, 17, 18, 19, 20]

let turn = 1;
//  playing gameover 
let gameState = "playing"
for (let i = 0; i < 9; i++) {
    createSquare(i);

}


function clickHandler(event) {
    if (event.target.classList.contains('square') && event.target.childNodes.length == 0 && gameState == 'playing') {
        if (turn === 1) {
            let circle = document.createElement('div')
            circle.classList.add('circle')
            event.target.appendChild(circle)

            squares[event.target.id] = 1
            turn = 2;
        }
        else if (turn === 2) {
            let cross = document.createElement('div')
            cross.classList.add('cross')
            event.target.appendChild(cross)

            squares[event.target.id] = 2
            turn = 1;
        }
        checkWin(squares)
    }


}


// //////////////////////////////////////////////////////////////////

function checkWin(board) {

    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // horizontal
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // vertical
        [0, 4, 8], [2, 4, 6] // diagonal
    ];

    for (let i = 0; i < winningCombos.length; i++) {
        const [a, b, c] = winningCombos[i];

        if (board[a] === board[b] && board[a] === board[c]) {
            gameState = 'gameover'
            if (turn == 2) {
                info1.innerText = "Player 1 wins"
                info2.innerText = "You lose :("
            }
            if (turn == 1) {
                info2.innerText = "Player 2 wins"
                info1.innerText = "You lose :("
            }

            return board[a];
        }
    }

    return null;
}

// 
// There are different ways to optimize the Tic Tac Toe win 
// condition algorithm. One way is to use bitboards, which 
// are a compact way of representing the board state using 
// binary numbers1. Another way is to use a lookup table, 
// which precomputes all possible winning combinations and 
// stores them in a data structure for fast lookups2. 
// A third way is to use the minimax algorithm, which is an 
// algorithm used in game theory to minimize the possible 
// loss for a worst-case scenario3.   


function createSquare(i) {
    let square = document.createElement('div');
    square.classList.add('square');
    square.id = i;
    square.addEventListener('click', clickHandler);
    gameBoard.appendChild(square);
    return square;
}

function gameOver() {

}


playAgaenButton.addEventListener('click', () => {
    location.reload()
})