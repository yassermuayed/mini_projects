

const gameBoard = document.querySelector('#game-board');
const info = document.querySelector('#info')



let movesLeft = 20;

let level = localStorage.getItem('level');

if (level === null) {
    level = 1;
    localStorage.setItem('level', level);

}

function createAndAppend(col, row) {
    let animal = new Image();
    let src = Math.ceil(Math.random() * 4)


    animal.type = src;
    animal.src = `./assets/a${src}.png`;

    animal.style.gridColumn = col + '/' + col;
    animal.style.gridRow = row + '/' + row;

    animal.style.scale = 1;

    animal.addEventListener('click', (e) => {
        clickHandler(e, animal);

    })

    animal.classList.add('new')
    setTimeout(() => {
        animal.classList.remove('new')
    }, 1000);

    // 
    gameBoard.appendChild(animal);
    return animal;
}

function clickHandler(e, animal) {
    selection.makeSelection(e.target)

}

let selection = {
    prev: null,
    current: null,


    makeSelection(et) {

        if (this.current === null) {
            this.current = et;
            this.prev = this.current;
            this.current.classList.add('selected');
            this.check(this.current)
        } else if (et === this.current) {
            this.prev.classList.remove('selected');
            this.current.classList.remove('selected');
            this.current = null;
        } else {
            this.prev.classList.remove('selected');
            this.current.classList.remove('selected');
            this.prev = this.current;
            this.current = et;
            this.current.classList.add('selected');
            this.check(this.current)
        }
    },
    findCellByColRow(col, row, dbgM = "not defined") {
        let theCell;

        let gameBoardArr = [...gameBoard.children]
        gameBoardArr.forEach(el => {
            if (el.style.gridColumnStart === col + '' && el.style.gridRowStart === row + '') {
                // console.log(col, row, dbgM, el)
                theCell = el;
                return;
            }
        })

        return theCell
    }
    ,
    allAdjacentCells(cell) {
        let up = cell.style.gridRowStart - 1;
        let down = (cell.style.gridRowStart * 1) + 1;
        let left = cell.style.gridColumnStart - 1;
        let right = (cell.style.gridColumnStart * 1) + 1;

        let upCell = this.findCellByColRow(cell.style.gridColumnStart, up, "up");
        let downCell = this.findCellByColRow(cell.style.gridColumnStart, down, " Down")
        let leftCell = this.findCellByColRow(left, cell.style.gridRowStart, " left")
        let rightCell = this.findCellByColRow(right, cell.style.gridRowStart, " right")


        return [upCell, downCell, leftCell, rightCell]
    },

    returnConnected(cell) {
        let trueCells = [];
        let adjCell = this.allAdjacentCells(cell);
        for (let i = 0; i < adjCell.length; i++) {
            if (adjCell[i]?.type === cell?.type) {
                trueCells.push(adjCell[i])
            }
        }
        return trueCells;
    },
    connectedTree: new Map(),
    check(treeHead) {
        let moreThanThree = false;
        this.connectedTree.set(treeHead, treeHead);
        treeHead.checked = true;
        let connectedOfType = this.returnConnected(treeHead)
        let subTree = [];

        connectedOfType.forEach(el => {
            this.connectedTree.set(el, el)
            el.classList.add('adjacent')
            subCheck(el)

        });
        function subCheck(branchHead) {
            branchHead.checked = true;
            subTree = selection.returnConnected(branchHead)

            subTree.forEach(el => {
                if (!el.checked) {
                    selection.connectedTree.set(el, el)
                    el.classList.add('adjacent')
                    subCheck(el)
                }
            })
        }

        // after checking
        if (this.connectedTree.size > 2) {

            this.connectedTree.forEach((el) => {
                el.classList.add('removed')
                el.classList.remove('adjacent')
                el.classList.remove('selected')
                if (el.type === tasks.obj1.type) {
                    tasks.obj1.count--;
                }
                if (el.type === tasks.obj2.type) {
                    tasks.obj2.count--;
                }
                gameBoard.removeChild(el)

            })
            this.connectedTree.clear()
            movesLeft--;
            updateGameBoard();
        } else {
            this.connectedTree.forEach((el) => { el.classList.remove('adjacent') })
            this.connectedTree.clear();

        }


    },

}

function updateGameBoard() {
    tasks.updateInfo()
    let arrFromGB = [...gameBoard.children]
    let colsWithMissing = findColsWithMissing(arrFromGB)

    function findColsWithMissing(gbArr) {
        let tempArr = [0, 0, 0, 0, 0, 0, 0, 0];
        let colsWithMissing = [];
        gbArr.forEach((cell) => {
            tempArr[cell.style.gridColumnStart - 1] += 1;
        })
        tempArr.forEach((el, index) => {
            if (el < 12) {
                colsWithMissing.push(index + 1)
            }
        })
        return colsWithMissing;
    }

    function orderCol(colNum) {
        // colNum = 1;
        let remainingCells = [];



        arrFromGB.forEach(el => {
            if (el.style.gridColumnStart == colNum) {
                remainingCells.push(el)
            }
        })

        let missingCellsCount = 12 - remainingCells.length;

        remainingCells.reverse()
        // console.log("Remaining in COL: ", colNum, remainingCells)

        let ccc = 0;
        for (let i = 12; i > 0; i--) {
            if (remainingCells[ccc]) {
                // console.log(remainingCells[ccc], remainingCells[ccc].style.gridRowStart, i)
                remainingCells[ccc].style.gridRowStart = i
                remainingCells[ccc].style.gridRowEnd = i
                ccc++;
            }
        }

        // Add new cells
        for (let i = 0; i < missingCellsCount; i++) {
            createAndAppend(colNum, i + 1)
        }

    }

    colsWithMissing.forEach(el => {
        orderCol(el)
    })



}


let tasks = {
    obj1: {
        type: Math.ceil(Math.random() * 4),
        count: Math.ceil(Math.random() * 5) * 5
    },
    obj2: {
        type: Math.ceil(Math.random() * 4),
        count: Math.ceil(Math.random() * 5) * 5
    },
    newTask() {

    },
    updateInfo() {
        info.innerHTML = `
        Level:${localStorage.getItem('level')}
        find ${this.obj1.count > 0 ? this.obj1.count : 0} <img src='./assets/a${this.obj1.type}.png'/>
          ${this.obj2.count > 0 ? this.obj2.count : 0} <img src='./assets/a${this.obj2.type}.png'/>
          Moves:${movesLeft}
        `;
        if(movesLeft < 1){
            localStorage.setItem('level', 1 )
            info.innerHTML = `:( GAME OVER `
            setTimeout(() => {
                location.reload();
            }, 2000);
        }
        if(this.obj1.count < 1 && this.obj2.count < 1){
            info.innerHTML = `GOOD JOB, LEVEL ${localStorage.getItem('level')} CLEAR`
            let lvl = (localStorage.getItem('level') * 1) + 1;
            localStorage.setItem('level', lvl )
            setTimeout(() => {
                location.reload();
            }, 2000);
        }
    },
    randomNum() {
        return Math.ceil(Math.random() * 4)
    }
}

tasks.updateInfo()

function populate() {
    for (let i = 1; i < 9; i++) {
        for (let j = 1; j < 13; j++) {
            createAndAppend(i, j);

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

