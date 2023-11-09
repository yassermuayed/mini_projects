const getById = (idd) => document.getElementById(idd);

const countDigit = getById("count-digit");
const incButton = getById("increase");
const decButton = getById("decrease");
const phiButton = getById("phi");

let counter = 0;

document.body.addEventListener("click", () => {
  countDigit.textContent = counter;
});

incButton.addEventListener("click", () => {
  counter = operation("add")(counter);
});

decButton.addEventListener("click", () => {
  counter = operation("sub")(counter);
});

// don't call the function
phiButton.addEventListener("click", reset);

function reset() {
  counter = 0;
}

function operation(op) {
  switch (op) {
    case "add":
      return function (num) {
        return ++num;
      };
      break;
    case "sub":
      return function (num) {
        return --num;
      };
      break;
    default:
      break;
  }
}

function animateText(node) {}
