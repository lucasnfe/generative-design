let autoencoder;

function preload() {
  trainCSV = loadStrings('data/mnist_train_10000.csv');
  testCSV  = loadStrings('data/mnist_test_1000.csv');
}

function setup() {
    epochs = 0;
    digitIx = 0;

    train = loadMNIST(trainCSV, true);
    test = loadMNIST(testCSV);

    createCanvas(56, 56);
    pixelDensity(1);
    background(0);

    // Create a blank user canvas
    userPixels = createGraphics(28, 28);
    userPixels.background(0);

    autoencoder = new Autoencoder(28 * 28, 400, 200, 400);
}

async function draw() {
    if(mouseIsPressed) {
        drawCircleWithNoise(mouseX, mouseY - 28);
    }

    let digit = train.xs[digitIx];
    let noisyDigit = train.nxs[digitIx];

    drawDigit(0, 0, scalePixels(noisyDigit, 255));
    drawDigit(28, 0, scalePixels(digit, 255));

    let result = await autoencoder.step(tf.tensor([digit]), tf.tensor([noisyDigit]));
    trainLog(result);
}

function trainLog(result) {
    if(digitIx % (train.xs.length - 1) == 0) {
        console.log("-> epoch:", epochs);
        epochs++;
        digitIx = 0;
    }

    if(digitIx % 100 == 0) {
        console.log("Digits Processed:", digitIx);
        console.log(result);

        let x = scalePixels(readBWPixels(), 1/255);
        let y = autoencoder.guess(x);

        let denoisedDigit = y.dataSync();
        drawDigit(28, 28, scalePixels(denoisedDigit, 255));
    }

    digitIx++;
}

function drawCircleWithNoise(x, y) {
    userPixels.noStroke();
    userPixels.fill(255);

    userPixels.ellipse(x, y, 2, 2);

    if(random() < 0.5) {
        let rx = int(random(0, 29));
        let ry = int(random(0, 29));

        userPixels.fill(int(random(2)) * 255);
        userPixels.rect(rx, ry, 1, 1);
    }

    image(userPixels, 0, 28, 28, 28);
}

function drawDigit(dx, dy, digit) {
    fill(0);
    rect(dx, dy, 28, 28);

    noStroke();
    for (let i = 0; i < digit.length; i++) {
        let x = dx + i % 28;
        let y = dy + int(i / 28);

        fill(int(digit[i]));
        rect(x, y, 1, 1);
    }
}

function addNoise(pixArray) {
    let noisyPixArray = pixArray.slice(0);

    for(let i = 0; i < pixArray.length; i++) {
        if(random() < 0.1) {
            noisyPixArray[i] = int(random(2));
        }
    }

    return noisyPixArray;
}

function scalePixels(pixArray, scale) {
    let normPixArray = pixArray.slice(0);

    for(let i = 0; i < pixArray.length; i++) {
        normPixArray[i] = pixArray[i] * scale;
    }

    return normPixArray;
}

function readBWPixels() {
    userPixels.loadPixels();

    let canvasBWPixels = []
    for(let i = 0; i < userPixels.pixels.length; i += 4) {
        let r = userPixels.pixels[i];
        let g = userPixels.pixels[i+1];
        let b = userPixels.pixels[i+2];

        canvasBWPixels.push((r + g + b)/3);
    }

    return canvasBWPixels;
}

function loadMNIST(dataCSV, addNoiseX) {
    let data = {};
    data.xs = [];
    data.ys = [];

    if(addNoiseX) {
        data.nxs = [];
    }

    for(let i = 0; i < dataCSV.length; i++) {
        let digit = dataCSV[i].split(',');

        let digitLabel  = int(digit[0]);
        let digitPixels = [];

        // Start at 1th because the 0th element is the label
        for(let j = 1; j < digit.length; j++) {

            // Normalize the pixel color between 0..1
            digitPixels.push(float(digit[j])/255);
        }

        data.xs.push(digitPixels);
        data.ys.push(digitLabel);

        if(addNoiseX) {
            data.nxs.push(addNoise(digitPixels));
        }
    }

    return data;
}
