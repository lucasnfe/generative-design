
let isClicked = false;

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(240);

    button = createButton('Play');
    button.position(width - 80, 20);
    button.mousePressed(onButtonClicked);

    midiPlayer = new MidiPlayer();
    midiPlayer.loadMidis("data/midi_files.json", onMIDIsLoaded);
}

function draw() {
    midiPlayer.draw();
}

function onButtonClicked() {
    isClicked = !isClicked;

    if(isClicked) {
        // console.log("start");
        button.elt.innerHTML = "Pause";
        midiPlayer.start();
    }
    else {
        button.elt.innerHTML = "Play";
        midiPlayer.pause();
    }
}

function onMIDIsLoaded(pianoRolls) {
    // Pick random file to play
    let pianoRoll = random(pianoRolls);

    midiPlayer.setPianoRoll(pianoRoll, tsCallback);

    // Encode the piano roll (2D array) as string
    let midiText = midiPlayer.pianoRoll2Text(pianoRoll);
    console.log(midiText);
}

function tsCallback(currentTs, notesOn) {
    // console.log(currentTs, notesOn);
}
