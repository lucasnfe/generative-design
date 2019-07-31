class Perceptron {
    constructor(xsize) {
        this.ws = this.initWeights(xsize);
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
            // Add the bias term to the input
            let x = xs[i].slice(0);
            x.unshift(1);

            // Perform a guess using current weights ws
            let guess = this.guess(x);
            let error = ys[i] - guess;

            // Update the weights according to Gradient Descent
            for (let j = 0; j < this.ws.length; j++) {
                this.ws[j] += x[j] * error * r;
            }
        }
    }

    guess(x) {
        let d = this.dot(this.ws, x);
        return this.activate(d);
    }

    activate(x) {
        // This is a binary step activation function
        if(x > 0) {
            return 1;
        }

        return 0;
    }

    initWeights(xsize) {
        let ws = new Array(xsize + 1);

        for(let i = 0; i < ws.length; i++) {
            ws[i] = random(-1, 1);
        }

        return ws;
    }

    dot(ws, xs) {
        if(ws.length != xs.length) {
            return undefined;
        }

        let d = 0;
        for(let i = 0; i < ws.length; i++) {
            d += ws[i] * xs[i];
        }

        return d;
    }

    evaluate(xs, ys) {
        let wrongGuesses = 0;

        // Calculate the accuracy of the model using new data
        for(let i = 0; i < xs.length; i++) {

            // Add the bias term to the input
            let x = xs[i].slice(0);
            x.unshift(1);

            let error = abs(ys[i] - this.guess(x));
            wrongGuesses += error;
        }

        return 1.0 - (wrongGuesses/xs.length);
    }

    draw() {
        // Draw the Perceptron decision boundary w0 + w1*x1 + w2*x2 = 0
        stroke("black");
        strokeWeight(1);

        let x1 = 0;
        let y1 = (-this.ws[1]*x1 - this.ws[0])/this.ws[2];
        let x2 = maxX;
        let y2 = (-this.ws[1]*x2 - this.ws[0])/this.ws[2];

        line((x1/maxX)*width, (y1/maxX)*height,
             (x2/maxX)*width, (y2/maxX)*height);

        // Draw the Perceptron weights vector
        this.drawWeights();
    }

    drawWeights() {
        // Create a 2D vector from the weights disconsireding the bias w0
        let w = createVector(nn.ws[1], nn.ws[2])
        w.normalize();
        w.mult(50);

        push();

        // Find a point near the end of the linear boundary
        let x3 = maxX/1.25;
        let y3 = (-this.ws[1]*x3 - this.ws[0])/this.ws[2];

        translate((x3/maxX)*width, (y3/maxX)*height);

        // Draw the "body" of the vector
        line(0, 0, w.x, w.y);
        rotate(w.heading());

        // Draw the "head" of the vector
        let arrowSize = 7;
        translate(w.mag() - arrowSize, 0);
        triangle(0, arrowSize/2, 0, -arrowSize/2, arrowSize, 0);

        // Draw the label of the vector
        text("w", -(w.mag() - arrowSize)/2, -2);

        pop();
    }
}
