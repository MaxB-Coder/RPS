import 'bootstrap/dist/css/bootstrap.min.css';
import { choose, nextTurn, startGame, WEAPONS } from './flow.js';

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

const button = (label) => el('input', { type: 'submit', className: 'mt-2 h5', value: label });

let firstScreen = true;

function show(...children) {
    app.replaceChildren(...children);
    // Move focus to the new screen's heading so keyboard and screen reader users
    // follow along; the first screen is simply where the page starts
    if (firstScreen) firstScreen = false;
    else app.querySelector('h1, p.who')?.focus();
}

function startScreen() {
    const name1 = el('input', { type: 'text', className: 'text-center mx-3 h5', placeholder: 'Player 1', ariaLabel: 'Player 1 name' });
    const name2 = el('input', { type: 'text', className: 'text-center mx-3 h5', placeholder: 'Player 2', ariaLabel: 'Player 2 name' });
    show(
        el('header', { className: 'p-2 d-flex justify-content-center w-100' },
            el('img', { src: 'images/RPS.png', alt: 'Rock, Paper, Scissors, Spock, Lizard', className: 'img-fluid' })),
        el('p', { className: 'who text-center text-white mt-3', tabIndex: -1 }, 'Who is playing?'),
        form(() => render(startGame(name1.value, name2.value)),
            el('div', { className: 'd-flex justify-content-center mt-2 w-100' }, name1, name2),
            el('div', { className: 'text-black' }, el('input', { type: 'submit', className: 'mt-4 h5', value: "Let's ROCK!" }))),
    );
}

function chooseScreen(game) {
    const player = game.battle.currentPlayer();
    const weapons = WEAPONS.map((weapon) => {
        const input = el('input', { type: 'image', className: 'weapon', src: `images/${weapon}.png`, alt: capitalise(weapon) });
        input.addEventListener('click', (event) => {
            event.preventDefault();
            render(choose(game, weapon));
        });
        return input;
    });
    show(
        el('h1', { className: 'heading text-white', tabIndex: -1 }, `Current Player: ${player.name}`),
        el('h2', { className: 'heading text-white' }, `Your score is ${player.score}`),
        el('p', { className: 'heading text-white' }, 'Select your weapon!'),
        el('div', { className: 'd-flex flex-wrap justify-content-center' }, ...weapons),
    );
}

function describeTurn(game) {
    const [p1, p2] = game.battle.players;
    if (game.result === 'P1 Win') return `${p1.name}'s ${p1.weapon} beats ${p2.name}'s ${p2.weapon}`;
    if (game.result === 'P2 Win') return `${p2.name}'s ${p2.weapon} beats ${p1.name}'s ${p1.weapon}`;
    return `Draw! Both chose ${p1.weapon}`;
}

function resultScreen(game) {
    const [p1, p2] = game.battle.players;
    show(
        el('h1', { className: 'heading text-white text-center', tabIndex: -1 }, describeTurn(game)),
        el('h2', { className: 'heading text-white text-center' }, `Score: ${p1.score} to ${p2.score}`),
        form(() => render(nextTurn(game)), button('Another one')),
    );
}

function winnerScreen(game) {
    const [p1, p2] = game.battle.players;
    const [winner, loser] = p1.score > p2.score ? [p1, p2] : [p2, p1];
    show(
        el('h1', { className: 'heading text-white text-center mt-4', tabIndex: -1 }, `${winner.name} is the winner!`),
        el('div', { className: 'd-flex justify-content-center' },
            el('div', { className: 'winbox' },
                el('h2', { className: 'text-white text-center' }, `Sorry ${loser.name}, you'll get 'em next time...`),
                el('h2', { className: 'text-white text-center mt-1' }, `Final battle: ${winner.name}'s ${winner.weapon} beat ${loser.name}'s ${loser.weapon}`),
                el('h2', { className: 'text-white text-center mt-1' }, `Final score: ${p1.score} to ${p2.score}`))),
        form(startScreen, button('Play again?')),
    );
}

function render(game) {
    if (game.screen === 'choose') chooseScreen(game);
    else if (game.screen === 'result') resultScreen(game);
    else winnerScreen(game);
}

startScreen();
