import React, { Component } from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
// import { addChord, removeChord } from '../Actions'
import Chord from '../Components/Chord.js'

class ChordGrid extends Component {
  constructor(props) {
    super(props)
    this.state = {
      allChords: [ 'a', 'a#', 'b', 'c', 'c#', 'd', 'd#', 'e', 'f', 'f#', 'g', 'g#' ],
      displayChords: ['A', 'B\u266D', 'B', 'C', 'C\u266F', 'D', 'E\u266D', 'E', 'F', 'F\u266F', 'G', 'G\u266F'],
      selectedChords: [0,0,0,0,0,0,0,0,0,0,0,0],
      suggestedChords: [0,0,0,0,0,0,0,0,0,0,0,0]
    }
  }

  handleChordChange = (chord, value) => {
    let nextChords = this.state.selectedChords
    let chordIndex = this.state.allChords.indexOf(chord)
    nextChords[chordIndex] = value
    this.setState({selectedChords: nextChords, suggestedChords: this.suggestChords()})
  }


  suggestChords = () => {
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
        let keyScores = [0,0,0,0,0,0,0,0,0,0,0,0]

        for (let i = 0; i < selectedChords.length; i++) {
          if (compareChords(selectedChords, chordMatrix[i])) {
            keyScores[i] = chordMatrix[i]
          }
        }
        return keyScores
      }

      const compareChords = (key1, key2) => {
        let potentialKey = false
        for (let i = 0; i < key1.length; i++) {
          // if the chord is selected
          if ( key1[i] > 0 && key1[i] === key2[i] ) {
            potentialKey = true
          } else if (key1[i] > 0 && key2[i] !== key1[i]) {
          // } else if (key1[i] > 0 && key2[i] === 0) {
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
          chordSuggestions[i] = calculateSuggestionStrength(chordResults[i])
        }
        return chordSuggestions
      }

      const calculateSuggestionStrength = (chordResults) => {
        var frequency = {};  // array of frequency.
        var maxFreq = 0;  // holds the max frequency.
        let mode

        for (var i in chordResults) {
            frequency[chordResults[i]] = (frequency[chordResults[i]] || 0) + 1; // increment frequency.
            if (frequency[chordResults[i]] > maxFreq) { // is this frequency > max so far ?
                maxFreq = frequency[chordResults[i]];  // update max.
                mode = chordResults[i];          // update result.
            }
        }
        return mode
      }

      let keyScores = calculateChordToKeyScores()
      let chordResults = mergeKeyScores(keyScores)
      let suggestions = reduceChordResults(chordResults)
      return suggestions
  }


  render() {
    const chordDisplay = this.state.allChords.map((chord, index) => {
      return(
        <Col xs={6} sm={4} md={3} key={chord} >
          <Chord
            className='chord'
            tonic={chord}
            displayChord={this.state.displayChords[index]}
            handleChordChange={this.handleChordChange}
            value={this.state.selectedChords[index]}
            suggestion={this.state.suggestedChords[index]}
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
