const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

let WIDTH = window.innerWidth;
let HEIGHT = window.innerHeight;

canvas.width = WIDTH;
canvas.height = HEIGHT;

function monteCarlo() {
    while (true) {
        let r1 = Math.random() * 1;
        let probability = r1;
        let r2 = Math.random() * 1;

        // smaller steps are more likely..
        if (r2 > probability) {
            return r1;
        }
    }
}

let Walker = function () {
    this.x = WIDTH / 2;
    this.y = HEIGHT / 2;
    let preX, preY;
}

Walker.prototype.walk = function () {
    preX = this.x;
    preY = this.y;

    let stepSize = monteCarlo() * 80;
    console.log(stepSize);
    // To set the range (-stepSize ~ stepSize)
    let xStepSize = (Math.random() * (stepSize * 2)) - stepSize;
    let yStepSize = (Math.random() * (stepSize * 2)) - stepSize;

    this.x += xStepSize;
    this.y += yStepSize;
}

Walker.prototype.display = function () {
    context.beginPath();
    context.arc(this.x, this.y, 3, 0, 2 * Math.PI);
    context.stroke();
    context.fillStyle = "rgb(255,0, 0, 0.5)";
    context.fill();
    context.closePath();
}

Walker.prototype.line = function () {
    context.beginPath();
    context.moveTo(preX, preY);
    context.lineTo(this.x, this.y);
    context.stroke();
}

Walker.prototype.clear = function () {
    if (this.x < 0 || this.x > WIDTH || this.y < 0 || this.y > HEIGHT) {
        window.location.reload(true);
    }
}

let w = new Walker();

function display() {
    w.display();
    w.walk();
    w.line();
    w.clear();
}

function animation() {
    requestAnimationFrame(animation);
    display();
}

animation();
