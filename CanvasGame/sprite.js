const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
const ship = document.getElementById("ship");
const help = document.getElementById('help');
const PI = Math.PI;
const FPS = 30;
let bullets = [];
help.innerText = "Instructions: 1. Move with arrow keys and shoot with spacebar"

class Bullet {
    constructor(x, y, velocity, direction) {
        this.x = x;
        this.y = y;
        this.size = 4;
        this.velocity = velocity;
        this.direction = direction;
    }

    draw() {
        ctx.fillStyle = 'white';
        ctx.fillRect(this.x, this.y, 5, 5);
    }

    update() {
        if(this.direction === 'up') {
            this.y -= 30;
        } 
        if(this.direction === 'down') {
            this.y += 30;
        }
        if(this.direction === 'left') {
            this.x -= 30;
        }
        if(this.direction === 'right') {
            this.x += 30;
        }
    }
}

class Player {
    constructor(x, y, velocity, direction) {
        this.x = x;
        this.y = y;
        this.velocity = velocity;
        this.direction = direction;
    }

    draw() {
        ctx.drawImage(ship, this.x, this.y);
    }

    move(direction) {
        if(direction === 'up') {
            this.y += -this.velocity; 
            this.direction = 'up'
        }
        if(direction === 'down') {
            this.y += this.velocity;
            this.direction = 'down'
        }
        if(direction === 'right') {
            this.x += this.velocity;
            this.direction = 'right'
        }
        if(direction === 'left') {
            this.x +=  -this.velocity;
            this.direction =  'left'
        }
    }

    shoot() {
        if(this.direction === 'right') {
            bullets.push(new Bullet(this.x + 50, this.y + 10, 10, this.direction));
            bullets.push(new Bullet(this.x + 50, this.y + 40, 10, this.direction));
        }
        if(this.direction === 'left') {
            bullets.push(new Bullet(this.x + 13, this.y + 10, 10, this.direction));
            bullets.push(new Bullet(this.x + 13, this.y + 40, 10, this.direction));
        }
        if(this.direction === 'up') {
            bullets.push(new Bullet(this.x + 13, this.y + 18, 10, this.direction));
            bullets.push(new Bullet(this.x + 50, this.y + 18, 10, this.direction));
        }
        if(this.direction === 'down') {
            bullets.push(new Bullet(this.x + 13, this.y + 34, 10, this.direction));
            bullets.push(new Bullet(this.x + 50, this.y + 34, 10, this.direction));
        }
    }
}

player = new Player(0, 0, 10, 0);

setInterval(function() {
    canvas.focus();
    draw();
  },1000/FPS);


addEventListener('keydown', (e) => {
    if(e.key === "ArrowUp") {
        player.move('up')
    }
    if(e.key === 'ArrowDown') {
        player.move('down')
    }
    if(e.key === 'ArrowRight') {
        player.move('right')
    }
    if(e.key === 'ArrowLeft') {
        player.move('left')
    }
    if(e.key === " ") {
        player.shoot();
    }
})

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    player.draw()
    
    bullets.forEach(bullet => {
        bullet.update();
        bullet.draw();
    })
}



