let lineTime = 0;

function setup() {
    createCanvas(500, 500);

    strokeWeight(5);
    frameRate(10);
}

function draw() {
    clear();
    fill(51);

    // line parameters
    let step = 10;
    let amplitute = 100;

    let lastx = 0;
    let lasty = height/2 + noise(lastx) * amplitute;

    // Offset from initial noisy Y to the vertical mid point
    let offsetY = height/2 - lasty;

    // Time is used as y dimension for noise
    lineTime += 0.1;

    for(let x = step; x < width; x += step) {
        let y = height/2 + noise(x/100, lineTime) * amplitute;

        line(lastx, lasty + offsetY, x, y + offsetY);
        lastx = x;
        lasty = y;
    }
}
