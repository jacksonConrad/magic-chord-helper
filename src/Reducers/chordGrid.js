const initial = {
  chords: [ 'a', 'a#', 'b', 'c', 'c#', 'd', 'd#', 'e', 'f', 'f#', 'g', 'g#' ],
  tonic: null,
  chordsInKey: [],
  selectedChords: [],
  nominatedChords: []
}

const ChordGrid = (state = initial, action) => {
  switch (action.type) {
    case 'ADD_CHORD':
      console.log('ADD_CHORD')
      let chords = state.selectedChords
      let chordIndex = chords.length

      chords[chordIndex] = action.chord

      return {
        ...state,
        selectedChords: chords
      }

    case 'REMOVE_CHORD':
      console.log('REMOVE_CHORD')
      let nextChords = state.selectedChords.filter(element => element !== action.chord)
      return {
        ...state,
        selectedChords: nextChords
      }
    default:
      return state
  }
}

export default ChordGrid
