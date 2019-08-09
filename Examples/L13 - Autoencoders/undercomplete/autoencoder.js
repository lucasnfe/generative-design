class Autoencoder {
    constructor(inputNodes, encoderNodes, hiddenNodes, decoderNodes) {
        this.model = tf.sequential();

        this.encoder = tf.layers.dense({units: encoderNodes, inputShape: [inputNodes], activation: 'sigmoid'});
        this.hidden  = tf.layers.dense({units: hiddenNodes, activation: 'sigmoid'});
        this.decoder = tf.layers.dense({units: decoderNodes, activation: 'sigmoid'});
        this.output  = tf.layers.dense({units: inputNodes, activation: 'sigmoid'});

        this.model.add(this.encoder);
        this.model.add(this.hidden);
        this.model.add(this.decoder);
        this.model.add(this.output);

        const learningRate = 0.01;
        const optimizer = tf.train.sgd(learningRate);
        this.model.compile({loss: 'meanSquaredError', optimizer: optimizer});
    }

    async step(x, noisyx) {
        return await this.model.trainOnBatch(noisyx, x);
    }

    guess(x) {
        return this.model.predict(tf.tensor([x]));
    }
}
