const gameBoard = document.querySelector('#game-board');

let aa = {};

let moves = 20;
let movesLeft;

let level = localStorage.getItem('level');

if (level === null) {
    level = 1;
    localStorage.setItem('level', level);

}

function createAndAppend(src, col, row) {
    let animal = new Image();
    aa[col + '' + row] = animal;
    animal.aaKey = col + '' + row;

    animal.type = src;
    animal.src = `./assets/a${src}.png`;
    animal.style.gridColumn = col + '/' + col;
    animal.style.gridRow = row + '/' + row;
    animal.position = {
        col: col,
        row: row,
        strKey: col + '' + row
    }
    animal.style.scale = 1;

    animal.addEventListener('click', (e) => {
        clickHandler(e, animal);

    })
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
    allAdjacentCells(cell) {
        let up = cell.position.row - 1;
        let down = cell.position.row + 1;
        let left = cell.position.col - 1;
        let right = cell.position.col + 1;


        let upCell = aa[cell.position.col + '' + up];
        let downCell = aa[cell.position.col + '' + down];
        let leftCell = aa[left + '' + cell.position.row];
        let rightCell = aa[right + '' + cell.position.row]

        return [upCell, downCell, leftCell, rightCell]
    },
    returnConnected(cell) {
        let trueCells = [];
        let adjCell = selection.allAdjacentCells(cell);

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
                gameBoard.removeChild(el)

            })
            this.connectedTree.clear()

            updateGameBoard();
        } else {
            this.connectedTree.forEach((el) => { el.classList.remove('adjacent') })
            this.connectedTree.clear();

        }


    },

}

function updateGameBoard() {
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
        let missingCellsCount = 12 - remainingCells.length;
        let lowestMissing = 12;

        arrFromGB.forEach(el => {
            if (el.style.gridColumnStart == colNum) {
                remainingCells.push(el)
            }
        })

        function addMissingFromTop() {
            let lowest = 12;
            for (let index = 0; index < 12; index++) {
                let element = remainingCells[index];


                if(index + 1  == element?.style.gridRowStart){
                    console.log('ok ====')
                }
                
                console.log(index, " ", element, element?.style.gridRowStart)

            }

            return lowest;
        }
        addMissingFromTop()

        // console.log("col", colNum, ": ",remainingCells)
    }
    
    colsWithMissing.forEach(el => {
        orderCol(el)
    })



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

