import chai from 'chai';
import ejs from 'ejs';
import { choose, nextTurn, startGame } from '../demo/flow.js';
import { screenData } from '../src/screens.js';

const expect = chai.expect;
const render = (game) =>
    ejs.renderFile('views/page.ejs', { ...screenData(game), state: 'STATE', year: 2026 });

describe('Screens (shared by the Express app and the demo):', () => {
    it('starts by asking who is playing', async () => {
        expect(screenData(null)).to.deep.equal({ screen: 'start' });
        const html = await render(null);
        expect(html).to.contain('Who is playing?');
        expect(html).to.match(/name="player1"/);
    });

    it('asks the current player for a weapon, offering each as a button', async () => {
        const game = startGame('Alice', 'Bob');
        const data = screenData(game);
        expect(data).to.include({ screen: 'choose', player: 'Alice', action: 'turnP1' });
        expect(data.scores).to.deep.equal([
            { name: 'Alice', score: 0, current: true },
            { name: 'Bob', score: 0, current: false },
        ]);
        const html = await render(game);
        expect(html).to.contain('Alice, pick your weapon');
        for (const move of ['rock', 'paper', 'scissors', 'spock', 'lizard']) {
            expect(html).to.match(new RegExp(`<button[^>]*name="move" value="${move}"`));
        }
        expect(screenData(choose(game, 'rock'))).to.include({ player: 'Bob', action: 'turnP2' });
    });

    it('shows a turn face to face, with the winner and the score', async () => {
        const game = choose(choose(startGame('Alice', 'Bob'), 'rock'), 'scissors');
        const data = screenData(game);
        expect(data.screen).to.equal('result');
        expect(data.heading).to.equal("Alice's rock beats Bob's scissors");
        expect(data.turn.winner).to.equal(0);
        const html = await render(game);
        expect(html).to.match(/class="side won"[\s\S]*Alice/);
        expect(html).to.match(/class="side lost"[\s\S]*Bob/);
    });

    it('names the winner at five', async () => {
        let game = startGame('Alice', 'Bob');
        for (let turn = 0; turn < 5; turn++) {
            game = choose(choose(game, 'paper'), 'rock');
            if (game.screen === 'result') game = nextTurn(game);
        }
        const html = await render(game);
        expect(html).to.contain('Alice is the winner!');
        expect(html).to.contain('Sorry Bob');
    });

    it('never parses a player name as HTML', async () => {
        const html = await render(startGame('<b>Alice</b>', 'Bob'));
        expect(html).to.contain('&lt;b&gt;Alice&lt;/b&gt;');
        expect(html).to.not.contain('<b>Alice</b>');
    });
});
