import React, { Component } from 'react';
import { Button, Fade } from 'reactstrap';

import './puzzle_board.css';

class SudokuBoard extends Component {
  constructor(props) {
    super(props);    

    this.state = {
    }
  }

  render() {
    return (
      <Fade in={true} timeout={600}>
        <div className="puzzle-wrapper">
          15-puzzle
        </div>
      </Fade>
    );
  }
}

export default SudokuBoard;
