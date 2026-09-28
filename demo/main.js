import ejs from 'ejs/ejs.js';
import { screenData } from '../src/screens.js';
import { choose, nextTurn, startGame } from './flow.js';

// The Express app's own screen templates, so the demo always matches it
const TEMPLATES = import.meta.glob('../views/screens/*.ejs', { query: '?raw', import: 'default', eager: true });
const template = (name) => TEMPLATES[`../views/screens/${name}.ejs`];

const app = document.getElementById('app');
document.getElementById('copyright').textContent = `© ${new Date().getFullYear()} Max Blaschek. All Rights Reserved.`;

let game = null;
let firstScreen = true;

function show(next) {
    game = next;
    // <%= %> escapes, so player names are never parsed as HTML
    app.innerHTML = ejs.render(template(screenData(game).screen), { ...screenData(game), state: '' }, {
        includer: (name) => ({ template: template(name) }),
    });
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
