let s = 10;

function setup() {
    createCanvas(1000, 1000);

    w = width/s;
    h = width/s;

    world = generateSymmetric(w, h);
}

function generateSymmetric(w, h) {
    let world = new Array(w).fill(0);

    for(let i = 0; i < world.length; i++) {
        world[i] = new Array(h).fill(0);
    }

    for(let i = 0; i < ceil(w/2); i++) {
        for(let j = 0; j < ceil(h/2); j++) {
            let tile = int(random(2));

            world[i][j] = tile;
            world[w - i - 1][j] = tile;
            world[i][h - j - 1] = tile;
            world[w - i - 1][h - j - 1] = tile;
        }
    }

    return world;
}

function draw() {
    fill(255);

    for(let i = 0; i < w; i++) {
        for(let j = 0; j < h; j++) {
            if(world[i][j] == 1) {
                fill(0);
            }
            else {
                fill(255);
            }

            rect(i*s, j*s, s, s);
        }
    }
}
