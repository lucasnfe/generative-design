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
        console.log(r);

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
}
