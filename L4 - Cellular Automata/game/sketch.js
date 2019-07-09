
function setup() {
    createCanvas(600, 600);

    w = 10;
    game = new GameOfLife(width/w, height/w);
}

function draw() {
    game.draw(w);
    game.generate();
}
