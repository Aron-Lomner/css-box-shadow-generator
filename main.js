import {funcGetRGBA} from "/colorConverter.js";

const box = document.querySelector("#box");
const sldrOffsetX = document.querySelector("#sldrOffsetX");
const sldrOffsety = document.querySelector("#sldrOffsetY");
const sldrBlurRadius = document.querySelector("#sldrBlurRadius");
const sldrSpreadRadius = document.querySelector("#sldrSpreadRadius");
const sldrOpacity = document.querySelector("#sldrOpacity");
const colorPicker = document.querySelector("#shadowcolor");
const hOffsetValue = document.querySelector("#hOffsetValue");
const vOffsetValue = document.querySelector("#vOffsetValue");
const blurRadiusValue = document.querySelector("#blurRadiusValue");
const spreadRadiusValue= document.querySelector("#spreadRadiusValue");
const opacityValue = document.querySelector("#opacityValue");

const cssCode = document.querySelector("#css-code");

let boxShadowValue = "0px 0px 0px 0px rgba(0,0,0,1)";

const updateBoxShadow = () => {
    
    let v1 = sldrOffsetX.value;    
    hOffsetValue.innerHTML = v1;
    let v2 = sldrOffsety.value;
    vOffsetValue.innerHTML = v2;
    let v3 = sldrBlurRadius.value;
    blurRadiusValue.innerHTML = v3;
    let v4 = sldrSpreadRadius.value;
    spreadRadiusValue.innerHTML = v4;
    let v5 = sldrOpacity.value/100;   
    opacityValue.innerHTML = v5;
    let color = funcGetRGBA(colorPicker.value);

    let regex = /,[.0-9]+\)/g;
    
    boxShadowValue = `${v1}px ${v2}px ${v3}px ${v4}px ${color}`;
    boxShadowValue = boxShadowValue.replace(regex, `,${v5})`);
    
    cssCode.value = `box-shadow: ${boxShadowValue};`;
    
    box.style.boxShadow = boxShadowValue;
}

updateBoxShadow();


sldrOffsetX.addEventListener("input", updateBoxShadow);
sldrOffsety.addEventListener("input", updateBoxShadow);
sldrBlurRadius.addEventListener("input", updateBoxShadow);
sldrSpreadRadius.addEventListener("input", updateBoxShadow);
sldrOpacity.addEventListener("input", updateBoxShadow);
colorPicker.addEventListener("input", updateBoxShadow);

function copyToClipboard() {
    var inputElement = document.getElementById("css-code");
    inputElement.select();
    document.execCommand("copy");
    window.getSelection().removeAllRanges();
    let copied = document.getElementById("copied");
    copied.style.opacity = 1;
    setTimeout(()=>{copied.style.opacity = 0},350);
}
document.getElementById("copy").onclick = copyToClipboard;
