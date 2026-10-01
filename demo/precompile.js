// Compiles the Express app's screen templates (views/screens/*.ejs) to plain
// JavaScript when the demo is built. Left to itself, EJS compiles them in the
// browser with new Function, which maxblaschek.com's security policy blocks.
// Runs in Node only (Vite and the tests), so EJS never ships to the browser.
import ejs from 'ejs';
import { readdirSync, readFileSync } from 'node:fs';
import { screenRenderer } from './screens-runtime.js';

/** Every variable the screens use (see src/screens.js); strict mode needs them named. */
const LOCALS = ['screen', 'scores', 'player', 'action', 'weapons', 'state', 'turn', 'heading', 'winner', 'loser'];

/**
 * A screen's render function as source code: (locals, escapeFn, include) => html.
 * EJS 6 has no "client" option any more, so this wraps the function body its
 * compiler builds. Strict mode, no `with`, and no debug wrapper.
 */
function compileScreen(template, filename) {
    const compiled = new ejs.Template(template, {
        strict: true,
        destructuredLocals: LOCALS,
        compileDebug: false,
        filename,
    });
    compiled.compile();
    return `function (locals, escapeFn, include) {\n"use strict";\n${compiled.source}}`;
}

/** Vite plugin: importing a .ejs file gives its compiled render function. */
export function ejsScreens() {
    return {
        name: 'ejs-screens',
        transform(code, id) {
            if (!id.endsWith('.ejs')) return null;
            return { code: `export default ${compileScreen(code, id)};`, map: null };
        },
    };
}

/** For the tests: every screen compiled as the build compiles it. */
export function precompiledScreens() {
    const templates = {};
    for (const file of readdirSync('views/screens')) {
        const source = compileScreen(readFileSync(`views/screens/${file}`, 'utf8'), file);
        // Node only: this evaluates the compiled source the build would ship
        templates[file.replace(/\.ejs$/, '')] = new Function(`return (${source})`)();
    }
    return screenRenderer(templates);
}
