class Player {
  constructor(name) {
    this.name = name;
    this.score = 0;
  }

  addScore(amount) {
    this.score += amount;
  }
}

export default Player;