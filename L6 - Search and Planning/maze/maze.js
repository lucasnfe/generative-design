
function generateMaze(world, init, adj) {
    let stack = [];
    let visited = {};

    // 1. Make the initial cell the current cell and mark it as visited
    let cnode = init;
    visited[cnode] = null;

    // 2. While there are unvisited cells
    while(cnode != null) {
        // i. Choose randomly one of the unvisited neighbours
        let rnode = getRandomNeighbour(cnode, adj, visited);

        // 2.1 If the current cell has any neighbours which have not been visited
        if(rnode != null) {
            // ii. Push the current cell to the stack
            stack.push(cnode);

            // iii. Remove the wall between the current cell and the chosen cell
            removeWall(world, cnode, rnode);

            // iv. Make the chosen cell the current cell and mark it as visited
            visited[rnode] = cnode;
            cnode = rnode;
        }
        else {
            cnode = stack.pop();
        }
    }
}

function removeWall(world, cnode, rnode) {
    let x = cnode.x - rnode.x;
    let y = cnode.y - rnode.y;

    if(x == -1) {
        // Current cell in on the left side
        world[cnode.x][cnode.y] &= 11;
        world[rnode.x][rnode.y] &= 14;
    }
    else if(x == 1) {
        // Current cell in on the right side
        world[cnode.x][cnode.y] &= 14;
        world[rnode.x][rnode.y] &= 11;
    }

    if(y == -1) {
        // Current cell is on the top
        world[cnode.x][cnode.y] &= 13;
        world[rnode.x][rnode.y] &= 7;
    }
    else if(y == 1) {
        // Current cell in at the bottom
        world[cnode.x][cnode.y] &= 7;
        world[rnode.x][rnode.y] &= 13;
    }
}

function getRandomNeighbour(cnode, adj, visited) {
    let nonVisitedNeighbours = [];

    for(let n of adj(cnode)) {
        if(!(n in visited)) {
            nonVisitedNeighbours.push(n);
        }
    }

    return random(nonVisitedNeighbours);
}
