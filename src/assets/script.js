let images = ["./assets/first.svg", "./assets/second.svg", "./assets/third.svg"];
let x = 0;
function Animate() {
    document.getElementById("logo").src = images[x];
    x++;
    if (x === images.length) {
        x = 0;
    }
}