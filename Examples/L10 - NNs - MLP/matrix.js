
class Matrix {
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;

        this.elems = new Array(rows).fill(0);
        for(let i = 0; i < this.rows; i++) {
            this.elems[i] = new Array(cols).fill(0);
        }
    }

    randomize(min, max) {
        for(let i = 0; i < this.rows; i++) {
            for(let j = 0; j < this.cols; j++) {
                this.elems[i][j] = random(min, max);
                // this.elems[i][j] = randomGaussian();
            }
        }
    }

    toArray() {
        let a = [];

        for (var i = 0; i < this.rows; i++) {
          for (var j = 0; j < this.cols; j++) {
            a.push(this.elems[i][j]);
          }
        }

        return a;
    }

    getRow(i) {
        let a = [];

        for (var j = 0; j < this.cols; j++) {
            a.push(this.elems[i][j]);
        }

        return a;
    }

    getCol(j) {
        let a = [];

        for (var i = 0; i < this.rows; i++) {
            a.push(this.elems[i][j]);
        }

        return a;
    }

    static fromArray(a) {
        let b = new Matrix(a.length, 1);

        for(let i = 0; i < a.length; i++) {
            b.elems[i][0] = a[i];
        }

        return b;
    }

    static map(a, func) {
        let b = new Matrix(a.rows, a.cols);

        for(let i = 0; i < b.rows; i++) {
            for(let j = 0; j < b.cols; j++) {
                b.elems[i][j] = func(a.elems[i][j]);
            }
        }

        return b;
    }

    static transpose(a) {
        let b = new Matrix(a.cols, a.rows);

        for(let i = 0; i < a.cols; i++) {
            for(let j = 0; j < a.rows; j++) {
                b.elems[i][j] = a.elems[j][i];
            }
        }

        return b;
    }

    static add(a, b) {
        let c = new Matrix(a.rows, a.cols);

        for(let i = 0; i < a.rows; i++) {
            for(let j = 0; j < a.cols; j++) {
                c.elems[i][j] = a.elems[i][j] + b.elems[i][j];
            }
        }

        return c;
    }

    static sub(a, b) {
        let c = new Matrix(a.rows, a.cols);

        for(let i = 0; i < a.rows; i++) {
            for(let j = 0; j < a.cols; j++) {
                c.elems[i][j] = a.elems[i][j] - b.elems[i][j];
            }
        }

        return c;
    }

    static mult(a, b) {
        let c = new Matrix(a.rows, a.cols);

        if (b instanceof Matrix) {
            for (var i = 0; i < a.rows; i++) {
                for (var j = 0; j < a.cols; j++) {
                    c.elems[i][j] = a.elems[i][j] * b.elems[i][j];
                }
            }
        }
        else {
            for (var i = 0; i < a.rows; i++) {
                for (var j = 0; j < a.cols; j++) {
                    c.elems[i][j] = a.elems[i][j] * b;
                }
            }
        }

        return c;
    }

    static dot(a, b) {
        if(a.cols != b.rows) {
            return null;
        }

        let c = new Matrix(a.rows, b.cols);
        for(let i = 0; i < a.rows; i++) {
            for(let j = 0; j < b.cols; j++) {

                let sum = 0;
                for(let k = 0; k < a.cols; k++) {
                    sum += a.elems[i][k] * b.elems[k][j]
                }

                c.elems[i][j] = sum;
            }
        }

        return c;
    }
}
