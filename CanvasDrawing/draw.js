
clearBtn = document.getElementById('clear');
colorEl = document.getElementById('color');
canvas = document.getElementById('myCanvas');
size = document.getElementById('lineSize');
width = canvas.width;
height = canvas.height;
ctx = canvas.getContext('2d');


let isPainting = false;
let startX = 0;
let startY = 0;
let currentColor = colorEl.value;
let paintSize = size.value;

ctx.strokeStyle = currentColor;
ctx.lineWidth = paintSize;

function paint(mouseEvent) {
    if(!isPainting) return;
    ctx.strokeStyle = currentColor;
    ctx.lineWidth = paintSize;
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(mouseEvent.offsetX, mouseEvent.offsetY);
    ctx.stroke();
    startX = mouseEvent.offsetX;
    startY = mouseEvent.offsetY;
};

// button event for clearing the canvas
clearBtn.addEventListener('click', () => {
    ctx.clearRect(0, 0, width, height);
});

// check input change on color element and update
colorEl.addEventListener("input", () => {
    currentColor = colorEl.value;
});

// check input change on size element and update
size.addEventListener("input", () => {
    paintSize = size.value;
})

// check for mouse click down to set painting boolean to true. Get current position of mouse
canvas.addEventListener('mousedown', (mouseEvent) => {
    isPainting = true;
    startX = mouseEvent.offsetX;
    startY = mouseEvent.offsetY;
});

// if mouse is moved - start paint function
canvas.addEventListener('mousemove', paint);

// mouse is released - stop drawing
canvas.addEventListener('mouseup', () => isPainting = false);
