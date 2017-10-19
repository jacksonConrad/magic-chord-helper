import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import Chord from '../Components/Chord.js'

class ChordGrid extends Component {
  render() {
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
