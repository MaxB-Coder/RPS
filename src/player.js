class Player {
  constructor(name) {
    this.name = name;
    this.score = 0;
    this.weapon = null; // last chosen weapon
  }

  addScore(points = 1) {
    this.score += points;
  }

  setWeapon(weapon) {
    this.weapon = weapon;
  }
}

export default Player;
