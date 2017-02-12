from __future__ import division
import time,sys
from music21 import *
s = stream.Stream()
print

# Format is "[input],[timing].[input],[timing].[input],[timing]"
def preprocess_notes(note_input):
    notes = note_input.split(".")
    new_notes = []
    for idx in range(len(notes)):
        note_name, timing = notes[idx].split(",")
        timing = round(float(timing) * 4 / 1000) / 4  # rounds to nearest 16th
        new_notes.append([note_name, timing])
    return new_notes

def add_notes_to_stream(notes):
    r = note.Rest()
    r.quarterLength = float(notes[0][1])
    s.append(r)
    for idx in range(len(notes)):
        if (idx == len(notes) - 1):
            end_time = total_time
        else:
            end_time = notes[idx+1][1]
        note_name, start_time = notes[idx]
        # replace flat sign "b" with "-" (musescore convention)
        if (len(note_name) > 1 and note_name[1] == "b"):
            note_name = note_name[0] + "-" + note_name[1:][1:]

        n = note.Note(note_name)
        n.quarterLength = (end_time - start_time)
        print n.quarterLength
        try:
            s.append(n)
        except err:
            print err

if __name__ == "__main__":
    if len(sys.argv) < 3:
        exit(0)
    total_time = float(sys.argv[1]) / 1000
    add_notes_to_stream(preprocess_notes(sys.argv[2]))
    s.show('text')
    s.show()

