import React, { Component } from 'react';
import { Button, Fade, Row, Col, Input } from 'reactstrap';

import './sudoku.css';
import { cellValuesToPlainArray } from '../../GraphSearch/OperationHelpers';
import { setInitialState, setSudokuInitialState } from '../../GraphSearch/SearchHelpers';

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

class SudokuBoard extends Component {
  constructor(props) {
    super(props);    

    this.state = {
        input: null,
        cellValues: [
            ['.', '4', '.', '1'],
            ['3', '.', '4', '.'],
            ['1', '.', '.', '4'],
            ['.', '2', '1', '.']
        ]
    }
  }

  solveSudoku(cellValues) {
    let plain = cellValuesToPlainArray(cellValues);
    
    let initialState = setSudokuInitialState(plain);
    console.log(initialState);
    let problem = new Problem(initialState, null, 'SUDOKU'); 
    console.log(problem.goalTest(initialState));

    this.setState({ cellValues })
  }

  parseString() {
      let array = this.state.input.split('');
      let cellValues = [];

      for (var i = 0; i < 4; i ++) {
          let row = [];
          for (var j = 0; j < 4; j++) {
              row.push(array.shift());
          }
          cellValues.push(row);
      }      

      this.solveSudoku(cellValues);
  }

  render() {      
    return (
      <Fade in={true} timeout={600} style={{ width: '100%', height: '50%' }}>
        <div className="sudoku-wrapper">
            <Row style={{
                width: '50%',
                marginTop: 20,
                paddingBottom: 20
            }}> 
                <Col xs={12} sm={12} md={6} lg={6} style={colStyle}>
                    <Input 
                        className="abel-font text-uppercase" 
                        type="text" 
                        name="input" 
                        id="input" 
                        placeholder="Enter string to test"
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
                                            <div className="sudoku-cell">
                                                {row[0] === '.' ? '' : row[0]}
                                            </div>
                                        </Col>
                                        <Col xs={3} sm={3} md={3} lg={3} style={cell}>
                                            <div className="sudoku-cell">
                                                {row[1] === '.' ? '' : row[1]}
                                            </div>
                                        </Col>
                                        <Col xs={3} sm={3} md={3} lg={3} style={cell}>
                                            <div className="sudoku-cell">
                                                {row[2] === '.' ? '' : row[2]}
                                            </div>
                                        </Col>
                                        <Col xs={3} sm={3} md={3} lg={3} style={cell}>
                                            <div className="sudoku-cell">
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
                </Col>
            </Row>
        </div>
      </Fade>
    );
  }
}

export default SudokuBoard;
