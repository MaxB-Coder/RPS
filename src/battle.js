import Player from './player.js';

class Battle {
  constructor() {
    this.players = [];
    this.current = 0;
    this.turnNumber = 0;
  }

  setup(names) {
    this.players = names.map(name => ({ name, score: 0 }));
    this.current = 0;
    this.turnNumber = 1;
  }

  currentPlayer() {
    return this.players[this.current];
  }

  nextPlayer() {
    this.current = (this.current + 1) % this.players.length;
    this.turnNumber++;
  }

  // Serialize the game state to a JSON string
  serialize() {
    return JSON.stringify({
      players: this.players,
      current: this.current,
      turnNumber: this.turnNumber
    });
  }

  // Deserialize a JSON string to restore the game state
  static deserialize(json) {
    const obj = typeof json === "string" ? JSON.parse(json) : json;
    const battle = new Battle();
    battle.players = obj.players;
    battle.current = obj.current;
    battle.turnNumber = obj.turnNumber;
    return battle;
  }

  switch() {
    this.players.reverse();
  }

  play(move) {
    if (currentPlayer.score >= 5) {
        res.render('p2Win', {
        currentPlayer: currentPlayer,
        otherPlayer: otherPlayer,
        weaponP1: P1Weapon,
        weaponP2: P2Weapon
        });
    }

    if (otherPlayer.score >= 5) {
        res.render('p1Win', {
        currentPlayer: currentPlayer,
        otherPlayer: otherPlayer,
        weaponP1: P1Weapon,
        weaponP2: P2Weapon
        });
    }

    if (result === "P1 Win") {
        res.render('turnP1Win', {
        currentPlayer: currentPlayer,
        otherPlayer: otherPlayer,
        weaponP1: P1Weapon,
        weaponP2: P2Weapon
        });
    }

    if (result === "P2 Win") {
        res.render('turnP2Win', {
        currentPlayer: currentPlayer,
        otherPlayer: otherPlayer,
        weaponP1: P1Weapon,
        weaponP2: P2Weapon
        });
    } 

    if (result === "Draw") {
        res.render('draw', {
        currentPlayer: currentPlayer,
        otherPlayer: otherPlayer,
        weaponP1: P1Weapon,
        weaponP2: P2Weapon
        });
    } 
  }

  checkWin() {
    return this.players.find(p => p.score >= 3) || null;
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