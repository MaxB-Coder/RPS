import chai from 'chai';
import { choose, nextTurn, startGame, WEAPONS } from '../demo/flow.js';

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
});
