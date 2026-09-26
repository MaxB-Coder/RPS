import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app.js';

const expect = chai.expect;
chai.use(chaiHttp);

describe('Routes tests:', () => {
    const testServer = chai.request(app).keepOpen();

    const newGame = async () => {
        const res = await testServer.post('/game').type('form').send({ player1: 'Alice', player2: 'Bob' }).redirects(0);
        return new URL(res.headers.location, 'http://localhost').searchParams.get('state');
    };

    it('starts a game and asks player 1 for a weapon', async () => {
        const state = await newGame();
        const res = await testServer.get('/game').query({ state });

        expect(res).to.have.status(200);
        expect(res.text).to.contain('Current Player: Alice');
    });

    it('passes the turn to player 2 after player 1 chooses', async () => {
        const state = await newGame();
        const res = await testServer.post('/turnP1').type('form').send({ state, move: 'rock' });

        expect(res).to.have.status(200);
    });

    it('rejects a missing game state', async () => {
        const res = await testServer.post('/turnP1').type('form').send({ move: 'rock' });
        expect(res).to.have.status(400);
    });

    it('rejects a corrupt game state without leaking a stack trace', async () => {
        for (const path of ['/turnP1', '/turnP2']) {
            const res = await testServer.post(path).type('form').send({ state: '{not json', move: 'rock' });
            expect(res).to.have.status(400);
            expect(res.text).to.not.contain('SyntaxError');
        }
        const res = await testServer.get('/game').query({ state: '{"players":' });
        expect(res).to.have.status(400);
    });
});
