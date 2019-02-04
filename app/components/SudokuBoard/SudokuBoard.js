import React, { Component } from 'react';
import { Button, Fade } from 'reactstrap';

import './sudoku.css';

class SudokuBoard extends Component {
  constructor(props) {
    super(props);    

    this.state = {
    }
  }

  render() {
    return (
      <Fade in={true} timeout={600}>
        <div className="sudoku-wrapper">
          Sudoku
        </div>
      </Fade>
    );
  }
}

export default SudokuBoard;
