from __future__ import division
import time,sys
from music21 import *
s = stream.Stream()
print

# Format is "[input],[timing].[input],[timing].[input],[timing]"
def preprocess_notes(note_input):
    notes = note_input.split(".")
    new_notes = {}
    for idx in range(len(notes)):
        note_name, timing = notes[idx].split(",")
        # replace flat sign "b" with "-" (musescore convention)
        if (len(note_name) > 1 and note_name[1] == "b"):
            note_name = note_name[0] + "-" + note_name[2:]
        # rounds to nearest 16th (0.25 of a quarterLength)
        timing = round(float(timing) * 4 / 1000) / 4

        if timing not in new_notes.keys():
            new_notes[timing] = [note_name]
        else:
            new_notes[timing].append(note_name)
    return new_notes

def add_notes_to_stream(notes):
    timings = sorted(notes.keys())
    if timings[0] != 0:
        r = note.Rest()
        r.quarterLength = timings[0]
        s.append(r)
    for idx in range(len(timings)):
        if (idx == len(timings) - 1):
            end_time = total_time
        else:
            end_time = timings[idx+1]
        start_time = timings[idx]
        c = chord.Chord(notes[timings[idx]])
        c.quarterLength = (end_time - start_time)
        print c.quarterLength
        if timings[idx] != total_time: # WARNING drops note if too close to boundary. Should we keep the note and play it early?
            s.append(c)

if __name__ == "__main__":
    if len(sys.argv) < 3:
        exit(0)
    total_time = float(sys.argv[1]) / 1000
    add_notes_to_stream(preprocess_notes(sys.argv[2]))
    # only generate music if there is input
    if len(s) != 0:
        s.show('text')
        s.show()

