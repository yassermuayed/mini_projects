console.log("working")

const screen = document.querySelector('.screen')
const firstRow = document.querySelector('.first-row')
const secondRow = document.querySelector('.second-row')
const keyboard = document.querySelector('#keyboard')

const keys = [
    'C', '%', "del", "/",
    7, 8, 9, "*",
    4, 5, 6, "-",
    1, 2, 3, "+",
    0, ".", "="
]

let pressedKey = '';
let expression = '';
keys.forEach((key) => {

    let kk = document.createElement('div');
    let textNode = document.createTextNode(key)
    kk.setAttribute("unselectable", "on");
    kk.appendChild(textNode)
    kk.classList.add('key');

    kk.addEventListener('click', () => keyPressed(key))

    if (key == "=") {
        kk.style.gridColumn = '3 / -1';
        kk.style.backgroundColor = "chocolate"
    }

    keyboard.appendChild(kk)


})

function keyPressed(key) {
    if (key == 'C') {
        expression = '';
        updateScreen(0)
        return
    }
    if (key == 'del') {
        expression = expression.slice(0, -1)
        updateScreen(expression)
        return
    }
    if (key == '%') {
        expression = expression / 100
        updateScreen(expression)
        return
    }
    if (key == '=') {
        return
    }
    pressedKey = key;
    expression += pressedKey;
    updateScreen(expression)
}

function updateScreen(exp) {

    firstRow.innerText = exp;
    secondRow.innerText = eval(exp);
}