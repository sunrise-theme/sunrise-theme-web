
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
    autoplay: 5000,
    animationDuration: 1000
}).mount();

new Glide('.bright-glide', {
    type: 'carousel',
    autoplay: 5000,
    animationDuration: 1000
}).mount();

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
    value = symbolToChar(colorsJSON["rainbow-colors"][key]);

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
            htmlLeftRight += `<div style="background-color: ${value};"   class="text-white">${value}</div>`;
        }
    }
}

htmlLeftLeft += `<div></div>`;
const nodeLeftLeft = document.querySelector("#dom-left-left");
nodeLeftLeft.innerHTML = htmlLeftLeft;

const nodeLeftRight = document.querySelector("#dom-left-right");
nodeLeftRight.innerHTML = htmlLeftRight;

// dom-right
let htmlRight = ``;
for (let key in colorsJSON["rainbow-colors"]) {
    value = symbolToChar(colorsJSON["rainbow-colors"][key]);

    let parent = document.querySelector("#dom-right");
    parent.innerHTML += `<div class="${key}"></div>`;

    const nodeRight = document.querySelector(`.${key}`);

    if (yuv(value) >= 19200 && Number.isNaN(alpha(value))) {
        htmlRight = 
        `
        <div class="sub-color-block">
            <div><img class="w-5" src="https://raw.githubusercontent.com/sunrise-theme/sunrise-theme-web/beta/assets/svgs/ui-bright.svg" alt="UI icon"></div>
            <div></div>
            <div><img class="w-5" src="https://raw.githubusercontent.com/sunrise-theme/sunrise-theme-web/beta/assets/svgs/syntax-bright.svg" alt="UI icon"></div>
        </div>
        <div class="color-scale text-black">
            <div>${value}</div>
        </div>
        `
    } else if (yuv(value) < 19200 || !Number.isNaN(alpha(value))) {
        htmlRight = 
        `
        <div class="sub-color-block">
            <div><img class="w-5" src="https://raw.githubusercontent.com/sunrise-theme/sunrise-theme-web/beta/assets/svgs/ui-dark.svg" alt="UI icon"></div>
            <div></div>
            <div><img class="w-5" src="https://raw.githubusercontent.com/sunrise-theme/sunrise-theme-web/beta/assets/svgs/syntax-dark.svg" alt="UI icon"></div>
        </div>
        <div class="color-scale text-white">
            <div>${value}</div>
        </div>
        `
    }
    nodeRight.innerHTML = htmlRight;
}

// dom-bottom
let htmlBottomNormal = ``;
let htmlBottomBright = ``;
const normalArray = new Array("red-x", "yellow-x", "green-x", "cyan-x", "blue-x", "purple-x");
const brightArray = new Array("bright-red-x", "bright-yellow-x", "bright-green-x", "bright-cyan-x", "bright-blue-x", "bright-purple");

// dom-bottom-normal
for (let key in colorsJSON["rainbow-colors"]) {
    for (let index in normalArray) {
        if (key.indexOf(normalArray[index]) > -1 && key.indexOf("diff") < 0 && key.indexOf("bright") < 0) {
            value = symbolToChar(colorsJSON["rainbow-colors"][key]);
            htmlBottomNormal = document.querySelector("#dom-bottom-normal");
            if (yuv(value) >= 19200 && Number.isNaN(alpha(value))) {
                htmlBottomNormal.innerHTML += `<div class="${key} text-black">${value}</div>`;
            } else if (yuv(value) < 19200 || !Number.isNaN(alpha(value))) {
                htmlBottomNormal.innerHTML += `<div class="${key} text-white">${value}</div>`;
            }
        }
    }
}

// dom-bottom-bright
for (let key in colorsJSON["rainbow-colors"]) {
    for (let index in brightArray) {
        if (key.indexOf(brightArray[index]) > -1) {
            value = symbolToChar(colorsJSON["rainbow-colors"][key]);
            htmlBottomBright = document.querySelector("#dom-bottom-bright");
            if (yuv(value) >= 19200 && Number.isNaN(alpha(value))) {
                htmlBottomBright.innerHTML += `<div class="${key} text-black">${value}</div>`;
            } else if (yuv(value) < 19200 || !Number.isNaN(alpha(value))) {
                htmlBottomBright.innerHTML += `<div class="${key} text-white">${value}</div>`;
            }
        }
    }
}