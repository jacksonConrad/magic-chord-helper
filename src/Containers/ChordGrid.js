import React, { Component } from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import { addChord, removeChord } from '../Actions'
import Chord from '../Components/Chord.js'

class ChordGrid extends Component {
  constructor(props) {
    super(props)
    this.state = {
      allChords: [ 'a', 'a#', 'b', 'c', 'c#', 'd', 'd#', 'e', 'f', 'f#', 'g', 'g#' ],
      tonic: null,
      chords: {
        'a' : 0,
        'a#' : 1,
        'b' : 2,
        'c' : 3,
        'c#' : 4,
        'd' : 5,
        'd#' : 6,
        'e' : 7,
        'f' : 8,
        'f#' : 9,
        'g' : 10,
        'g#' : 11
      },
      modeMap: {'0': null, '1': 'major', '2': 'minor', '3': 'diminished'},
      chordsInKey: [],
      selectedChords: [0,0,0,0,0,0,0,0,0,0,0,0],
      suggestedChords: [0,0,0,0,0,0,0,0,0,0,0,0]
    }
  }

  componentWillMount = () => {
    this.suggestChords()
  }

  componentWillUpdate = () => {
    this.suggestChords()
  }

  computeIntervalsFromRoot = (tonic) => {
    const major = 'major'
    const minor = 'minor'
    const diminished = 'diminished'
    const chords =    [ 'a', 'a#', 'b', 'c', 'c#', 'd', 'd#', 'e', 'f', 'f#', 'g', 'g#' ]
    const labels =    [ 'I', 'ii', 'iii', 'IV', 'V', 'vi', 'vi' ]
    const modes =      [ major, minor, minor, major, major, minor, diminished ]
    const intervals = [ 0, 2, 2, 1, 2, 2, 2 ]

    // for A major, it would be:
    // [A, B, C#, D, E, F#, G#];
    // [ I, ii, iii, IV, V, vi, vii]
    // [ A, Bm, C#m, D, E, F#m, G#dim ]

    // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    // [4, 5, 6, 7, 8, 9, 0, 1, 2, 3]

    let logNotes = {}
    logNotes.tonic = tonic

    let indexOfTonic = chords.indexOf(tonic)
    logNotes.indexOfTonic = indexOfTonic

    const chordRootsInKey = () => {
      let resultsChords = []
      let chordIndex = indexOfTonic
      for (var i = 0; i < intervals.length; i++) {
        chordIndex += intervals[i]
        resultsChords.push(chords[chordIndex % chords.length])
      }
      return resultsChords;
    }

    const populateChordResults = (chordsForCurrentKey) => {
      var populatedResponse = []
      for ( var i = 0; i < chordsForCurrentKey.length; i++ ) {
        populatedResponse.push({ chord: chordsForCurrentKey[i], mode: modes[i], label: labels[i] })
      }
      return populatedResponse
    }

    let resultChords = chordRootsInKey();
    resultChords = populateChordResults(resultChords)
    console.log(logNotes)
    console.log(resultChords)
    return resultChords
  }


//   computeKeysFromChord = (chord) => {
//     if ( chord === null ) {
//       return false
//     }
//     const chordMap = [ 'a', 'a#', 'b', 'c', 'c#', 'd', 'd#', 'e', 'f', 'f#', 'g', 'g#' ]
// //      [ a ] [ a#] [ b ] [ c ] [ c#] [ d ] [ d#] [ e ] [ f ] [ f#] [ g ] [ g#]
// // [ a ]  1     0     2     0     2     1     0     1     0     2     0     3
// // [ a#]  3     1     0     2     0     2     1     0     1     0     2     0
// // [ b ]  0     3     1     0     2     0     2     1     0     1     0     2
// // [ c ]  2     0     3     1     0     2     0     2     1     0     1     0
// // [ c#]  0     2     0     3     1     0     2     0     2     1     0     1
// // [ d ]  1     0     2     0     3     1     0     2     0     2     1     0
// // [ d#]  0     1     0     2     0     3     1     0     2     0     2     1
// // [ e ]  1     0     1     0     2     0     3     1     0     2     0     2
// // [ f ]  2     1     0     1     0     2     0     3     1     0     2     0
// // [ f#]  0     2     1     0     1     0     2     0     3     1     0     2
// // [ g ]  2     0     2     1     0     1     0     2     0     3     1     0
// // [ g#]  0     2     0     2     1     0     1     0     2     0     3     1
//     const chordMatrix = [ [ 1, 0, 2, 0, 2, 1, 0, 1, 0, 2, 0, 3 ],
//                           [ 3, 1, 0, 2, 0, 2, 1, 0, 1, 0, 2, 0 ],
//                           [ 0, 3, 1, 0, 2, 0, 2, 1, 0, 1, 0, 2 ],
//                           [ 2, 0, 3, 1, 0, 2, 0, 2, 1, 0, 1, 0 ],
//                           [ 0, 2, 0, 3, 1, 0, 2, 0, 2, 1, 0, 1 ],
//                           [ 1, 0, 2, 0, 3, 1, 0, 2, 0, 2, 1, 0 ],
//                           [ 0, 1, 0, 2, 0, 3, 1, 0, 2, 0, 2, 1 ],
//                           [ 1, 0, 1, 0, 2, 0, 3, 1, 0, 2, 0, 2 ],
//                           [ 2, 1, 0, 1, 0, 2, 0, 3, 1, 0, 2, 0 ],
//                           [ 0, 2, 1, 0, 1, 0, 2, 0, 3, 1, 0, 2 ],
//                           [ 2, 0, 2, 1, 0, 1, 0, 2, 0, 3, 1, 0 ],
//                           [ 0, 2, 0, 2, 1, 0, 1, 0, 2, 0, 3, 1 ] ]
//
//     const traverseMatrixForChords = (chord) => {
//       let chordIndex = chordMap.indexOf(chord)
//       let majorChords = []
//       let minorChords = []
//
//       let chordsInKeyOf = chordMatrix[chordIndex]
//
//       let keysInWhichChordAppears = []
//       for ( var i = 0; i < chordMatrix.length; i++ ) {
//         keysInWhichChordAppears.push(chordMatrix[i][chordIndex])
//       }
//       return [ chordsInKeyOf, keysInWhichChordAppears ]
//     }
//
//     const mapMatrixResultToChords = (chords) => {
//       const modes = [null, 'major', 'minor', 'diminished']
//       var response = []
//
//       for ( var i = 0; i < chords.length; i++ ) {
//         for ( var j = 0; j < chords[i].length; j++ ) {
//           if ( chords[i][j] === 0 ) {
//             continue;
//           } else {
//             response.push({chord: chordMap[j], mode: modes[chords[i][j]]} )
//           }
//         }
//
//       }
//       return response
//     }
//
//     // this.setState({ chordsInKey: mapMatrixResultToChords(traverseMatrixForChords(chord)) })
//
//   }
//
//

  handleChordChange = (chord) => {
    let selectedChords = this.state.selectedChords
    let nextChords = selectedChords
    let chordIndex = this.state.allChords.indexOf(chord)
    if ( selectedChords[chordIndex] > 0 ) {
        nextChords[chordIndex] = 0
    } else {
        nextChords[chordIndex] = 1
    }
    this.setState({selectedChords: nextChords})
  }

  /*
    * suggestChords
      - loop matrix and...
    * calculateChordToKeyStrength
    *
  */

  suggestChords = () => {
    console.log('suggesting chords...')
    const chordMap = [ 'a', 'a#', 'b', 'c', 'c#', 'd', 'd#', 'e', 'f', 'f#', 'g', 'g#' ]
      //      [ a ] [ a#] [ b ] [ c ] [ c#] [ d ] [ d#] [ e ] [ f ] [ f#] [ g ] [ g#]
      // [ a ]  1     0     2     0     2     1     0     1     0     2     0     3
      // [ a#]  3     1     0     2     0     2     1     0     1     0     2     0
      // [ b ]  0     3     1     0     2     0     2     1     0     1     0     2
      // [ c ]  2     0     3     1     0     2     0     2     1     0     1     0
      // [ c#]  0     2     0     3     1     0     2     0     2     1     0     1
      // [ d ]  1     0     2     0     3     1     0     2     0     2     1     0
      // [ d#]  0     1     0     2     0     3     1     0     2     0     2     1
      // [ e ]  1     0     1     0     2     0     3     1     0     2     0     2
      // [ f ]  2     1     0     1     0     2     0     3     1     0     2     0
      // [ f#]  0     2     1     0     1     0     2     0     3     1     0     2
      // [ g ]  2     0     2     1     0     1     0     2     0     3     1     0
      // [ g#]  0     2     0     2     1     0     1     0     2     0     3     1

      // for convenience, consider x-axis to be keys and y-axis to be chords
      const chordMatrix = [ [ 1, 0, 2, 0, 2, 1, 0, 1, 0, 2, 0, 3 ],
                            [ 3, 1, 0, 2, 0, 2, 1, 0, 1, 0, 2, 0 ],
                            [ 0, 3, 1, 0, 2, 0, 2, 1, 0, 1, 0, 2 ],
                            [ 2, 0, 3, 1, 0, 2, 0, 2, 1, 0, 1, 0 ],
                            [ 0, 2, 0, 3, 1, 0, 2, 0, 2, 1, 0, 1 ],
                            [ 1, 0, 2, 0, 3, 1, 0, 2, 0, 2, 1, 0 ],
                            [ 0, 1, 0, 2, 0, 3, 1, 0, 2, 0, 2, 1 ],
                            [ 1, 0, 1, 0, 2, 0, 3, 1, 0, 2, 0, 2 ],
                            [ 2, 1, 0, 1, 0, 2, 0, 3, 1, 0, 2, 0 ],
                            [ 0, 2, 1, 0, 1, 0, 2, 0, 3, 1, 0, 2 ],
                            [ 2, 0, 2, 1, 0, 1, 0, 2, 0, 3, 1, 0 ],
                            [ 0, 2, 0, 2, 1, 0, 1, 0, 2, 0, 3, 1 ] ]

      const selectedChords = this.state.selectedChords

      const calculateChordToKeyScores = () => {
        let keys = [0,0,0,0,0,0,0,0,0,0,0,0]
        let keyScores = [0,0,0,0,0,0,0,0,0,0,0,0]

        for (let i = 0; i < selectedChords.length; i++) {
          keyScores[i] = compareChords(selectedChords, chordMatrix[i])
        }

        return keyScores
      }

      const compareChords = (key1, key2) => {
        let chordScores = [0,0,0,0,0,0,0,0,0,0,0,0]
        for (let i = 0; i < key1.length; i++) {
          // if the chord is selected
          if ( key1[i] === key2[i] ) {
            if ( key1[i] > 0 || key2[i] < 0 ) {
              chordScores[i] = 1
            } else {
              chordScores[i] = 0.3
            }

          }
        }
        return ( chordScores.reduce(function(a, b) { return a + b; }) / chordScores.length )
      }

      const getTopKeyFromScore = (keyScores) => {
        let maxScore =  keyScores.reduce(function(a, b) {
                          return Math.max(a, b);
                        })
        let maxKeyIndex = keyScores.indexOf(maxScore)
        let key = chordMap[maxKeyIndex]
        return
      }


      const chordsInKey = () => {
        let keys = [0,0,0,0,0,0,0,0,0,0,0,0]
        for (let i = 0; i < selectedChords.length; i++) {
          // if the chord is selected
          if ( selectedChords[i] > 0 ) {
            // then iterate through the chordMatrix...
            for (let j = 0; j < selectedChords.length; j++) {
              // when we find
              if (selectedChords[i] === chordMatrix[j][i]) {
                keys[j] = 1
              }
            }
          }
        }
        return keys
      }


      {/*
        chords in key of a : [1, 0, 2, 0, 2, 1, 0, 1, 0, 2, 0, 3]
        keys in which a app: [1, 3, 0, 2, 0, 1, 0, 1, 2, 0, 2, 0]

        chords in key of b : [0, 3, 1, 0, 2, 0, 2, 1, 0, 1, 0, 2]
        keys in which b app: [2, 0, 1, 3, 0, 2, 0, 1, 0, 1, 2, 0]
      */}

      console.log(calculateChordToKeyScores())
      let keyScores = calculateChordToKeyScores()
      getTopKeyFromScore(keyScores)

  }


  render() {
    const chordDisplay = this.state.allChords.map((chord, index) => {
      return(
        <Col xs={6} sm={4} md={3} key={chord} >
          <Chord className='chord' tonic={chord} active={false} handleChordChange={this.handleChordChange} mode='major'/>
        </Col>
      )
    })

    return (
      <div className="chord-grid">
        <Grid>
          <Row>
            {chordDisplay}
          </Row>
        </Grid>
      </div>
    );
  }
}

export default ChordGrid;
