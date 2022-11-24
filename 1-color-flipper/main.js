
const BG = document.querySelector(".app")
const NEW_BUTT = document.querySelector(".new-butt")
const HEX = document.querySelector("#hex");
const RGB = document.querySelector("#rgb");
const HSL = document.querySelector("#hsl");
const CMYK = document.querySelector("#cmyk");

const COPY = document.querySelector(".copy");
const APP_HISTORY = document.querySelector(".history");

let colorHistory = [];

RandomColor();


NEW_BUTT.addEventListener("click", ()=> RandomColor())
COPY.addEventListener("click", ()=> console.log("ok"))

function RandomColor(){
    const randomColor = Math.floor(Math.random()*16777215).toString(16);
    SetActive(randomColor)
}

function ByCode(hexcode){
    SetActive(hexcode)
}

function SetActive(activeColor){
    BG.style.backgroundColor = `#${activeColor}`;

    HEX.innerText = activeColor;
    RGB.innerText = hexToRgb(activeColor);
    // HSL.innerText = hexToHsl(activeColor);
    // CMYK.innerText = hexToCMYK(activeColor)

    // history
    colorHistory.push(activeColor);
    APP_HISTORY.innerHTML = null
    let revHistory = colorHistory.reverse();
    for (let index = 0; index < revHistory.length; index++) {
        const element = revHistory[index];
        addElement(element);
    }
}




function addElement(activeColor) {
  // create a new div element
  const newDiv = document.createElement("div");

  // and give it some content
  const newContent = document.createTextNode("#" + activeColor);
  

  // add the text node to the newly created div
  newDiv.appendChild(newContent);
  newDiv.style.backgroundColor = `#${activeColor}`;
  newDiv.classList.add('color')
  
  

APP_HISTORY.appendChild(newDiv);
}









// Conversion of color codes.

function hexToRgb(hex) {
    var arrBuff = new ArrayBuffer(4);
    var vw = new DataView(arrBuff);
    vw.setUint32(0,parseInt(hex, 16),false);
    var arrByte = new Uint8Array(arrBuff);
  
    return arrByte[1] + "," + arrByte[2] + "," + arrByte[3];
  }

  function hexToHsl(hex) {

    var arrBuff = new ArrayBuffer(4);
    var vw = new DataView(arrBuff);
    vw.setUint32(0,parseInt(hex, 16),false);
    var arrByte = new Uint8Array(arrBuff);
  
    r = arrByte[1] 
    g = arrByte[2] 
    b = arrByte[3];

    r /= 255, g /= 255, b /= 255;
  
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;
  
    if (max == min) {
      h = s = 0; // achromatic
    } else {
      var d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
  
      h /= 6;
    }
  
    return `${h} ${s} ${l}`;
  }
  
  function hexToCMYK (hex) {
    var computedC = 0;
    var computedM = 0;
    var computedY = 0;
    var computedK = 0;
   
    hex = (hex.charAt(0)=="#") ? hex.substring(1,7) : hex;
   
    if (hex.length != 6) {
     alert ('Invalid length of the input hex value!');   
     return; 
    }
    if (/[0-9a-f]{6}/i.test(hex) != true) {
     alert ('Invalid digits in the input hex value!');
     return; 
    }
   
    var r = parseInt(hex.substring(0,2),16); 
    var g = parseInt(hex.substring(2,4),16); 
    var b = parseInt(hex.substring(4,6),16); 
   
    // BLACK
    if (r==0 && g==0 && b==0) {
     computedK = 1;
     return [0,0,0,1];
    }
   
    computedC = 1 - (r/255);
    computedM = 1 - (g/255);
    computedY = 1 - (b/255);
   
    var minCMY = Math.min(computedC,Math.min(computedM,computedY));
   
    computedC = (computedC - minCMY) / (1 - minCMY) ;
    computedM = (computedM - minCMY) / (1 - minCMY) ;
    computedY = (computedY - minCMY) / (1 - minCMY) ;
    computedK = minCMY;
   
    return `${computedC},${computedM},${computedY},${computedK}`;
   }