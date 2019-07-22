
function dfs(init, adj, goalTest) {
    let stack = [init];
    let visited = {init: null};

    while(stack.length > 0) {
        // Apply DFS strategy to expand node
        let cnode = stack.pop();

        // Check if cnode is the goal
        if (goalTest(cnode)) {
            return pathToGoal(init, cnode, visited);
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

function bfs(init, adj, goalTest) {
    let queue = [init];
    let visited = {init: null};

    while(queue.length > 0) {
        // Apply DFS strategy to expand node
        let cnode = queue.shift();

        // Check if cnode is the goal
        if (goalTest(cnode)) {
            return pathToGoal(init, cnode, visited);
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
    let path = [goal];

    let n = goal;
    while(n != init) {
        n = visited[n];
        path.push(n);
    }

    return path;
}
