import Player from './player.js';

class Battle {
  constructor() {
    this.players = [];
    this.current = 0;
    this.turnNumber = 1;
    this.moves = {}; // store moves temporarily per turn
  }

  // Initialize players
  setup(names) {
    this.players = names.map(name => new Player(name));
    this.current = 0;
    this.turnNumber = 1;
    this.moves = {};
  }

  // Get current player object
  currentPlayer() {
    return this.players[this.current];
  }

  // Get other player object
  otherPlayer() {
    return this.players[(this.current + 1) % this.players.length];
  }

  // Advance to next player
  nextPlayer() {
    this.current = (this.current + 1) % this.players.length;
    if (this.current === 0) this.turnNumber++;
  }

  // Store a move; if both players have played, calculate turn result
  play(move) {
  const currentPlayer = this.currentPlayer();

  // Store the move for this player
  this.moves[currentPlayer.name] = move;

  // Only calculate result if both players have chosen
  if(Object.keys(this.moves).length < 2) {
    this.nextPlayer(); // switch to the other player
    return null; // turn result not ready yet
  }

  // Both players have chosen → calculate winner
  const [p1, p2] = this.players;
  const P1Weapon = this.moves[p1.name];
  const P2Weapon = this.moves[p2.name];

  // Store weapons for EJS
  p1.weapon = P1Weapon;
  p2.weapon = P2Weapon;

  // Determine winner
  let result;
  if(P1Weapon === P2Weapon) result = "Draw";
  else if(this.WinCheckerP1(P1Weapon, P2Weapon)) result = "P1 Win";
  else result = "P2 Win";

  // Update scores
  if(result === "P1 Win") p1.addScore(1);
  if(result === "P2 Win") p2.addScore(1);

  // Clear moves for next turn
  this.moves = {};
  this.nextPlayer(); // next turn starts

  return result;
  }

  // Determine the winner of a turn and update scores
  turn(P1Weapon, P2Weapon) {
    if (P1Weapon === P2Weapon) return "Draw";

    if (this.WinCheckerP1(P1Weapon, P2Weapon)) {
      this.players[0].addScore(1);
      return "P1 Win";
    } else {
      this.players[1].addScore(1);
      return "P2 Win";
    }
  }

  // Check if Player 1 beats Player 2
  WinCheckerP1(P1Weapon, P2Weapon) {
    return (
      (P1Weapon === 'rock' && (P2Weapon === 'scissors' || P2Weapon === 'lizard')) ||
      (P1Weapon === 'paper' && (P2Weapon === 'rock' || P2Weapon === 'spock')) ||
      (P1Weapon === 'scissors' && (P2Weapon === 'paper' || P2Weapon === 'lizard')) ||
      (P1Weapon === 'lizard' && (P2Weapon === 'spock' || P2Weapon === 'paper')) ||
      (P1Weapon === 'spock' && (P2Weapon === 'scissors' || P2Weapon === 'rock'))
    );
  }

  // Check if any player has reached winning score (e.g., 5)
  checkWin() {
    return this.players.find(p => p.score >= 5) || null;
  }

  // Serialize the game state to JSON
  serialize() {
    return JSON.stringify({
      players: this.players.map(p => ({ name: p.name, score: p.score })),
      current: this.current,
      turnNumber: this.turnNumber,
      moves: this.moves
    });
  }

  // Deserialize JSON into a Battle instance
  static deserialize(json) {
    const obj = typeof json === "string" ? JSON.parse(json) : json;
    const battle = new Battle();
    battle.players = obj.players.map(p => {
      const player = new Player(p.name);
      player.score = p.score;
      return player;
    });
    battle.current = obj.current;
    battle.turnNumber = obj.turnNumber;
    battle.moves = obj.moves || {};
    return battle;
  }
}

export default Battle;
