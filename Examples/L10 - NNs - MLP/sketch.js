
let trainXs = [];
let trainYs = [];

let testXs = [];
let testYs = [];

let maxX = 10;

function setup() {
    createCanvas(500, 500);

    // Training set
    let train = generateData(7, 3, 3000);

    trainXs = train[0];
    trainYs = train[1];

    nn = new MLP(trainXs[0].length, 2, trainYs[0].length);

    // test set
    let test = generateData(7, 3, 100);

    testXs = test[0];
    testYs = test[1];
}

function draw() {
    background(255);

    // Draw the dataset
    strokeWeight(5);
    for(let i = 0; i < trainXs.length; i++) {
        if(trainYs[i] == 0) {
            stroke(255, 0, 0, 150);
        }
        else if(trainYs[i][0] == 1) {
            stroke(0, 200, 0, 150);
        }

        point((trainXs[i][0]/maxX) * width,
              (trainXs[i][1]/maxX) * height);
    }

    nn.epoch(trainXs, trainYs, 0.001);

    let accuracy = nn.evaluate(testXs, testYs);
    console.log("accuracy", accuracy);

    // Draw the weight vector
    nn.draw();
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
