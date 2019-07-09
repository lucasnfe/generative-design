let time = 0;

function setup() {
  createCanvas(400, 400);
  stroke(0, 15);
  noFill();

  angleMode(DEGREES);
}

function draw() {
    // Clear the background every 600 frames
    if (frameCount % 600 == 0) {
        clear();
    }

    // Draw sphere with noisy radius
    beginShape();
    for (var ang = 0; ang < 360; ang++) {
        var radius = 200 * noise(ang/100, time);

        var x = width/2 + radius * cos(ang);
        var y = height/2 + radius * sin(ang);

        curveVertex(x, y);
    }
    endShape(CLOSE);

    time += 0.01;
}
