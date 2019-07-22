let cellW = 10;

function setup() {
  createCanvas(800,500);
  strokeWeight(1);

  let gameWidth = width/cellW;
  let gameHeight = height/cellW;

  game = new GameOfLife(gameWidth, gameHeight);
}

function draw() {
    game.draw(cellW);
    game.evolve();
 }
