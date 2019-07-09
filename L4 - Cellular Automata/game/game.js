class GameOfLife {
    constructor(columns, rows) {
        this.generation = 0;

        this.columns = columns;
        this.rows = rows;

        this.cells = new Array(this.columns);
        for (let i = 0; i < this.rows; i++) {
            this.cells[i] = new Array(rows);
        }

        // Initialize cells with all zeros and one in the middle
        for (let i = 0; i < columns; i++) {
            for (let j = 0; j < rows; j++) {
                this.cells[i][j] = int(random(2));
            }
        }
     }

     generate() {
         let nextgen = new Array(this.columns);
         for (let i = 0; i < this.rows; i++) {
             nextgen[i] = new Array(this.rows);
         }

         for (let x = 1; x < this.columns - 1; x++) {
             for (let y = 1; y < this.rows - 1; y++) {

                 let neighbors = 0;
                 for (let i = -1; i <= 1; i++) {
                     for (let j = -1; j <= 1; j++) {
                         neighbors += this.cells[x+i][y+j];
                     }
                 }

                 neighbors -= this.cells[x][y];

                 if      ((this.cells[x][y] == 1) && (neighbors <  2)) nextgen[x][y] = 0;
                 else if ((this.cells[x][y] == 1) && (neighbors >  3)) nextgen[x][y] = 0;
                 else if ((this.cells[x][y] == 0) && (neighbors == 3)) nextgen[x][y] = 1;
                 else nextgen[x][y] = this.cells[x][y];
             }
         }

         this.cells = nextgen;
         this.generation++;
     }

     draw(w) {
         for (let i = 0; i < this.columns;i++) {
             for (let j = 0; j < this.rows;j++) {
                 if ((this.cells[i][j] == 1)) {
                     fill(0);
                 }
                 else {
                     fill(255);
                 }

                 stroke(0);
                 rect(i*w, j*w, w, w);
            }
        }
    }
}
