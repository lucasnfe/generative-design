
function setup() {
    createCanvas(500, 500);

    cellSize = 10;
    ruleset = [0,1,0,1,1,0,1,0];
    ca = new CellularAutomata(width/cellSize, ruleset);
}

function draw() {
    ca.draw(cellSize);
    ca.generate();

    console.log(ca.generation);
    if(ca.generation > width/cellSize) {
        // Start a new CA with random ruleset
        for(let i = 0; i < ruleset.length; i++) {
            ruleset[i] = random() < 0.5 ? 0 : 1;
        }

        ca = new CellularAutomata(width/cellSize, ruleset);
    }
}
