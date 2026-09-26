// The game's screens as a small state machine over the same Battle class the
// Express app uses, so the static demo plays by exactly the same rules.
import Battle from '../src/battle.js';

export const WEAPONS = ['rock', 'paper', 'scissors', 'spock', 'lizard'];

/** Starts a game; blank names become "Player 1" and "Player 2". */
export function startGame(name1, name2) {
    const battle = new Battle();
    battle.setup([name1.trim() || 'Player 1', name2.trim() || 'Player 2']);
    return { screen: 'choose', battle, result: null };
}

/** The current player picks a weapon. */
export function choose(game, weapon) {
    if (!WEAPONS.includes(weapon)) throw new Error(`Unknown weapon: ${weapon}`);
    const result = game.battle.play(weapon);
    if (result === null) return { ...game, screen: 'choose' };
    return { ...game, screen: game.battle.checkWin() ? 'winner' : 'result', result };
}

/** After a result, on to the next turn. */
export function nextTurn(game) {
    return { ...game, screen: 'choose', result: null };
}
