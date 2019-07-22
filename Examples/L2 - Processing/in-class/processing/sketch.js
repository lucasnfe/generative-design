

function setup() {
    fillColor = 100;
    createCanvas(500,500);
    background(200);
}

function draw() {
    stroke(0);
    noStroke();

    fill(fillColor);
    ellipse(80, 50, 80, 80);
}

function mousePressed() {
    fillColor = 10;
}
