class GameOfLife {
    constructor(w, h) {
        this.w = w;
        this.h = h;
        this.generation = 0;

        // Create a 2d Array of size (w, h) and initialize it with random states
        this.cells = this.initGrid(w, h, 0.5);
    }

    initGrid(w, h, p) {
        let grid = new Array(w).fill(0);
        for(let i = 0; i < w; i++) {
            grid[i] = new Array(h).fill(0);
            for(let j = 0; j < h; j++) {
                grid[i][j] = random() <= p ? 0 : 1;
            }
        }

        return grid;
    }

    evolve() {
        let nextgen = this.initGrid(this.w, this.h, 1);

        // Evolve each individual cell
        for(let i = 1; i < this.w - 1; i++) {
            for(let j = 1; j < this.h - 1; j++) {
                nextgen[i][j] = this.applyRules(i, j);
            }
        }

        this.cells = nextgen;
        this.generation++;
    }

    getAliveNeighbors(x, y) {
        let aliveNeighbors = 0;

        for(let i = -1; i <= 1; i++) {
            for(let j = -1; j <= 1; j++) {
                if(i == 0 && j == 0) {
                    continue;
                }

                if(this.cells[x+i][y+j] == 1) {
                    aliveNeighbors++;
                }
            }
        }

        return aliveNeighbors;
    }

    applyRules(x, y) {
        let aliveNeighbors = this.getAliveNeighbors(x, y);

        // If cell is alive
        if(this.cells[x][y] == 1) {
            // It will die due to overpopulation or loneliness
            if(aliveNeighbors >= 4 || aliveNeighbors <= 1) {
                return 0;
            }
        }
        else if (aliveNeighbors == 3) {
            return 1;
        }

        return this.cells[x][y];
    }

    draw(cellSize) {
        for(let i = 0; i < this.w; i++) {
            for(let j = 0; j < this.h; j++) {
                if(this.cells[i][j] == 1) {
                    fill(0);
                }
                else {
                    fill(255);
                }

                rect(i*cellSize, j*cellSize, cellSize, cellSize);
            }
        }
    }


}
