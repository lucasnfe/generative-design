let s = 10;
let bestLevel = null;

function setup() {
    createCanvas(100, 100);

    levelW = width/s;
    levelH = height/s;

    ga = new GeneticAlgorithm(1000, levelW * levelH, symFunc);
}

function draw() {
    background(80);

    let bestInd = ga.evolve();
    bestLevel = gen2phen(bestInd.gens, levelW, levelH);
    console.log(bestInd);

    for(let i = 0; i < levelW; i++) {
        for(let j = 0; j < levelH; j++) {
            if(bestLevel[i][j] == 1) {
                fill(0);
            }
            else if(bestLevel[i][j] == 0) {
                fill(255);
            }

            rect(j*s, i*s, s, s);
        }
    }
}

// Creates a level of size (w,h) from a GA individual (1D array)
function gen2phen(individual, w, h) {
    let level = new Array(w);
    for(let i = 0; i < w; i++) {
        level[i] = new Array(h);
    }

    // Reshape a 1D individual onto a 2D level of size (w,h)
    for(let i = 0; i < individual.length; i++) {
        let x = i % w;
        let y = int(i / w);

        level[x][y] = individual[i];
    }

    return level;
}

function symFunc(individual) {
    let level = gen2phen(individual, levelW, levelH);

    let w = levelW;
    let h = levelH;

    let simmetry = 0;
    for(let i = 0; i < ceil(w/2); i++) {
        for(let j = 0; j < ceil(h/2); j++) {
            simmetry += abs(level[i][j] - level[w - i - 1][j])
            simmetry += abs(level[i][j] - level[i][h - j - 1])
            simmetry += abs(level[i][j] - level[w - i - 1][h - j - 1])
        }
    }

    return (w*h) - simmetry;
}
