let _rnn;

class RNN {
    constructor(inputNodes, hiddenNodes, outputNodes) {
        this.inputNodes  = inputNodes;
        this.hiddenNodes = hiddenNodes;
        this.outputNodes = outputNodes;

        this.wxh = tf.variable(tf.randomUniform([hiddenNodes, inputNodes], -1, 1));
        this.whh = tf.variable(tf.randomUniform([hiddenNodes, hiddenNodes], -1, 1));
        this.why = tf.variable(tf.randomUniform([outputNodes, hiddenNodes], -1, 1));

        _rnn = this;
    }

    forward(x, hprev) {
        // ht = tanh(Whh * ht-1 + Wxh * xt)
        let h = tf.tanh(tf.add(tf.dot(this.whh, hprev), tf.dot(this.wxh, x)));

        // ŷt = Why* ht
        let y = tf.dot(this.why, h);

        return {"y": y, "h": h};
    }

    train(xs, epochs, t) {
        for(let i = 0; i < epochs; i++) {
            this.epoch(xs, t);
        }
    }

    epoch(xs, t) {
        const learningRate = 0.01;
        const optimizer = tf.train.sgd(learningRate);

        for(let i = 0; i < xs.length; i += t) {
            let xst = xs.slice(i, i + t);
            let yst = xs.slice(i+1, i+1 + t);

            let hprev = tf.zeros([this.hiddenNodes]);

            let totalLoss = 0;

            // Processing a sentence Si of size t
            for(let j = 0; j < t; j++) {
                if(xst[j] && yst[j]) {

                    // Processing a character Si,j
                    let x = oneHot(xst[j]);
                    let y = oneHot(yst[j]);

                    optimizer.minimize(function() {
                        let output = _rnn.forward(x, hprev);
                        let loss = tf.losses.softmaxCrossEntropy(y, output.y);

                        totalLoss += loss.dataSync()[0];
                        return loss;
                    });

                    hprev = _rnn.forward(x, hprev).h;
                }
            }

            console.log(this.generate("a", hprev, 100));
        }
    }

    generate(x, hprev, n) {
        let oneHotX = oneHot(x);
        let genText = x;

        for(let i = 0; i < n; i++) {
            let output = this.forward(oneHotX, hprev);

            let ix = tf.multinomial(output.y, 1).dataSync()[0];
            let ch = vocab.ix2char[ix];

            genText += ch;

            oneHotX = oneHot(ch);
            hprev = output.h;
        }

        return genText;
    }
}
