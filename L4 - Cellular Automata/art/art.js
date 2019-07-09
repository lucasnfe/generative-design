class ArtCA {
    constructor(columns, rows, n) {

        this.generation = 0;

        this.columns = columns;
        this.rows = rows;

        this.cells = new Array(this.columns);
        for (let i = 0; i < this.rows; i++) {
            this.cells[i] = new Array(rows);
        }

        this.colors = new Array(n);
        for (let i = 0; i < n; i++) {
            this.colors[i] = color(random(0, 255), random(0, 255), random(0, 255)   );
        }

        // Initialize cells with all zeros and one in the middle
        for (let i = 0; i < columns; i++) {
            for (let j = 0; j < rows; j++) {
                this.cells[i][j] = int(random(0, this.colors.length));
            }
        }
     }

     generate() {
         // Create 2D array for next generation
         let nextgen = new Array(this.columns).fill(0);
         for (let i = 0; i < this.rows; i++) {
             nextgen[i] = new Array(this.rows).fill(0);
         }

         for (let x = 1; x < this.columns - 1; x++) {
             for (let y = 1; y < this.rows - 1; y++) {

                let nextValue = this.cells[x][y] + 1;

                if(nextValue == this.cells[x+1][y] ||
                   nextValue == this.cells[x-1][y] ||
                   nextValue == this.cells[x][y+1] ||
                   nextValue == this.cells[x][y-1]) {
                       nextgen[x][y] = nextValue;
                }
             }
         }

         this.cells = nextgen;
         this.generation++;
     }

     draw(w) {
         for (let i = 0; i < this.columns;i++) {
             for (let j = 0; j < this.rows;j++) {
                 let ci = this.cells[i][j];
                 fill(this.colors[ci]);
                 rect(i*w, j*w, w, w);
            }
        }
    }
}
