import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grid, Row, Col } from 'react-bootstrap'
import { addChord, removeChord } from '../Actions'
import Chord from '../Components/Chord.js'

class ChordGrid extends Component {
  constructor(props) {
    super(props)
    // this.state = {
    //   chords: [ 'a', 'a#', 'b', 'c', 'c#', 'd', 'd#', 'e', 'f', 'f#', 'g', 'g#' ],
    //   tonic: null,
    //   chordsInKey: []
    // }
    // this.props.store.subscribe(this.handleChordChange)
    // console.log(this.props)
  }

  computeIntervalsFromRoot(tonic) {
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
    // console.log(logNotes)
    // console.log(resultChords)
    return resultChords
  }


  computeKeysFromChord = (chord) => {
    if ( chord === null ) {
      return false
    }
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

    const traverseMatrixForChords = (chord) => {
      let chordIndex = chordMap.indexOf(chord)
      let majorChords = []
      let minorChords = []

      let chordsInKeyOf = chordMatrix[chordIndex]

      let keysInWhichChordAppears = []
      for ( var i = 0; i < chordMatrix.length; i++ ) {
        keysInWhichChordAppears.push(chordMatrix[i][chordIndex])
      }
      return [ chordsInKeyOf, keysInWhichChordAppears ]
    }

    const mapMatrixResultToChords = (chords) => {
      const modes = [null, 'major', 'minor', 'diminished']
      var response = []

      for ( var i = 0; i < chords.length; i++ ) {
        for ( var j = 0; j < chords[i].length; j++ ) {
          if ( chords[i][j] === 0 ) {
            continue;
          } else {
            response.push({chord: chordMap[j], mode: modes[chords[i][j]]} )
          }
        }

      }
      return response
    }

    // this.setState({ chordsInKey: mapMatrixResultToChords(traverseMatrixForChords(chord)) })

  }


  handleChordChange = (chord) => {
    let selectedChords = this.props.store.getState().selectedChords
    if ( selectedChords.indexOf(chord) > -1 ) {
        console.log('removing chord')
        this.props.dispatch(removeChord(chord))
    } else {
        console.log('adding chord')
        this.props.dispatch(addChord(chord))
    }
    console.log(this.props.store.getState().selectedChords)
  }


  mapStateToProps = (state) => {
    return {
      selectedChords: state.selectedChords
    }
  }

  mapDispatchToProps = () => {
    return {
      addChord: addChord
    }
  }


  render() {

    this.findMode = (chord) => {
      let mChords = []
      let chordsInKey = this.state.chordsInKey
      chordsInKey.map((chord) => {
        if (chord.mode === 'minor') {
          mChords.push(chord.chord)
        }
      })
      if ( mChords.indexOf(chord) != -1 ) {
        return 'minor'
      } else {
        return 'major'
      }
    }

    let tempHardCodedChords = [ 'a', 'a#', 'b', 'c', 'c#', 'd', 'd#', 'e', 'f', 'f#', 'g', 'g#' ]
    const chordDisplay = tempHardCodedChords.map((chord, index) => {
      // let active =
      return(
        <Col xs={6} sm={4} md={3}>
          {/* <Chord className='chord' tonic={chord} active={this.activateChord(chord)} key={index} mode={this.findMode(chord)} handleChordChange={this.handleChordChange}/> */}
          <Chord className='chord' tonic={chord} key={index} handleChordChange={this.handleChordChange}/>
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

ChordGrid = connect(this.mapStateToProps)(ChordGrid)

export default ChordGrid;
