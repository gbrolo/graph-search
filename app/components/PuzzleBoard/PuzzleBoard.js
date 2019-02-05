import React, { Component } from 'react';
import { Button, Fade, Row, Col, Input } from 'reactstrap';

import './puzzle_board.css';

const colStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  alignContent: 'center'    
}

class SudokuBoard extends Component {
  constructor(props) {
    super(props);    

    this.state = {
    }
  }

  render() {
    return (
      <Fade in={true} timeout={600} style={{ width: '100%', height: '50%' }}>
        <div className="puzzle-wrapper">
          <Row style={{
              width: '50%',
              marginTop: 20
          }}> 
              <Col xs={6} sm={6} md={6} lg={6} style={colStyle}>
                  <Input className="abel-font text-uppercase" type="text" name="input" id="input" placeholder="Enter string to test" />
              </Col>
              <Col xs={6} sm={6} md={6} lg={6} style={colStyle}>
                  <Button className="txt-uppercase abel-font" outline>Test string</Button>
              </Col>
          </Row>
          <Row style={{
              width: '100%',
              height: '100%'
          }}>
              <Col xs={6} sm={6} md={6} lg={6} style={colStyle}>
                  Board
              </Col>
              <Col xs={6} sm={6} md={6} lg={6} style={colStyle}>
                  Output
              </Col>
          </Row>
        </div>
      </Fade>
    );
  }
}

export default SudokuBoard;
