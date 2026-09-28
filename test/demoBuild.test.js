import chai from 'chai';
import ejs from 'ejs';
import { mkdtempSync, readdirSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { build } from 'vite';
import { choose, nextTurn, startGame } from '../demo/flow.js';
import { precompiledScreens } from '../demo/precompile.js';
import { screenData } from '../src/screens.js';

const expect = chai.expect;

/** A game at each screen. */
function games() {
    const start = startGame('Alice', '<b>Bob</b>');
    const result = choose(choose(start, 'rock'), 'scissors');
    let winner = start;
    for (let turn = 0; turn < 5; turn++) {
        winner = choose(choose(winner, 'paper'), 'rock');
        if (winner.screen === 'result') winner = nextTurn(winner);
    }
    return { start: null, choose: start, result, winner };
}

describe('The demo build:', () => {
    it('renders every screen exactly as the Express app does, without EJS at runtime', async () => {
        const screens = await precompiledScreens();
        for (const [name, game] of Object.entries(games())) {
            const data = { ...screenData(game), state: 'STATE' };
            const express = await ejs.renderFile(`views/screens/${data.screen}.ejs`, data);
            expect(screens.render(data.screen, data), name).to.equal(express);
        }
    });

    it('ships no eval or new Function, which the site\'s security policy blocks', async function () {
        this.timeout(30000);
        const outDir = mkdtempSync(join(tmpdir(), 'rps-demo-'));
        await build({ configFile: 'vite.demo.config.js', logLevel: 'silent', build: { outDir, emptyOutDir: true } });
        const js = readdirSync(join(outDir, 'assets')).filter((f) => f.endsWith('.js'));
        expect(js).to.not.be.empty;
        for (const file of js) {
            const code = readFileSync(join(outDir, 'assets', file), 'utf8');
            expect(code, file).to.not.match(/new Function\s*\(|\beval\s*\(/);
        }
    });
});
