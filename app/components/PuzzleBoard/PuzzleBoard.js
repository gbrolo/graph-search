import React, { Component } from 'react';
import { Button, Fade, Row, Col, Input } from 'reactstrap';

import { setInitialState } from '../../GraphSearch/SearchHelpers';
import { cellValuesToPlainArray, setPuzzleGoalStates } from '../../GraphSearch/OperationHelpers';

import './puzzle_board.css';
import Problem from '../../GraphSearch/Problem';

const colStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center'    
}

const boardCol = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center'        
}

const cell = {
    padding: 0, 
    margin: 0, 
    justifyContent: 'center', 
    alignContent: 'center', 
    alignItems: 'center', 
    display: 'flex', 
    width: '100%', 
    height: '100%'
}

class PuzzleBoard extends Component {
  constructor(props) {
    super(props);    

    this.state = {
        input: 'F21C856B49A73ED.',
        cellValues: [
            ['15', '2', '1', '12'],
            ['8', '5', '6', '11'],
            ['4', '9', '10', '7'],
            ['3', '14', '13', '.']
        ]
    }
  }

  solvePuzzle(cellValues) {      
      let initialState = setInitialState(cellValuesToPlainArray(cellValues));
      let problem = new Problem(initialState, setPuzzleGoalStates(), 'PUZZLE');      
      console.log(problem.getInitialState().getState());
      console.log(problem.actions(problem.getInitialState()));

  }

  parseString() {
      let array = this.state.input.split('');      
      let cellValues = [];

      for (var i = 0; i < 4; i ++) {
          let row = [];
          for (var j = 0; j < 4; j++) {
              let rawValue = array.shift();
              let value = rawValue === 'A' ? '10' :
                            rawValue === 'B' ? '11' :
                            rawValue === 'C' ? '12' :
                            rawValue === 'D' ? '13' :
                            rawValue === 'E' ? '14' :
                            rawValue === 'F' ? '15' : rawValue;
              row.push(value);
          }
          cellValues.push(row);
      }  
      
      this.solvePuzzle(cellValues);

      this.setState({ cellValues });
  }

  render() {      
    return (
      <Fade in={true} timeout={600} style={{ width: '100%', height: '50%' }}>
        <div className="puzzle-wrapper">
            <Row style={{
                width: '50%',
                marginTop: 20
            }}> 
                <Col xs={12} sm={12} md={6} lg={6} style={colStyle}>
                    <Input 
                        className="abel-font text-uppercase" 
                        type="text" 
                        name="input" 
                        id="input" 
                        placeholder="Enter string to test"
                        defaultValue="F21C856B49A73ED."
                        onChange={(event) => this.setState({ input: event.target.value })} />
                </Col>
                <Col xs={12} sm={12} md={3} lg={3} style={colStyle}>
                    <Button className="txt-uppercase abel-font" outline onClick={() => this.parseString()}>Apply string</Button>
                </Col>
                <Col xs={12} sm={12} md={3} lg={3} style={colStyle}>
                    <Button className="txt-uppercase abel-font" outline>Solve</Button>
                </Col>
            </Row>
            <Row style={{
                width: '50%',
                height: '100%',
                marginTop: 20
            }}>
                <Col xs={12} sm={12} md={6} lg={6} style={boardCol}>
                    <div className="board">
                        {
                            this.state.cellValues.map((row, index) => {                                
                                return(
                                    <Row key={index} style={{ width: '100%', height: 75 }}>
                                        <Col xs={3} sm={3} md={3} lg={3} style={cell}>
                                            <div className={row[0] === '.' ? 'puzzle-cell-empty' : "puzzle-cell"}>
                                                {row[0] === '.' ? '' : row[0]}
                                            </div>
                                        </Col>
                                        <Col xs={3} sm={3} md={3} lg={3} style={cell}>
                                            <div className={row[1] === '.' ? 'puzzle-cell-empty' : "puzzle-cell"}>
                                                {row[1] === '.' ? '' : row[1]}
                                            </div>
                                        </Col>
                                        <Col xs={3} sm={3} md={3} lg={3} style={cell}>
                                            <div className={row[2] === '.' ? 'puzzle-cell-empty' : "puzzle-cell"}>
                                                {row[2] === '.' ? '' : row[2]}
                                            </div>
                                        </Col>
                                        <Col xs={3} sm={3} md={3} lg={3} style={cell}>
                                            <div className={row[3] === '.' ? 'puzzle-cell-empty' : "puzzle-cell"}>
                                                {row[3] === '.' ? '' : row[3]}
                                            </div>
                                        </Col>
                                    </Row>
                                )
                            })
                        }                        
                    </div>
                </Col>
                <Col xs={12} sm={12} md={6} lg={6} style={colStyle}>
                    Output
                </Col>
            </Row>
        </div>
      </Fade>
    );
  }
}

export default PuzzleBoard;
