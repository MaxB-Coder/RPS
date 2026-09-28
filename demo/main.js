import 'bootstrap/dist/css/bootstrap.min.css';
import './demo.css';
import { choose, lastTurn, nextTurn, scoreboard, startGame, WEAPONS } from './flow.js';

const app = document.getElementById('app');
document.getElementById('copyright').textContent = `© ${new Date().getFullYear()} Max Blaschek. All Rights Reserved.`;

/** Builds an element; strings become text nodes, so player names are never parsed as HTML. */
function el(tag, props = {}, ...children) {
    const node = Object.assign(document.createElement(tag), props);
    node.append(...children);
    return node;
}

const capitalise = (word) => word[0].toUpperCase() + word.slice(1);

function form(onSubmit, ...children) {
    const node = el('form', { className: 'text-center' }, ...children);
    node.addEventListener('submit', (event) => {
        event.preventDefault();
        onSubmit(event);
    });
    return node;
}

const button = (label) => el('input', { type: 'submit', className: 'cta', value: label });

const weaponImage = (weapon) => el('img', { src: `images/${weapon}.png`, alt: '' });

/** Both players and their scores; the one choosing is highlighted. */
function scores(game) {
    return el('div', { className: 'scoreboard', ariaLabel: 'Score' },
        ...scoreboard(game).map(({ name, score, current }) =>
            el('div', { className: current ? 'score current' : 'score' },
                el('span', { className: 'score-name' }, name),
                el('span', { className: 'score-points' }, String(score)))));
}

let firstScreen = true;

function show(...children) {
    app.replaceChildren(...children);
    // Move focus to the new screen's heading so keyboard and screen reader users
    // follow along; the first screen is simply where the page starts
    if (firstScreen) firstScreen = false;
    else app.querySelector('h1, p.who')?.focus();
}

function startScreen() {
    const name1 = el('input', { type: 'text', className: 'name', placeholder: 'Player 1', ariaLabel: 'Player 1 name', autocomplete: 'off' });
    const name2 = el('input', { type: 'text', className: 'name', placeholder: 'Player 2', ariaLabel: 'Player 2 name', autocomplete: 'off' });
    show(
        el('header', { className: 'banner' },
            el('img', { src: 'images/RPS.png', alt: 'Rock, Paper, Scissors, Spock, Lizard' })),
        el('p', { className: 'who', tabIndex: -1 }, 'Who is playing?'),
        form(() => render(startGame(name1.value, name2.value)),
            el('div', { className: 'names' }, name1, el('span', { className: 'versus', ariaHidden: 'true' }, 'vs'), name2),
            button("Let's ROCK!")),
        el('p', { className: 'hint' }, 'First to five wins. Take turns on this device, and no peeking.'),
    );
}

function chooseScreen(game) {
    const player = game.battle.currentPlayer();
    const weapons = WEAPONS.map((weapon) => {
        const tile = el('button', { type: 'button', className: 'weapon' }, weaponImage(weapon), el('span', {}, capitalise(weapon)));
        tile.addEventListener('click', () => render(choose(game, weapon)));
        return tile;
    });
    show(
        scores(game),
        el('h1', { className: 'heading', tabIndex: -1 }, `${player.name}, pick your weapon`),
        el('div', { className: 'weapons' }, ...weapons),
    );
}

function describeTurn(game) {
    const [p1, p2] = game.battle.players;
    if (game.result === 'P1 Win') return `${p1.name}'s ${p1.weapon} beats ${p2.name}'s ${p2.weapon}`;
    if (game.result === 'P2 Win') return `${p2.name}'s ${p2.weapon} beats ${p1.name}'s ${p1.weapon}`;
    return `Draw! Both chose ${p1.weapon}`;
}

/** The two weapons face to face, the winner's lit up. */
function faceOff(game) {
    const { sides, winner } = lastTurn(game);
    const side = ({ name, weapon }, index) =>
        el('div', { className: winner === null ? 'side' : winner === index ? 'side won' : 'side lost' },
            weaponImage(weapon),
            el('span', {}, name));
    return el('div', { className: 'face-off', ariaHidden: 'true' },
        side(sides[0], 0), el('span', { className: 'versus' }, 'vs'), side(sides[1], 1));
}

function resultScreen(game) {
    show(
        scores(game),
        faceOff(game),
        el('h1', { className: 'heading', tabIndex: -1 }, describeTurn(game)),
        form(() => render(nextTurn(game)), button('Another one')),
    );
}

function winnerScreen(game) {
    const [p1, p2] = game.battle.players;
    const [winner, loser] = p1.score > p2.score ? [p1, p2] : [p2, p1];
    show(
        el('p', { className: 'trophy', ariaHidden: 'true' }, '🏆'),
        el('h1', { className: 'heading winner', tabIndex: -1 }, `${winner.name} is the winner!`),
        el('div', { className: 'winbox' },
            el('p', {}, `Final score: ${winner.score} to ${loser.score}`),
            el('p', {}, `Final battle: ${winner.name}'s ${winner.weapon} beat ${loser.name}'s ${loser.weapon}`),
            el('p', { className: 'consolation' }, `Sorry ${loser.name}, you'll get 'em next time...`)),
        form(startScreen, button('Play again?')),
    );
}

function render(game) {
    if (game.screen === 'choose') chooseScreen(game);
    else if (game.screen === 'result') resultScreen(game);
    else winnerScreen(game);
}

startScreen();
