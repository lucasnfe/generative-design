let s = 10;
let path = [];

function setup() {
    createCanvas(200, 200);

    init = createVector(0, 0);
    end = createVector(19, 19);

    world = new Array(width/s).fill(0);
    for(let i = 0; i < world.length; i++) {
        world[i] = new Array(height/s).fill(0);
    }
}

function draw() {
    // clear();

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

    if(frameCount % 20 == 0) {
        path = dfs(init, adj, goalTest);
    }

    // draw path
    if(path != null) {
        for(let n of path) {
            fill(100);
            rect(n.x*s, n.y*s, s, s);
        }
    }

    // draw init
    fill(100);
    rect(init.x*s, init.y*s, s, s);

    // draw end
    fill(0, 100, 0);
    rect(end.x*s, end.y*s, s, s);
}

// A state here is a vector
function adj(state) {
    let adjStates = [];

    let top = createVector(state.x, state.y - 1);
    if(world[top.x][top.y] != null && world[top.x][top.y] == 0) {
        adjStates.push(top);
    }

    let right = createVector(state.x + 1, state.y);
    if(world[right.x] && world[right.x][right.y] == 0) {
        adjStates.push(right);
    }

    let bottom = createVector(state.x, state.y + 1);
    if(world[bottom.x][bottom.y] != null && world[bottom.x][bottom.y] == 0) {
        adjStates.push(bottom);
    }

    let left = createVector(state.x - 1, state.y);
    if(world[left.x] && world[left.x][left.y] == 0) {
        adjStates.push(left);
    }

    return adjStates;
}

// A state here is a vector
function goalTest(state) {
    return (state.x == end.x) && (state.y == end.y);
}

function mousePressed() {
    let x = int(mouseX/s);
    let y = int(mouseY/s);

    if (mouseButton === LEFT) {
        world[x][y] = 1;
    }
    else if (mouseButton === RIGHT) {
        end = createVector(x, y);
    }
}

function mouseDragged() {
    if(mouseIsPressed && mouseButton === LEFT) {
        let x = int(mouseX/s);
        let y = int(mouseY/s);
        world[x][y] = 1;
    }
}
