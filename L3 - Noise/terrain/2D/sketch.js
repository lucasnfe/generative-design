
function setup() {
    createCanvas(500,500);
    frameRate(30);

    pixelDensity(1);
}

function draw() {
    clear();

    for(let x = 0; x < width; x++) {
        for(let y = 0; y < height; y++) {

            // WorldHeight is a number between 0 and 1
            let worldHeight = noise(x/150, y/150);

            // Mapping WorldHeight using a color scale
            // Deep water
            if(worldHeight >= 0 && worldHeight < 0.2) {
                stroke(200);
            }

            // Shalow water
            else if(worldHeight >= 0.2 && worldHeight < 0.4) {
                stroke(150);
            }

            // Sand
            else if(worldHeight >= 0.4 && worldHeight < 0.6) {
                stroke(100);
            }

            // Grass
            else if(worldHeight >= 0.6 && worldHeight < 0.8) {
                stroke(50);
            }

            // Mountain
            else if(worldHeight >= 0.8 && worldHeight <= 1.0) {
                stroke(5);
            }

            point(x, y);
        }
    }

    noLoop();
}
