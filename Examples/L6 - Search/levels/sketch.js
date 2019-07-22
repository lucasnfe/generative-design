let s = 10;
let world;

function setup() {
    createCanvas(50, 50);

    let init = new Array(width/s).fill(0);
    for(let i = 0; i < init.length; i++) {

        init[i] = new Array(height/s).fill(0);
        for(let j = 0; j < init[i].length; j++) {
            init[i][j] = int(random(2));
        }
    }

    let path = bfs(init, adj, goalTest);
    print("path", path);
    world = path[0];
}

function draw() {
    fill(255);

    for(let i = 0; i < width/s; i++) {
        for(let j = 0; j < height/s; j++) {
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

// A state here is a 2d grid
function adj(state) {
    let adjStates = [];

    for(let i = 0; i < state.length; i++) {
        for(let j = 0; j < state[i].length; j++) {

            if(state[i][j] == 0) {
                // Make a copy of the state
                var newState = [];
                for (var k = 0; k < state.length; k++)
                    newState[k] = state[k].slice();

                newState[i][j] = 1;
                adjStates.push(newState);
            }
            else if (state[i][j] == 1) {
                // Make a copy of the state
                var newState = [];
                for (var k = 0; k < state.length; k++)
                    newState[k] = state[k].slice();

                newState[i][j] = 0;
                adjStates.push(newState);
            }
        }
    }

    return adjStates;
}

// A state here is a 2d grid
function goalTest(state) {
    let w = state.length;
    let h = state[0].length;

    let simmetry = 0;
    for(let i = 0; i < ceil(w/2); i++) {
        for(let j = 0; j < ceil(h/2); j++) {
            simmetry += abs(state[i][j] - state[w - i - 1][j])
            simmetry += abs(state[i][j] - state[i][h - j - 1])
            simmetry += abs(state[i][j] - state[w - i - 1][h - j - 1])
        }
    }

    return (simmetry == 0);
}
