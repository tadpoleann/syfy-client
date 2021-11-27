let images = ["./assets/first.svg", "./assets/second.svg", "./assets/third.svg", "./assets/fourth.svg", "./assets/fifth.svg", "./assets/Big_chungus.png"];
let x = 0;
function Animate() {
    document.getElementById("logo").src = images[x];
    x++;
    if (x === images.length) {
        x = 0;
    }
}