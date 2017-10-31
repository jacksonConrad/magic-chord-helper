// const defaultState = {
//   chords: [ 'a', 'a#', 'b', 'c', 'c#', 'd', 'd#', 'e', 'f', 'f#', 'g', 'g#' ],
//   tonic: null,
//   chordsInKey: [],
//   selectedChords: [],
//   nominatedChords: []
// }

const chordGrid = (state, action) => {
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
      let newChords = state.selectedChords.splice(state.selectedChords.indexOf(action.chord), 1)
      // console.log(chords)
      // console.log(newChords)
      // return state.map(todo =>
      //   (todo.id === action.id)
      //     ? {...todo, completed: !todo.completed}
      //     : todo
      // )

      // return {
      //   ...state,
      //   selectedChords: chords
      // }

      return state

      // return [
      //   ...state,
      //   {
      //     selectedChords: state.selectedChords.splice(state.selectedChords.indexOf(action.chord), 1)
      //   }
      // ]
    // case 'REMOVE_MULTIPLE_CHORDS':
      // return state.map(chord =>
      //   ()
      // )
    default:
      return state
  }
}

export default chordGrid



// export default {
//   chords: [ 'a', 'a#', 'b', 'c', 'c#', 'd', 'd#', 'e', 'f', 'f#', 'g', 'g#' ],
//   tonic: null,
//   chordsInKey: [],
//   selectedChords: [],
//   nominatedChords: []
// }
