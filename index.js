import Glide from "@glidejs/glide";

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