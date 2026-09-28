import { MADE_IN, screenData } from '../src/screens.js';
import { choose, nextTurn, startGame } from './flow.js';
import { screenRenderer } from './screens-runtime.js';

// The Express app's own screen templates, compiled to JavaScript at build time
// (demo/precompile.js), so the demo always matches it and needs no eval
const COMPILED = import.meta.glob('../views/screens/*.ejs', { import: 'default', eager: true });
const screens = screenRenderer(
    Object.fromEntries(Object.entries(COMPILED).map(([path, render]) => [path.match(/([\w-]+)\.ejs$/)[1], render])),
);

const app = document.getElementById('app');
document.getElementById('copyright').textContent = `© ${MADE_IN} Max Blaschek. All Rights Reserved.`;

let game = null;
let firstScreen = true;

function show(next) {
    game = next;
    // A new screen starts unlit until the mouse moves (public/pointer.js)
    delete document.documentElement.dataset['hover'];
    // <%= %> escapes, so player names are never parsed as HTML
    const data = { ...screenData(game), state: '' };
    app.innerHTML = screens.render(data.screen, data);
    // Move focus to the new screen's heading so keyboard and screen reader users
    // follow along; the first screen is simply where the page starts
    if (firstScreen) firstScreen = false;
    else app.querySelector('h1, .who')?.focus();
}

// The screens' forms post to the Express routes; here each step runs in the page
app.addEventListener('submit', (event) => {
    event.preventDefault();
    const form = event.target;
    const step = form.dataset.step;
    if (step === 'start') show(startGame(form.elements.player1.value, form.elements.player2.value));
    else if (step === 'choose') show(choose(game, event.submitter.value));
    else if (step === 'next') show(nextTurn(game));
    else show(null);
});

show(null);
