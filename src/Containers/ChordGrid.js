import React, { Component } from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
// import { addChord, removeChord } from '../Actions'
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
    return resultChords
  }

  handleChordChange = (chord, value) => {
    let nextChords = this.state.selectedChords
    let chordIndex = this.state.allChords.indexOf(chord)
    nextChords[chordIndex] = value
    this.setState({selectedChords: nextChords})
  }


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
        let chordResults = [[], [], [], [], [], [], [], [], [], [], []]

        for (let i = 0; i < selectedChords.length; i++) {
          if (compareChords(selectedChords, chordMatrix[i])) {
            keyScores[i] = chordMatrix[i]
          }
        }
        return keyScores
      }

      const compareChords = (key1, key2) => {
        let chordScores = [0,0,0,0,0,0,0,0,0,0,0,0]
        let chordResults = [[], [], [], [], [], [], [], [], [], [], []]
        let potentialKey = false
        for (let i = 0; i < key1.length; i++) {
          // if the chord is selected
          if ( key1[i] > 0 && key1[i] === key2[i] ) {
            potentialKey = true
          } else if (key1[i] > 0 && key2[i] === 0) {
            // comparing against 0 to allow for maj/minor inversions
            potentialKey = false
            break
          }
        }
        return potentialKey
      }

      const mergeKeyScores = (keyScores) => {
        let chordResults = [[], [], [], [], [], [], [], [], [], [], [], []]
        for (let i = 0; i < keyScores.length; i++) {
          if (keyScores[i].length) {
            for (let j = 0; j < keyScores[i].length; j++) {
              chordResults[j] = chordResults[j].concat(keyScores[i][j])
            }
          }
        }
        return chordResults
      }

      const reduceChordResults = (chordResults) => {
        let chordSuggestions = [[], [], [], [], [], [], [], [], [], [], [], []]
        for (let i = 0; i < chordResults.length; i++) {
          console.log(chordResults[i])
        }
      }

      {/*
        chords in key of a : [1, 0, 2, 0, 2, 1, 0, 1, 0, 2, 0, 3]
        keys in which a app: [1, 3, 0, 2, 0, 1, 0, 1, 2, 0, 2, 0]

        chords in key of b : [0, 3, 1, 0, 2, 0, 2, 1, 0, 1, 0, 2]
        keys in which b app: [2, 0, 1, 3, 0, 2, 0, 1, 0, 1, 2, 0]
      */}

      // console.log(calculateChordToKeyScores())
      let keyScores = calculateChordToKeyScores()
      let chordResults = mergeKeyScores(keyScores)
      let suggestions = reduceChordResults(chordResults)
  }


  render() {
    // console.log(this.state.selectedChords)
    const chordDisplay = this.state.allChords.map((chord, index) => {
      return(
        <Col xs={6} sm={4} md={3} key={chord} >
          <Chord
            className='chord'
            tonic={chord}
            handleChordChange={this.handleChordChange}
            value={this.state.selectedChords[index]}
          />
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
