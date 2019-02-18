import React, { Component } from 'react';
import { Button, Fade, Row, Col, Input } from 'reactstrap';

import './sudoku.css';
import { cellValuesToPlainArray, finalNodeToStateArray } from '../../GraphSearch/OperationHelpers';
import { setSudokuInitialState, aStar, isSudokuSolvable } from '../../GraphSearch/SearchHelpers';

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

const inputRe = /^[1-4\\.]+$/;

class SudokuBoard extends Component {
  constructor(props) {
    super(props);    

    this.state = {
        input: null,
        cellValues: [['.', '.', '.', '.'], ['.', '.', '.', '.'], ['.', '.', '.', '.'], ['.', '.', '.', '.']]
    }
  }

  solveSudoku(cellValues) {
    let plain = cellValuesToPlainArray(cellValues);
    
    let initialState = setSudokuInitialState(plain);

    if (isSudokuSolvable(initialState.getState())) {
        // console.log(initialState);
        let problem = new Problem(initialState, null, 'SUDOKU'); 
        // console.log(problem.goalTest(initialState));
        // console.log(problem.actions(initialState));
        // console.log(problem.result(initialState, problem.actions(initialState)[0]));
    
        let result = aStar(problem);
        console.log(result);
    
        let stateArray = finalNodeToStateArray(result.node);
        // stateArray = stateArray.filter(item => item != '*');
        
        this.animateBoard(stateArray);
    
        this.setState({ cellValues })
    } else alert('Sudoku is not solvable.')
  }

  animateBoard(stateArray) {
    //   let { stateArray } = this.state;
      stateArray = stateArray.reverse();

      this.stateArray = setInterval(() => {
        if (stateArray.length === 0) {
            clearInterval(this.stateArray);
        } else {
            this.setState({
                cellValues: stateArray.shift()
            })
        }
      }, 600);

    //   stateArray.forEach(configuration => {
    //       let apply = () => this.setState({ cellValues: configuration });
    //       console.log(configuration);
          
    //       setTimeout(() => apply(), 1000);
    //   })
  }

  parseString() {
    if (inputRe.test(this.state.input)) {
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
    } else alert('Invalid input')

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
                <Col xs={12} sm={12} md={6} lg={6} style={colStyle}>
                    <Button className="txt-uppercase abel-font" outline onClick={() => this.parseString()}>Solve Sudoku</Button>
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
