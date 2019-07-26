
let xs = [];
let ys = [];

let maxX = 10;

function setup() {
    createCanvas(500, 500);

    // Training set
    let train = generateData(7, 3, 900);

    xs = train[0];
    ys = train[1];

    nn = new Perceptron(xs[0].length);
    // nn.train(xs, ys, 0.01, 100);

    // test set
    // let test = generateData(7, 3, 100);
    //
    // nxs = test[0];
    // nys = test[1];
    //
    // let accuracy = nn.evaluate(nxs, nys);
    // console.log("accuracy", accuracy);
}

function draw() {
    background(255);

    // Draw the dataset
    strokeWeight(5);
    for(let i = 0; i < xs.length; i++) {
        if(ys[i] == 0) {
            stroke("red");
        }
        else if(ys[i] == 1) {
            stroke("green");
        }

        point((xs[i][0]/maxX) * width,
              (xs[i][1]/maxX) * height);
    }

    nn.epoch(xs, ys, 0.00001);

    // Draw the weights vector as a line
    stroke("black");
    strokeWeight(1);

    let x1 = 0;
    let y1 = (-nn.ws[1]*x1 - nn.ws[0])/nn.ws[2];
    let x2 = maxX;
    let y2 = (-nn.ws[1]*x2 - nn.ws[0])/nn.ws[2];

    line((x1/maxX)*width, (y1/maxX)*height,
         (x2/maxX)*width, (y2/maxX)*height);
}

// Generates data for college adimission problem
function generateData(mean, sd, n) {
    let xs = [];
    let ys = [];

    for(let i = 0; i < n; i ++) {
        let grade1 = constrain(randomGaussian(mean, sd), 0, maxX);
        let grade2 = constrain(randomGaussian(grade1, sd), 0, maxX);

        let accepted = 0;

        // We will learn this function
        if((grade1 + grade2)/2 > 8) {
            accepted = 1;
        }

        let x = [grade1, grade2];
        xs.push(x);

        let y = accepted;
        ys.push(y);
    }

    return [xs, ys];
}
