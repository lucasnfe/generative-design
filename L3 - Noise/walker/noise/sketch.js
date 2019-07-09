let timex = 0;
let timey = 10000;

function setup() {
    createCanvas(500, 500);
    frameRate(30);
}

function draw() {
    clear();
    fill(51);

    // line parameters
    x = noise(timex) * width;
    y = noise(timey) * width;

    ellipse(x, y, 24, 24);

    timex += 0.01;
    timey += 0.01;
}
