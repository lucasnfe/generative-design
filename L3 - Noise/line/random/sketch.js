let value = 0;

function setup() {
    createCanvas(500, 500);

    strokeWeight(5);
    frameRate(10);
}

function draw() {
    clear();
    fill(51);

    // line parameters
    let step = 10
    let amplitute = 100;

    let lastx = 0;
    let lasty = height/2;

    for(let x = step; x < width; x += step) {
        let y = height/2 + random(-amplitute/2, amplitute/2);

        line(lastx, lasty, x, y);
        lastx = x;
        lasty = y;
    }
}
