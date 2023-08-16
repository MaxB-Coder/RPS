import Player from './player.js';

class Battle {
  setup(names, playerClass = Player) {
    this.players = names.map(name => new playerClass(name));
  }

  currentPlayer() {
    return this.players[0];
  }

  otherPlayer() {
    return this.players[1];
  }

  switch() {
    this.players.reverse();
  }

  turn(P1Weapon, P2Weapon) {

    if (P1Weapon === P2Weapon) {
      return "Draw";
    }

    if (this.WinCheckerP1(P1Weapon, P2Weapon)) {
      return "P1 Win";
    }
    
    this.currentPlayer().addScore(1);
    return "P2 Win"
  }

  // Could have used a better method to compare weapons, couldn't figure out how to implement it. Possibly, through and array/enum to stores number values for each weapon and use these values to compare. 
  
  WinCheckerP1(P1Weapon, P2Weapon) {
    if (((P1Weapon === 'rock') && (P2Weapon === 'scissors')) || ((P1Weapon === 'paper') && (P2Weapon === 'rock')) || ((P1Weapon === 'scissors') && (P2Weapon === 'paper')) || ((P1Weapon === 'rock') && (P2Weapon === 'lizard')) || ((P1Weapon === 'scissors') && (P2Weapon === 'lizard')) || ((P1Weapon === 'lizard') && (P2Weapon === 'paper')) || ((P1Weapon === 'lizard') && (P2Weapon === 'spock')) || ((P1Weapon === 'paper') && (P2Weapon === 'spock')) || ((P1Weapon === 'spock') && (P2Weapon === 'rock')) || ((P1Weapon === 'spock') && (P2Weapon === 'scissors'))) {
      this.otherPlayer().addScore(1);
      return true;
    }
    return false;
  }
}


export default Battle;