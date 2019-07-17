
function dfs(init, end, adj, goalTest) {
    let stack = [init];
    let visited = {init: null};

    while(stack.length > 0) {
        // Apply DFS strategy to expand node
        let cnode = stack.pop();

        // Check if cnode is the goal
        if (goalTest(cnode, end)) {
            return pathToGoal(init, end, visited);
        }

        // Iterate on the list of adjacent nodes
        for (let cnext of adj(cnode)) {
            if(!(cnext in visited)) {
                visited[cnext] = cnode;
                stack.push(cnext);
            }
        }
    }

    return null;
}

function bfs(init, end, adj, goalTest) {
    let queue = [init];
    let visited = {init: null};

    while(queue.length > 0) {
        // Apply DFS strategy to expand node
        let cnode = queue.shift();

        // Check if cnode is the goal
        if (goalTest(cnode, end)) {
            return pathToGoal(init, end, visited);
        }

        // Iterate on the list of adjacent nodes
        for (let cnext of adj(cnode)) {
            if(!(cnext in visited)) {
                visited[cnext] = cnode;
                queue.push(cnext);
            }
        }
    }

    return null;
}

function pathToGoal(init, goal, visited) {
    let path = [];

    let n = goal;
    while(n != init) {
        path.push(n);
        n = visited[n];
    }

    return path;
}
