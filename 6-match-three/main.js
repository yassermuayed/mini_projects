const gameBoard = document.querySelector('#game-board');

let gameBoardArray = [];
let toBeDestroyed = [];

let moves = 20;
let movesLeft;

let level = localStorage.getItem('level');
console.dir(document)
if (level === null) {
    level = 1;
    localStorage.setItem('level', level);
}

function createAndAppend(src, col, row) {
    let animal = new Image();
    animal.type = src;
    animal.src = `./assets/a${src}.png`;
    animal.style.gridColumn = col;
    animal.style.gridRow = row;;

    animal.style.scale = 1.2;

    animal.addEventListener('click', () => {
        animal.style.outline = 'solid white 2px';
        console.log(animal.type)
        console.log(
            "col" + animal.style.gridColumnStart,
            "row" + animal.style.gridRowStart
        );
    })
    // 
    gameBoard.appendChild(animal);

}

function populate() {
    for (let i = 1; i < 9; i++) {
        for (let j = 1; j < 13; j++) {
            let ss = Math.ceil(Math.random() * 4)
            createAndAppend(ss, i, j);

        }
    }
}



function newStart() {
    // get level and other vars from localStorage
    // gameBoard remove all children
    // reset all variables to initial values
    populate();
}

newStart();




/* 

if an arbitrary animal clicked do:
quickCheck:

showMovements:
1. mark selected animal visually as selected
2. mark adjacent cells as possible

startCascade:
1. Save it, cellUp, cellDown,cellLeft, cellRight
2. if it is of a adjecent cell is of a diifrent type ignore it
3. if it is of the same type create a branch from it
4. quee branches in toBeDestroyed
5. repeate from all branches

*/