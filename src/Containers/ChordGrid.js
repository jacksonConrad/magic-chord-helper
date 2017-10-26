import React, { Component } from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import Chord from '../Components/Chord.js'

class ChordGrid extends Component {

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

    let indexOfTonic = chords.indexOf(tonic)

    const chordRootsInKey = () => {
      let resultsChords = []
      let chordIndex = 0
      for (var i = 0; i < intervals.length; i++) {
        chordIndex += intervals[i]
        resultsChords.push(chords[chordIndex])
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
    console.log(resultChords)
  }



  render() {
    this.computeIntervalsFromRoot()

    let chords2 = [ 'a', 'a#', 'b', 'c', 'c#', 'd', 'd#', 'e', 'f', 'f#', 'g', 'g#' ]
    for ( var i = 0; i < chords2.length; i++ ) {
      this.computeIntervalsFromRoot(chords2[i])
    }

    return (
      <div className="chord-grid">
        <Grid>
          <Row>
            <Col xs={6} sm={4} md={3}>
              <Chord className="chord" tonic="A"/>
            </Col>
            <Col xs={6} sm={4} md={3}>
              <Chord className="chord" tonic="Bb"/>
            </Col>
            <Col xs={6} sm={4} md={3}>
              <Chord className="chord" tonic="B"/>
            </Col>
            <Col xs={6} sm={4} md={3}>
              <Chord className="chord" tonic="C"/>
            </Col>
            <Col xs={6} sm={4} md={3}>
              <Chord className="chord" tonic="C#"/>
            </Col>
            <Col xs={6} sm={4} md={3}>
              <Chord className="chord" tonic="D"/>
            </Col>
            <Col xs={6} sm={4} md={3}>
              <Chord className="chord" tonic="Eb"/>
            </Col>
            <Col xs={6} sm={4} md={3}>
              <Chord className="chord" tonic="E"/>
            </Col>
            <Col xs={6} sm={4} md={3}>
              <Chord className="chord" tonic="F"/>
            </Col>
            <Col xs={6} sm={4} md={3}>
              <Chord className="chord" tonic="F#"/>
            </Col>
            <Col xs={6} sm={4} md={3}>
              <Chord className="chord" tonic="G"/>
            </Col>
            <Col xs={6} sm={4} md={3}>
              <Chord className="chord" tonic="Ab"/>
            </Col>
          </Row>

          {/* <Row className="show-grid">
            <Col xs={12} md={8}><code>&lt;{'Col xs={12} md={8}'} /&gt;</code></Col>
            <Col xs={6} md={4}><code>&lt;{'Col xs={6} md={4}'} /&gt;</code></Col>
          </Row>

          <Row className="show-grid">
            <Col xs={6} md={4}><code>&lt;{'Col xs={6} md={4}'} /&gt;</code></Col>
            <Col xs={6} md={4}><code>&lt;{'Col xs={6} md={4}'} /&gt;</code></Col>
            <Col xsHidden md={4}><code>&lt;{'Col xsHidden md={4}'} /&gt;</code></Col>
          </Row>

          <Row className="show-grid">
            <Col xs={6} xsOffset={6}><code>&lt;{'Col xs={6} xsOffset={6}'} /&gt;</code></Col>
          </Row>

          <Row className="show-grid">
            <Col md={6} mdPush={6}><code>&lt;{'Col md={6} mdPush={6}'} /&gt;</code></Col>
            <Col md={6} mdPull={6}><code>&lt;{'Col md={6} mdPull={6}'} /&gt;</code></Col>
          </Row> */}
        </Grid>
      </div>
    );
  }
}

export default ChordGrid;
