import chai from 'chai';
import chaiHttp from 'chai-http';
import Player from '../src/player.js';

const expect = chai.expect;

describe('Player class tests:', () => { 
    let player;

    beforeEach(() => {
        player = new Player('Player1');
    });

    afterEach(() => {
        player = undefined;
    });

    it('Should add the given amount to score', () => {
        player.addScore(1)
        expect(player.score).to.equal(1);
    });
 })