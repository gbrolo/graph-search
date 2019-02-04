import React, { Component } from 'react';
import { Button, Fade } from 'reactstrap';
import Slot from 'react-slot-machine';
import '../HomePage/slot.css';

import { GABY_CONTESTANTS } from '../../lists/gaby';

class Gaby extends Component {
  constructor(props) {
    super(props);

    let contestants = GABY_CONTESTANTS;

    this.state = {
      contestants,
      target: this.getTarget(),
      times: 10,
      duration: 8000,
      turn: false,
      currentWinner: '',

      fadeSlot: false,
      foundWinner: false
    }
  }

  getTarget() {
    let contestants = GABY_CONTESTANTS;
    return Math.floor(Math.random() * (contestants.length - 2)) + 1;
  }

  getContestants() {
    let contestants = [];
    for (var i = 0; i < 2000; i++) {
      contestants.push('Participante ' + (i+1));
    }

    return contestants;
  }

  refreshAndStart() {
    let target = this.getTarget();
    this.setState({ target, turn: !this.state.turn, fadeSlot: !this.state.fadeSlot, foundWinner: false });
  }

  refreshWinner() {
    let currentWinner = GABY_CONTESTANTS[this.state.target];
    this.setState({ currentWinner, foundWinner: true });
  }

  render() {
    return (
      <Fade in={true} timeout={600}>
        <div className="slot-wrapper">
          <div onClick={() => this.props.history.push("/")} className="logo-wrapper">
              <div className="header-text-top header-text-rotate">LuckyCharm</div>
          </div> 
          <Button className="w-40 slot-btn abel-font txt-uppercase" onClick={() => this.refreshAndStart()} color="secondary" outline>{!this.state.turn ? 'Empezar' : 'Reiniciar'}</Button>        
          <Fade in={this.state.fadeSlot} timeout={600} className="centered-div">
            <Slot 
              className="slot abel-font"
              target={this.state.turn ? this.state.target : 0} 
              times={this.state.times} 
              duration={this.state.duration}
              onEnd={() => this.refreshWinner()}
            >
              {
                this.state.contestants.map((contestant, key) => 
                  <div key={key} style={{ width: '100%', height: '100%' }}>
                    {contestant.split('\n')[0]}
                  </div>
                )
              }
            </Slot>
            {
              !this.state.foundWinner &&
              <div className="current-winner abel-font">
                  Suerte a todos!
              </div>
            }
            {
              this.state.foundWinner &&
              <div className="current-winner abel-font">
                  <p className="abel-font">Felicidades: <strong>{this.state.currentWinner.split('\n')[0]}</strong> !</p>
                  <p className="abel-font text-align-center">{this.state.currentWinner.split('\n')[1]}</p>
              </div>
            }            
          </Fade>
        </div>
      </Fade>
    );
  }
}

export default Gaby;
