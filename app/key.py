import time,sys
from music21 import *
score_generation_speed = 5      # not using yet
lastNoteTime = 0               # not using yet
s = stream.Stream()
print("HELLO")

def add_note_to_stream(note_name):
    # replace flat sign "b" with "-" (musescore convention)
    if (len(note_name) > 1 and note_name[1] == "b"):
        note_name[1] = "-"

    currentTime = time.time()
    # Initialize if this has never been called...
    lastNoteTime = currentTime - 1

    n = note.Note(note_name)
    n.quarterLength = currentTime - lastNoteTime
    print n.quarterLength
    lastNoteTime = currentTime
    s.append(note.Note(note_name))
    s.show()

if __name__ == "__main__":
    add_note_to_stream(sys.argv[1])
