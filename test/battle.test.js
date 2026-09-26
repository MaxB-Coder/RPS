import chai from 'chai';
import chaiHttp from 'chai-http';
import Battle from '../src/battle.js';

const expect = chai.expect;
describe('Battle class tests:', () => { 
    let battle;

    beforeEach(() => {
        battle = new Battle();
        battle.setup(['Player1', 'Player2']);
    });

    afterEach(() => {
        battle = undefined;
        const expected = undefined;
    });

    it('should add the correct play names to the players array', () => {
        expect(battle.players.map(({ name, score }) => ({ name, score }))).to.deep.equal([
            { name: 'Player1', score: 0 },
            { name: 'Player2', score: 0 },
        ]);
    })
    
    it('should be able to switch players', () => {
        battle.nextPlayer();
        expect(battle.currentPlayer().name).to.equal('Player2');
        expect(battle.otherPlayer().name).to.equal('Player1');
    })

    it('should check that currentPlayer() returns the first player in the players array.', () => { 
        expect(battle.currentPlayer().name).to.equal('Player1');
    })

    it('should check that otherPlayer() returns the second player in the players array.', () => { 
        expect(battle.otherPlayer().name).to.equal('Player2');
    })

    it('should check that a draw is returned when both weapons are the same.', () => { 
        const expected = battle.turn("rock", "rock")
        expect(expected).to.equal("Draw");
    })

    it('should check that P1 Win is returned when P1 plays rock and P2 plays scissors.', () => { 
        const expected = battle.turn("rock", "scissors")
        expect(expected).to.equal("P1 Win");
    })

    it('should check that P1 Win is returned when P1 plays paper and P2 plays rock.', () => { 
        const expected = battle.turn("paper", "rock")
        expect(expected).to.equal("P1 Win");
    })

    it('should check that P1 Win is returned when P1 plays scissors and P2 plays paper.', () => { 
        const expected = battle.turn("scissors", "paper")
        expect(expected).to.equal("P1 Win");
    })

    it('should check that P2 Win is returned when P2 plays rock and P1 plays scissors.', () => { 
        const expected = battle.turn("scissors", "rock")
        expect(expected).to.equal("P2 Win");
    })

    it('should check that P2 Win is returned when P2 plays paper and P1 plays rock.', () => { 
        const expected = battle.turn("rock", "paper")
        expect(expected).to.equal("P2 Win");
    })

    it('should check that P2 Win is returned when P2 plays scissors and P1 plays paper.', () => { 
        const expected = battle.turn("paper", "scissors")
        expect(expected).to.equal("P2 Win");
    })

    it('should check that P1 Win is returned when P1 plays rock and P2 plays lizard.', () => { 
        const expected = battle.turn("rock", "lizard")
        expect(expected).to.equal("P1 Win");
    })

    it('should check that P1 Win is returned when P1 plays paper and P2 plays spock.', () => { 
        const expected = battle.turn("paper", "spock")
        expect(expected).to.equal("P1 Win");
    })

    it('should check that P1 Win is returned when P1 plays scissors and P2 plays lizard.', () => { 
        const expected = battle.turn("scissors", "lizard")
        expect(expected).to.equal("P1 Win");
    })

    it('should check that P1 Win is returned when P1 plays lizard and P2 plays paper.', () => { 
        const expected = battle.turn("lizard", "paper")
        expect(expected).to.equal("P1 Win");
    })

    it('should check that P1 Win is returned when P1 plays lizard and P2 plays spock.', () => { 
        const expected = battle.turn("lizard", "spock")
        expect(expected).to.equal("P1 Win");
    })

    it('should check that P1 Win is returned when P1 plays spock and P2 plays rock.', () => { 
        const expected = battle.turn("spock", "rock")
        expect(expected).to.equal("P1 Win");
    })

    it('should check that P1 Win is returned when P1 plays spock and P2 plays scissors.', () => { 
        const expected = battle.turn("spock", "scissors")
        expect(expected).to.equal("P1 Win");
    })

    it('should check that P2 Win is returned when P2 plays rock and P1 plays lizard.', () => { 
        const expected = battle.turn("lizard", "rock")
        expect(expected).to.equal("P2 Win");
    })

    it('should check that P2 Win is returned when P2 plays paper and P1 plays spock.', () => { 
        const expected = battle.turn("spock", "paper")
        expect(expected).to.equal("P2 Win");
    })

    it('should check that P2 Win is returned when P2 plays scissors and P1 plays lizard.', () => { 
        const expected = battle.turn("lizard", "scissors")
        expect(expected).to.equal("P2 Win");
    })

    it('should check that P2 Win is returned when P2 plays lizard and P1 plays paper.', () => { 
        const expected = battle.turn("paper", "lizard")
        expect(expected).to.equal("P2 Win");
    })

    it('should check that P2 Win is returned when P2 plays lizard and P1 plays spock.', () => { 
        const expected = battle.turn("spock", "lizard")
        expect(expected).to.equal("P2 Win");
    })

    it('should check that P2 Win is returned when P2 plays spock and P1 plays rock.', () => { 
        const expected = battle.turn("rock", "spock")
        expect(expected).to.equal("P2 Win");
    })

    it('should check that P2 Win is returned when P2 plays spock and P1 plays scissors.', () => { 
        const expected = battle.turn("scissors", "spock")
        expect(expected).to.equal("P2 Win");
    })
 
    it('should resolve a turn once both players have chosen', () => {
        expect(battle.play('rock')).to.equal(null);
        expect(battle.play('scissors')).to.equal('P1 Win');
        expect(battle.players[0].score).to.equal(1);
    });

    it('should still resolve turns when both players have the same name', () => {
        battle.setup(['Max', 'Max']);
        expect(battle.play('rock')).to.equal(null);
        expect(battle.play('paper')).to.equal('P2 Win');
    });
})