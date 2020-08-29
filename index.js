
import Glide from "@glidejs/glide";

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

document.write("<script type='text/javascript' src='./dom/dom-left-left.js'></script>");
document.write("<script type='text/javascript' src='./dom/dom-left-right.js'></script>");
document.write("<script type='text/javascript' src='./dom/dom-right.js'></script>");
document.write("<script type='text/javascript' src='./dom/dom-bottom-normal.js'></script>");
document.write("<script type='text/javascript' src='./dom/dom-bottom-bright.js'></script>");