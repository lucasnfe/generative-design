
async function setup() {
    createCanvas(500, 500);

    // Create a synthetic dataset
    const train = generateData(7, 3, 100);

    trainXs = train[0];
    trainYs = train[1];

    const tx = tf.tensor2d(trainXs);
    const ty = tf.tensor2d(trainYs);

    tx.print();
    ty.print();

    // Defining a Multilayer Perceptron
    const model = tf.sequential();

    const hidden = tf.layers.dense({units: 2, inputShape: [2], activation: 'sigmoid'});
    const output = tf.layers.dense({units: 1, activation: 'sigmoid'});

    model.add(hidden);
    model.add(output);

    const learningRate = 0.01;
    const optimizer = tf.train.sgd(learningRate);
    model.compile({loss: 'meanSquaredError', optimizer: optimizer});

    const fitResults = await model.fit(tx, ty, {
        epochs: 100
    });

    console.log(fitResults.history.loss);
}

// Generates data for college adimission problem
function generateData(mean, sd, n) {
    let xs = [];
    let ys = [];

    for(let i = 0; i < n; i ++) {
        let grade1 = randomGaussian(mean, sd);
        let grade2 = randomGaussian(grade1, sd);

        let accepted = 0;

        // We will learn this function
        if((grade1 + grade2)/2 > 7 || (grade1 + grade2)/2 < 3) {
            accepted = 1;
        }

        let x = [grade1, grade2];
        xs.push(x);

        let y = [accepted];
        ys.push(y);
    }

    return [xs, ys];
}
