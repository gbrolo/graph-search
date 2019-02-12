import React, { Component } from 'react';
import { Button, Fade, Row, Col, Input } from 'reactstrap';

import { setInitialState, aStar } from '../../GraphSearch/SearchHelpers';
import { cellValuesToPlainArray, setPuzzleGoalStates, determinePuzzleSolvability, finalNodeToStateArray } from '../../GraphSearch/OperationHelpers';

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
        input: '',
        cellValues: [
            ['1', '2', '3', '4'],
            ['5', '6', '7', '8'],
            ['9', '10', '11', '12'],
            ['13', '14', '15', '.']
        ],        
        stateArray: []
    }
  }

  solvePuzzle(cellValues) {     
      let plain = cellValuesToPlainArray(cellValues);
    //   console.log(plain);

      if (determinePuzzleSolvability(plain)) {
          let initialState = setInitialState(cellValuesToPlainArray(cellValues));
          //console.log('initialState', initialState);
          let problem = new Problem(initialState, setPuzzleGoalStates(), 'PUZZLE');            
          //console.log(problem.getInitialState().getState());
          let result = aStar(problem);
          console.log(result);

          let stateArray = finalNodeToStateArray(result.node);
        //   console.log(stateArray);
          this.animateBoard(stateArray);
        //   this.setState({ stateArray, cellValues })
        //   console.log(problem.actions(problem.getInitialState()));
        //   console.log(problem.result(problem.getInitialState(), 'UP'));      
      } else {
          alert('Puzzle unsolvable!');
      }

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
                        onChange={(event) => this.setState({ input: event.target.value })} />
                </Col>
                <Col xs={12} sm={12} md={6} lg={6} style={colStyle}>
                    <Button className="txt-uppercase abel-font" outline onClick={() => this.parseString()}>Solve Puzzle</Button>
                </Col>
            </Row>
            <Row style={{
                width: '50%',
                height: '100%',
                marginTop: 20,
                paddingBottom: 20
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

                </Col>
            </Row>
        </div>
      </Fade>
    );
  }
}

export default PuzzleBoard;
