import os
import json
import argparse

parser = argparse.ArgumentParser(description='load_midi.py')
parser.add_argument('--dat', type=str, default="./",  help="Path to directory containing MIDI files.")
parser.add_argument('--out', type=str, default="midi_files.json",  help="Path to save the json file.")
opt = parser.parse_args()

midi_files = {};

ix = 0;
for file in os.listdir(opt.dat):
    midipath = os.path.join(opt.dat, file)

    # Check if it is not a directory and if it has either .midi or .mid extentions
    if os.path.isfile(midipath) and (midipath[-5:] == ".midi" or midipath[-4:] == ".mid"):
        filename = os.path.join(opt.dat, file)
        filename = filename.replace("../", "")

        midi_files["file" + str(ix)] = filename;

    ix += 1;

with open(opt.out, 'w') as f:
    json.dump(midi_files, f)
