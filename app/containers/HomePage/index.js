import React from 'react';
import { Button, Row, Col, Fade } from 'reactstrap';
import './home_page.css';

import SudokuBoard from '../../components/SudokuBoard/SudokuBoard';
import PuzzleBoard from '../../components/PuzzleBoard/PuzzleBoard';

/* eslint-disable react/prefer-stateless-function */
export default class HomePage extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  render() {
    return (
      <Fade in={true} timeout={600}>
        <div className="wrapper">
          <SudokuBoard />
          <PuzzleBoard />
        </div>
      </Fade>
    );
  }
}
