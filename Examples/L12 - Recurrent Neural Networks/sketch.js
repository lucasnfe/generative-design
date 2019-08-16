let dataset;
let vocab;

function preload() {
    dataset = loadStrings('data/shakespeare.txt');
}

function parseDataset(dataset) {
    let text = "";

    for(let line of dataset) {
        text += line + "\n";
    }

    return text;
}

function createVocabulary(text) {
    let symbols = new Set(text);

    let char2ix = {};
    let ix2char = {};

    let ix = 0 ;
    for(let ch of symbols) {
        char2ix[ch] = ix;
        ix2char[ix] = ch;
        ix++;
    }

    return {"symbols": symbols, "char2ix": char2ix, "ix2char": ix2char};
}

function oneHot(ch) {
    let ix = vocab.char2ix[ch];
    return tf.oneHot(ix, vocab.symbols.size);
}

function setup() {
    createCanvas(500, 500);

    textSize(16);

    inputText = parseDataset(dataset);
    vocab = createVocabulary(inputText);

    let inputNeurons = vocab.symbols.size;
    let hiddenNeurons = 100;
    let outputNeurons = vocab.symbols.size;

    rnn = new RNN(inputNeurons, hiddenNeurons, outputNeurons);
    // rnn.train(text, 1, 25);
}

function draw() {
    background(230);

    rnn.epoch(inputText, 25);
    let hprev = tf.zeros([rnn.hiddenNodes]);
    let name = rnn.generate("a", hprev, 100);

    text(name, 10, 20);
}
