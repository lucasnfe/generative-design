
function setup() {
    createCanvas(500, 500);
    frameRate(30);
}

function draw() {
    clear();
    fill(51);

    // line parameters
    x = random(width);
    ellipse(x, height/2, 24, 24);
}
