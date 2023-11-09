const countDigit = document.getElementById("count-digit");
const incButton = document.getElementById("increase");
const decButton = document.getElementById("decrease");
const phiButton = document.getElementById("phi");
let counter = 0;

countDigit.textContent = counter;

incButton.addEventListener("click", () => {
  counter = addone()(counter);
});

decButton.addEventListener("click", () => {
  --counter;
});

// don't call the function
phiButton.addEventListener("click", reset);

function reset() {
  counter = 0;
}

document.body.addEventListener("click", () => {
  countDigit.textContent = counter;
});

function addone(pre) {
  return function intake(pre) {
    return pre + 1;
  };
}
