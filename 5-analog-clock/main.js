const hoursHand = document.querySelector('.hours');
const minutesHand = document.querySelector('.minutes');
const secondsHand = document.querySelector('.seconds');

const range = document.querySelector('#range');
const info = document.querySelector('#info')
const info2 = document.querySelector('#info2')


let deg = 0;
let multiplier = 1;

range.oninput = (e) => {
    let mm
    if (e.target.value == 1){mm = 1
    } else {mm = 100}
    info.innerText ='x' + e.target.value * mm + " real time";
    multiplier = e.target.value * mm
    info2.innerText = 'one second is ' + Math.floor(multiplier / 60) + ' minutes'
    
}

let loop = setInterval(() => {
    console.log()
    secondsHand.style.transform = 'rotate(' + deg  + 'deg)';
    deg += 0.024 * multiplier;
    if (deg >= 360) {
        deg = 0;
        minutesHand.style.transform += 'rotate(' + 6 + 'deg)';
        hoursHand.style.transform += 'rotate(' + 0.25  + 'deg)';
    }
}, 1);