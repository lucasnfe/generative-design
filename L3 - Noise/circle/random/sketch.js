function setup() {
    createCanvas(500, 500);

    strokeWeight(5);
    frameRate(10);

    angleMode(DEGREES);
}

function draw() {
    clear();
    background(220);

    let step = 5;

    // Circle parameters
    let radius = 100;
    let amplitute = 10;

    let lastx = width/2 + radius * cos(0);
    let lasty = width/2 + radius * sin(0);

    // Draw a circle using lines and oerturb it with random values
    for(let angle = step; angle <= 360; angle += step) {
        let x = width/2 + (radius * cos(angle)) + random(-amplitute/2, amplitute/2);
        let y = height/2 + (radius * sin(angle)) + random(-amplitute/2, amplitute/2);

        line(lastx, lasty, x, y);

        lastx = x;
        lasty = y;
    }
}
