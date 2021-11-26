// let diarrhea = ["./assets/first.png", "./assets/first.png", "./assets/first.png"];

// setInterval("Animate()", 400);
// var x = 0;

// function Animate() {
//     document.getElementById("logo").src = diarrhea[x];
//     x++;
//     if (diarrhea.length == x) {
//         x = 0;
//     }
// }

// alert('test worked');
// console.log("...")
let images = ["./assets/first.png", "./assets/second.png", "./assets/third.png"];
let x = 0;
function Animate() {
    document.getElementById("logo").src = images[x];
    x++;
    if (images.length == x) {
        x = 0;
    }
}

function test1(){
    console.log('Calling test 1 function');
}