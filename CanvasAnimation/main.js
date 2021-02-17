
const sound = document.getElementById("sound")
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
ctx.font = "40px Arial";
const height = canvas.height;
const width = canvas.width;
sound.loop = true;

let counter = 0;
let inc = 0;

var grd = ctx.createLinearGradient(0, 0, 0, height);
grd.addColorStop(0, "black");
grd.addColorStop(1, "white");

function startOrStop() {
    if (inc == 1) {
        inc = 0;
        sound.pause();
    } else {
        inc = 1;
        sound.play();
    }
}

function draw() {
    requestAnimationFrame(draw);
    ctx.fillRect(0,0, height, width);
    ctx.fillStyle = grd;
    ctx.strokeStyle = "navy";
    ctx.lineWidth = 5;

    ctx.save();
    ctx.translate(height / 2, width / 2);
    ctx.rotate(counter * 0.02);

    // Head & text
    ctx.beginPath();
    ctx.fillText("Toni", 70,100);
    ctx.fillStyle = "red";
    ctx.arc(0, -115, 65, 0, 2 * Math.PI, false);
    ctx.fill()
    // Legs & torso
    ctx.moveTo(0, 0);
    ctx.lineTo(0, 100);
    ctx.lineTo(75, 250); // Left leg
    ctx.moveTo(0, 100);
    ctx.lineTo(-75, 250); // Right leg
    // Hands & neck
    ctx.moveTo(0, 0);
    ctx.lineTo(150, 0); // Left hand
    ctx.moveTo(0,0);
    ctx.lineTo(-150, 0); // Right hand
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -50); // Neck
    ctx.stroke();
    ctx.restore();
    counter += inc;
}
