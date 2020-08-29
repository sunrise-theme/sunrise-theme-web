
import Glide from "@glidejs/glide";
import colorsJSON from "./colors.json";

function symbolToChar(content) {
    content = content.replace(/&/g, '&amp;');
    content = content.replace(/>/g, '&gt;');
    content = content.replace(/</g, '&lt;');
    content = content.replace(/'/g, '&apos;');
    content = content.replace(/"/g, '&quot;');
    content = content.replace(/ /g, '&nbsp;');
    return content;
}

new Glide('.dark-glide', {
    type: 'carousel',
    autoplay: 1000,
    animationDuration: 1000
}).mount();

new Glide('.bright-glide', {
    type: 'carousel',
    autoplay: 1000,
    animationDuration: 1000
}).mount();

// document.write("<script type='text/javascript' src='./dom/dom-left-left.js'></script>");
// document.write("<script type='text/javascript' src='./dom/dom-left-right.js'></script>");
// document.write("<script type='text/javascript' src='./dom/dom-right.js'></script>");
// document.write("<script type='text/javascript' src='./dom/dom-bottom-normal.js'></script>");
// document.write("<script type='text/javascript' src='./dom/dom-bottom-bright.js'></script>");

// YUV
function yuv(content) {
    let Y = 0;
    let R = "";
    let G = "";
    let B = "";

    R = parseInt(content.substr(1, 2), 16);
    G = parseInt(content.substr(3, 4), 16);
    B = parseInt(content.substr(5, 6), 16);

    Y = parseInt(0.299 * R + 0.587 * G + 0.114 * B);
    return Y;
}

function alpha(content) {
    let A = 0;
    A = parseInt(content.substr(7, 8), 16);
    return A
}

// dom-left
let keyPrefix = "";
let value = "";
let htmlLeftLeft = ``;
let htmlLeftRight = ``;

for (let key in colorsJSON["rainbow-colors"]) {
    keyPrefix = key.substr(0, 2);
    value = colorsJSON["rainbow-colors"][key];

    // dom-left-left
    if (keyPrefix === "r-") {
        if (yuv(value) >= 19200 && Number.isNaN(alpha(value))) {
            htmlLeftLeft += `<div style="background-color: ${value};" class="text-black">${value}</div>`;
        } else if (yuv(value) < 19200 || !Number.isNaN(alpha(value))) {
            htmlLeftLeft += `<div style="background-color: ${value};" class="text-white">${value}</div>`;
        }
    // dom-left-right
    } else if (keyPrefix === "wb") {
        if (yuv(value) >= 19200 && Number.isNaN(alpha(value))) {
            htmlLeftRight += `<div style="background-color: ${value};" class="text-black">${value}</div>`;
        } else if (yuv(value) < 19200 || !Number.isNaN(alpha(value))) {
            console.log(!Number.isNaN(alpha(value)));
            htmlLeftRight += `<div style="background-color: ${value};"   class="text-white">${value}</div>`;
        }
    }
}

htmlLeftLeft += `<div></div>`;
console.log(htmlLeftLeft);
const nodeLeftLeft = document.querySelector("#dom-left-left");
nodeLeftLeft.innerHTML = htmlLeftLeft;

console.log(htmlLeftRight);
const nodeLeftRight = document.querySelector("#dom-left-right");
nodeLeftRight.innerHTML = htmlLeftRight;

// dom-right



// dom-bottom-normal

// dom-bottom-bright