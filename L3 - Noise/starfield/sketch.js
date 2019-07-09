
function setup() {
    createCanvas(500, 500);
    background(0);
    noStroke();
    noLoop();
}

function draw() {
    fill(255);

    // line parameters
    for(let i = 0; i < 100; i++) {
        let x = random(width);
        let y = random(height);
        let r = random(2 ,7);
        ellipse(x, y, r, r);
    }


}
