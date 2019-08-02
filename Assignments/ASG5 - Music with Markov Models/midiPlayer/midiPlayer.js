
let _midiPlayer;

class MidiPlayer {
    constructor() {
        this.isPlaying = false;

        this.pianoRolls = [];
        this.pianoRollPlaying = [];
        this.pianoRollBufferLength = 30;

        this.ts = 0;
        this.bpm = 120;
        this.tsDuration = 7.5/120;
        this.tsize = height/128;

        this.synth = new Tone.PolySynth(10, Tone.Synth, {
            envelope : {
    			attack  : 0.02,
    			decay   : 0.1,
    			sustain : 0.3,
    			release : 1
    		}
    	}).toMaster();

        _midiPlayer = this;
    }

    loadMidis(path, onMidisLoaded) {
        this.midis = [];

        // Load json file with a list of midi files
        this.loadFile(path, "text", function(xhttp) {
            let dataset = JSON.parse(xhttp.responseText);

            for(let filename in dataset) {

                // Load each midi file listed in the json
                _midiPlayer.loadFile(dataset[filename], "arraybuffer", function(xhttp) {
                    let byteArray = new Uint8Array(xhttp.response);

                    let midi = new Midi(byteArray);

                    // Parse midi file to get duration (in seconds) and list of notes per track
                    let midiData = _midiPlayer.parseMidi(midi);

                    // Create a piano roll (2D array) from the parsed midi
                    let pianoRoll = _midiPlayer.notes2PianoRoll(midiData.duration, midiData.notes);

                    _midiPlayer.pianoRolls.push(pianoRoll);

                    // When all files are loaded, call callback function
                    if(_midiPlayer.pianoRolls.length == Object.keys(dataset).length) {
                        onMidisLoaded(_midiPlayer.pianoRolls);
                    }
                });
            }
        });
    }

    loadFile(path, type, onFileLoad) {
        var xhttp = new XMLHttpRequest();
        xhttp.responseType = type;

        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                onFileLoad(xhttp);
            }
        };

        xhttp.open("GET", path, true);
        xhttp.send();
    }

    parseMidi(midiData) {
        let notes = [];
        for(let track of midiData.tracks) {
            for(let note of track.notes) {
                notes.push(note);
            }
        }

        return {"duration": midiData.duration, "notes": notes};
    }

    notes2PianoRoll(duration, notes) {
        let timeSteps = ceil(duration/this.tsDuration);

        // Create empty piano roll.
        let pianoRoll = new Array(timeSteps);
        for (let i = 0; i < timeSteps; i++) {
            pianoRoll[i] = new Array(128).fill(0);
        }

        for(let note of notes) {
            let ts = floor(note.time/this.tsDuration);
            let pitch = note.midi;
            let duration = floor(note.duration/this.tsDuration);

            pianoRoll[ts][pitch] = duration;
        }

        return pianoRoll;
    }

    pianoRoll2Text(pianoRoll) {
        let midiText = "";

        for (let i = 0; i < pianoRoll.length; i++) {
            for (let j = 0; j < pianoRoll[i].length; j++) {
                if (pianoRoll[i][j] > 0) {
                    midiText +=  j + "_" + pianoRoll[i][j] + " ";
                }
            }

            midiText += ". ";
        }

        return midiText;
    }

    text2Midi(midiText) {
        // Create a new midi file
        let midi = new Midi();

        // Add a track
        let track = midi.addTrack();

        let ts = 0;
        for(let word of midiText.split(" ")) {

            if(word == ".") {
                ts += 1;
            }
            else {
                let pitch = word.split("_")[0];
                let duration = word.split("_")[1];

                if(pitch != "" && duration != "") {
                    track.addNote({
                        midi : pitch,
                        time : ts * this.tsDuration,
                        duration: duration * this.tsDuration
                    });
                }
            }
        }

        return midi;
    }

    getPianoRoll() {
        return this.pianoRollPlaying;
    }

    setPianoRoll(pianoRoll, tsCallback) {
        this.ts = 0;

        this.pianoRollPlaying = pianoRoll;

        Tone.Transport.cancel();

        Tone.Transport.bpm.value = this.bpm;
        Tone.Transport.scheduleRepeat(function(time) {
            let ts = _midiPlayer.ts;

            let notesOn = [];
            for(let j = 0; j < 128; j++) {
                if(pianoRoll[ts] && pianoRoll[ts][j] > 0) {
                    let pitch = Tone.Frequency(j, "midi");
                    let duration = pianoRoll[ts][j] * _midiPlayer.tsDuration;

                    _midiPlayer.synth.triggerAttackRelease(pitch, duration);
                    notesOn.push({"pitch": pitch, "duration": duration});

                }
            }

            if(tsCallback) {
                tsCallback(ts, notesOn);
            }

            _midiPlayer.ts += 1;
        }, this.tsDuration);
    }

    pause() {
        Tone.Transport.pause();
    }

    start() {
        Tone.Transport.start();
    }

    draw() {
        background(240);

        if (mouseIsPressed) {
            // if (this.isPlaying) {
            //     this.start();
            // }
            // else {
            //     this.pause();
            // }


            let deltaX = mouseX - pmouseX;

            if(this.ts - deltaX >= 0) {
                this.ts -= deltaX;
                Tone.Transport.seconds = this.ts * this.tsDuration;
            }
        }

        // Draw grid
        noFill();
        stroke(255);

        let s = this.tsize;
        for (let i = 0; i < width/s; i++) {
            rect(i*this.tsize, 0, s, s*128);
        }

        for (let j = 0; j < height/s; j++) {
            rect(0, j*s, s*width/s, s);
        }

        // Draw piano roll
        if(this.pianoRollPlaying) {
            for (let i = this.ts - this.pianoRollBufferLength; i < this.ts + width/s; i++) {
                for (let j = 0; j < height/s; j++) {
                    if (this.pianoRollPlaying[i] && this.pianoRollPlaying[i][j] > 0) {
                        let duration = this.pianoRollPlaying[i][j];

                        if(i <= this.ts) {
                            stroke(0, 0, 0, 100);
                        }
                        else {
                            noStroke();
                        }

                        fill(80, 180, 80);
                        rect((i - this.ts) * s, j*s, duration*s, s);
                    }
                }
            }
        }

        // Draw time step
        fill(0, 0, 0, 100);
        rect(0, 0, s, s*128);
    }
}

function keyPressed() {

    if(keyCode === 32) {
        _midiPlayer.isPlaying = !_midiPlayer.isPlaying;

        if (_midiPlayer.isPlaying) {
            _midiPlayer.start();
        }
        else {
            _midiPlayer.pause();
        }
    }
}
