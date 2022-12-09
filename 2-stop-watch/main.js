console.log("ok")

const $TotalTime = document.querySelector('.total-time');
const $LastLap = document.querySelector('.last-time');

const $lapCont = document.querySelector('.laps-cont')

const $StartButton = document.querySelector('.start');
const $ResetButton = document.querySelector('.restart')
const $LapButton = document.querySelector('.record-lap')

// variables
let mainInterval

let isCounting = false;
let isPaused;
let currentTime = 0;

let laps = [0];
let lastLapTime = 0;
$StartButton.addEventListener('click', () => {
    if (!isCounting) {
        count()
    } else if (isCounting) {
        pause()
        isCounting = false;
    }
})

$ResetButton.addEventListener('click', () => reset())

$LapButton.addEventListener('click', () => {
    if (isCounting) laps.push(currentTime);
    
    appendLaps();
})


function count() {
    isCounting = true;
    mainInterval = setInterval(countingUpdate, 10)
    $StartButton.innerHTML = "Pause"
}

function pause() {
    clearInterval(mainInterval)
    $TotalTime.innerHTML = currentTime;
    $StartButton.innerHTML = "Start"
}

function reset() {
    if (isCounting) return;
    clearInterval(mainInterval)
    currentTime = 0;
    laps = [0]
    appendLaps()
}


function countingUpdate() {
    currentTime++;
}


function formatTime(milliseconds) {
    let milli = milliseconds % 100;
    let seconds = (Math.floor(milliseconds / 100)) % 60
    let minutes = (Math.floor(milliseconds / 100 / 60) % 60)
    return (
        `${minutes < 10 ? "0" + minutes : minutes}:
        ${seconds < 10 ? "0" + seconds : seconds}:
        ${milli < 10 ? "0" + milli : milli} `
    )
}
//  update ui

setInterval(() => {
    $TotalTime.innerHTML = formatTime(currentTime);
    $LastLap.innerHTML = formatTime(currentTime - laps[laps.length - 1]);

}, 10);

function appendLaps() {
    $lapCont.innerHTML = ""
   
    for (let index = 0; index < laps.length; index++) {
        const element = laps[index];
        prevElement = laps[index - 1]
        $lapCont.appendChild(createLapComp(element, index , prevElement))
    }

    function createLapComp(milliseconds, index , lastT) {
        let oneLap = document.createElement('div')


        let lapNo = document.createElement('div')
        let textLapNo = document.createTextNode(index < 10 ? `0${index}` : `${index} `)
        lapNo.appendChild(textLapNo)
        lapNo.classList.add('lap-no')
        oneLap.appendChild(lapNo)

        let lapStamp = document.createElement('div')
        let textLapStamp = document.createTextNode(formatTime(milliseconds))
        lapStamp.appendChild(textLapStamp)
        lapStamp.classList.add('time-stamp')
        oneLap.appendChild(lapStamp)

        let lapTime = document.createElement('div')
        let textLapTime = document.createTextNode('+ ' + formatTime(lastT ? milliseconds - lastT: 0))
        lapTime.appendChild(textLapTime)
        lapTime.classList.add('time-stamp')
        oneLap.appendChild(lapTime)


        oneLap.classList.add('one-lap')

        return oneLap
    }
}

