import { screenData } from '../src/screens.js';

/** Renders a screen of the game (views/screens) in the page, carrying the game state. */
export function renderScreen(res, game, state = '') {
  res.render('page', { ...screenData(game), state, year: new Date().getFullYear() });
}
