export const addChord = chord => {
  return {
    type: 'ADD_CHORD',
    chord
  }
}

export const removeChord = chord => {
  return {
    type: 'REMOVE_CHORD',
    chord
  }
}

export const removeMultipleChords = chords => {
  return {
    type: 'REMOVE_MULTIPLE_CHORDS',
    chords
  }
}
