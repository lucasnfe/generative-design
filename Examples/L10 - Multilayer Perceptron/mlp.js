class MLP {
    constructor(inputNodes, hiddenNodes, outputNodes) {
        this.inputNodes  = inputNodes + 1;
        this.hiddenNodes = hiddenNodes + 1;
        this.outputNodes = outputNodes;

        this.ixh = new Matrix(this.hiddenNodes, this.inputNodes);
        this.ixh.randomize(-1, 1);

        this.hxo = new Matrix(this.outputNodes, this.hiddenNodes);
        this.hxo.randomize(-1, 1);
    }

    feedforward(X) {
        // Add the bias term to the input
        this.X = X.slice(0);
        this.X.unshift(1);
        this.X = Matrix.fromArray(this.X);

        // Calculate the activation of the hidden layer
        this.H = Matrix.dot(this.ixh, this.X);
        this.H = Matrix.map(this.H, this.sigmoid);

        // Calculate the activation of the output layer
        this.O = Matrix.dot(this.hxo, this.H);
        this.O = Matrix.map(this.O, this.sigmoid);

        return this.O;
    }

    train(xs, ys, r, epochs) {
        if(xs.length != ys.length) {
            return null;
        }

        // Update weights using Gradient Descent
        for(let i = 0; i < epochs; i++) {
            this.epoch(xs, ys, r);
        }
    }

    epoch(xs, ys, r) {
        // For each example of the dataset
        for(let i = 0; i < xs.length; i++) {

            // i. Feedforward xi to calculate a guess
            this.feedforward(xs[i]);

            // ii. Backpropagate
            let y = Matrix.fromArray(ys[i]);

            // ii.1 Calculate the output error and the hidden error
            let o_error = Matrix.sub(y, this.O);
            let h_error = Matrix.dot(Matrix.transpose(this.hxo), o_error);

            // 2. Calculate the gradient with respect to the output
            let o_grad = Matrix.map(this.O, this.dsigmoid);
            o_grad = Matrix.mult(o_grad, o_error);

            // 3. Calculate the gradient with respect to the hidden
            let h_grad = Matrix.map(this.H, this.dsigmoid);
            h_grad = Matrix.mult(h_grad, h_error);

            // 4. Update Wo
            o_grad = Matrix.mult(o_grad, r);
            let o_delta = Matrix.dot(o_grad, Matrix.transpose(this.H));
            this.hxo = Matrix.add(this.hxo, o_delta);

            // 5. Update Wh
            h_grad = Matrix.mult(h_grad, r);
            let w_delta = Matrix.dot(h_grad, Matrix.transpose(this.X));
            this.ixh = Matrix.add(this.ixh, w_delta);
        }
    }

    sigmoid(x) {
        // Sigmoid activation function
        return 1/(1 + Math.exp(-x));
    }

    dsigmoid(x) {
        return x * (1 - x);
    }

    guess(X) {
        let O = this.feedforward(X);

        if(O.toArray()[0] > 0.5) {
            return 1;
        }

        return 0;
    }

    evaluate(xs, ys) {
        let wrongGuesses = 0;

        // Calculate the accuracy of the model using new data
        for(let i = 0; i < xs.length; i++) {

            // Add the bias term to the input
            let guess = this.guess(xs[i]);

            let error = abs(ys[i][0] - guess);
            wrongGuesses += error;
        }

        return 1.0 - (wrongGuesses/xs.length);
    }

    draw() {
        // Draw the Perceptron decision boundary w0 + w1*x1 + w2*x2 = 0
        stroke("black");
        strokeWeight(1);

        for(let i = 0; i < this.ixh.rows; i++) {
            let row = this.ixh.getRow(i);

            this.drawBoundary(row);
            this.drawWeights(row, "Wh" + i);
        }

        for(let i = 0; i < this.hxo.rows; i++) {
            let row = this.hxo.getRow(i);

            this.drawBoundary(row);
            this.drawWeights(row, "Wo" + i);
        }
    }

    drawBoundary(ws) {
        let x1 = 0;
        let y1 = (-ws[1]*x1 - ws[0])/ws[2];
        let x2 = maxX;
        let y2 = (-ws[1]*x2 - ws[0])/ws[2];

        line((x1/maxX)*width, (y1/maxX)*height,
             (x2/maxX)*width, (y2/maxX)*height);
    }

    drawWeights(row, wname) {
        // Create a 2D vector from the weights disconsireding the bias w0
        let w = createVector(row[1], row[2])
        w.normalize();
        w.mult(50);

        push();

        // Find a point near the end of the linear boundary
        let x3 = maxX/1.5;
        let y3 = (-row[1]*x3 - row[0])/row[2];

        translate((x3/maxX)*width, (y3/maxX)*height);

        // Draw the "body" of the vector
        line(0, 0, w.x, w.y);
        rotate(w.heading());

        // Draw the "head" of the vector
        let arrowSize = 7;
        translate(w.mag() - arrowSize, 0);
        triangle(0, arrowSize/2, 0, -arrowSize/2, arrowSize, 0);

        // Draw the label of the vector
        text(wname, -(w.mag() - arrowSize)/2, -5);

        pop();
    }
}
