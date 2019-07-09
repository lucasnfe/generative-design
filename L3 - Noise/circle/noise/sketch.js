let circleTimeX = 0;
let circleTimeY = 100;

function setup() {
    createCanvas(500, 500);

    strokeWeight(5);
    frameRate(10);

    angleMode(DEGREES);
}

function draw() {
    clear();
    fill(51);

    let step = 5;

    // Circle parameters
    let radius = 100;
    let amplitute = 10;

    let lastx = width/2 + (radius * cos(0)) + (noise(0, circleTimeX) * amplitute);
    let lasty = height/2 + (radius * sin(0)) + (noise(0, circleTimeY) * amplitute);

    // Offset from initial noisy Y to the vertical mid point
    let offsetY = height/2 - lasty;

    // Time is used as y dimension for noise
    circleTimeX += 0.1;
    circleTimeY += 0.1;

    // Draw a circle using lines and oerturb it with random values
    for(let angle = step; angle <= 360; angle += step) {
        let x = width/2 + (radius * cos(angle)) + (noise(angle, circleTimeX) * amplitute);
        let y = height/2 + (radius * sin(angle)) + (noise(angle, circleTimeY) * amplitute);

        line(lastx, lasty, x, y);

        lastx = x;
        lasty = y;
    }
}
