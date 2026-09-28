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
        expect(res.text).to.contain('Alice, pick your weapon');
        expect(res.text).to.match(/<button[^>]*name="move" value="rock"/);
    });

    it('plays a whole turn without any JavaScript: both picks, then the result', async () => {
        const state = await newGame();
        const afterP1 = await testServer.post('/turnP1').type('form').send({ state, move: 'rock' }).redirects(0);
        const next = afterP1.text.match(/name="state" value="([^"]*)"/)[1];
        const res = await testServer.post('/turnP2').type('form').send({ state: next, move: 'scissors' });

        expect(res).to.have.status(200);
        // EJS escapes the apostrophes
        expect(res.text.replace(/&#39;/g, "'")).to.contain("Alice's rock beats Bob's scissors");
    });

    it("never puts player 1's pick in the address bar for player 2 to see", async () => {
        const state = await newGame();
        const res = await testServer.post('/turnP1').type('form').send({ state, move: 'spock' }).redirects(0);

        expect(res).to.have.status(200);
        expect(res.headers.location).to.equal(undefined);
        expect(res.text).to.contain('Bob, pick your weapon');
    });

    it('says in the footer that the game dates from 2023', async () => {
        const res = await testServer.get('/');
        expect(res.text).to.contain('&copy; 2023 Max Blaschek');
    });

    it('serves only its own stylesheet, with no CDN scripts', async () => {
        const res = await testServer.get('/');
        expect(res.text).to.contain('href="/style.css"');
        expect(res.text).to.not.match(/cdn\.jsdelivr|code\.jquery/);
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
