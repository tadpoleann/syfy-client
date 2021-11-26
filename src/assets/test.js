let images = new Array();
images = ["../assets/first.svg", "../assets/second.svg", "../assets/third.svg"];
let x = 0;

function shit(){
    console.log("shit");
    setInterval(() => {
        document.getElementById("logo").src = images[x];
        x++;
        if(x === images.length){ x = 0;}
    }, 400);
}