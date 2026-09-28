import chai from 'chai';
import { choose, lastTurn, nextTurn, scoreboard, startGame, WEAPONS } from '../demo/flow.js';

const expect = chai.expect;

describe('Static game flow:', () => {
    it('starts with player 1 choosing, and names blank players', () => {
        const game = startGame(' Alice ', '');
        expect(game.screen).to.equal('choose');
        expect(game.battle.players.map((p) => p.name)).to.deep.equal(['Alice', 'Player 2']);
        expect(game.battle.currentPlayer().name).to.equal('Alice');
    });

    it('passes to player 2, then shows the result', () => {
        let game = startGame('Alice', 'Bob');
        game = choose(game, 'rock');
        expect(game.screen).to.equal('choose');
        expect(game.battle.currentPlayer().name).to.equal('Bob');

        game = choose(game, 'scissors');
        expect(game.screen).to.equal('result');
        expect(game.result).to.equal('P1 Win');
    });

    it('moves on to the next turn after a result', () => {
        let game = choose(choose(startGame('Alice', 'Bob'), 'rock'), 'rock');
        expect(game.result).to.equal('Draw');
        game = nextTurn(game);
        expect(game).to.include({ screen: 'choose', result: null });
    });

    it('ends on the winner screen when someone reaches five', () => {
        let game = startGame('Alice', 'Bob');
        for (let turn = 0; turn < 5; turn++) {
            game = choose(choose(game, 'paper'), 'rock');
            if (game.screen === 'result') game = nextTurn(game);
        }
        expect(game.screen).to.equal('winner');
        expect(game.battle.checkWin().name).to.equal('Alice');
    });

    it('offers the five weapons and rejects anything else', () => {
        expect(WEAPONS).to.deep.equal(['rock', 'paper', 'scissors', 'spock', 'lizard']);
        expect(() => choose(startGame('A', 'B'), 'bazooka')).to.throw(/Unknown weapon/);
    });
    it('keeps a scoreboard that marks whose turn it is', () => {
        let game = startGame('Alice', 'Bob');
        expect(scoreboard(game)).to.deep.equal([
            { name: 'Alice', score: 0, current: true },
            { name: 'Bob', score: 0, current: false },
        ]);
        game = choose(choose(game, 'paper'), 'rock');
        expect(scoreboard(game)).to.deep.equal([
            { name: 'Alice', score: 1, current: false },
            { name: 'Bob', score: 0, current: false },
        ]);
    });

    it('describes the turn just played: both weapons, and who won it', () => {
        const won = choose(choose(startGame('Alice', 'Bob'), 'rock'), 'spock');
        expect(lastTurn(won)).to.deep.equal({
            sides: [{ name: 'Alice', weapon: 'rock' }, { name: 'Bob', weapon: 'spock' }],
            winner: 1,
        });
        const drawn = choose(choose(startGame('Alice', 'Bob'), 'lizard'), 'lizard');
        expect(lastTurn(drawn).winner).to.equal(null);
    });
});
