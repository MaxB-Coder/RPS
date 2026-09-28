// What each screen of the game shows, worked out from the game. The Express app
// and the static demo both render views/screens/*.ejs with this data, so the two
// always look and read the same.
export const WEAPONS = ['rock', 'paper', 'scissors', 'spock', 'lizard'];

const capitalise = (word) => word[0].toUpperCase() + word.slice(1);

/** Both players and their scores, marking whose turn it is to choose. */
export function scoreboard(game) {
    const current = game.screen === 'choose' ? game.battle.currentPlayer() : null;
    return game.battle.players.map((player) => ({ name: player.name, score: player.score, current: player === current }));
}

/** The turn just played: each side's weapon, and which side won it (null for a draw). */
export function lastTurn(game) {
    const winner = { 'P1 Win': 0, 'P2 Win': 1 }[game.result] ?? null;
    return { sides: game.battle.players.map(({ name, weapon }) => ({ name, weapon })), winner };
}

export function describeTurn(game) {
    const [p1, p2] = game.battle.players;
    if (game.result === 'P1 Win') return `${p1.name}'s ${p1.weapon} beats ${p2.name}'s ${p2.weapon}`;
    if (game.result === 'P2 Win') return `${p2.name}'s ${p2.weapon} beats ${p1.name}'s ${p1.weapon}`;
    return `Draw! Both chose ${p1.weapon}`;
}

/** Everything views/screens/<screen>.ejs needs; `null` is a game not started yet. */
export function screenData(game) {
    if (!game) return { screen: 'start' };
    const { battle } = game;

    if (game.screen === 'choose') {
        return {
            screen: 'choose',
            scores: scoreboard(game),
            player: battle.currentPlayer().name,
            action: battle.current === 0 ? 'turnP1' : 'turnP2',
            weapons: WEAPONS.map((id) => ({ id, label: capitalise(id) })),
        };
    }

    if (game.screen === 'result') {
        return { screen: 'result', scores: scoreboard(game), turn: lastTurn(game), heading: describeTurn(game) };
    }

    const [p1, p2] = battle.players;
    const [winner, loser] = p1.score > p2.score ? [p1, p2] : [p2, p1];
    const side = ({ name, score, weapon }) => ({ name, score, weapon });
    return { screen: 'winner', winner: side(winner), loser: side(loser) };
}
