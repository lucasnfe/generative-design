
function setup() {
    createCanvas(600, 600);

    w = 10;
    ruleset = [0,1,0,1,1,0,1,0];
    ca = new CellularAutomata(width/w, ruleset);
}

function draw() {
    ca.draw(w);
    ca.generate();
}
