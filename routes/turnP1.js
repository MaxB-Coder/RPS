import { Router } from 'express';
import Battle from '../src/battle.js';
import { renderScreen } from './render.js';

const router = Router();

router.post('/', (req, res) => {
  const stateParam = req.body.state;
  if (!stateParam) return res.status(400).send('Missing game state');

  const battle = Battle.fromRequest(stateParam);
  if (!battle) return res.status(400).send('Invalid game state');

  const move = req.body.move;
  if (!move) return res.status(400).send('Missing move');

  const result = battle.play(move); // store Player 1 move
  const state = encodeURIComponent(battle.serialize());

  // Check for winner
  const winner = battle.checkWin();
  if (winner) {
    return renderScreen(res, { screen: 'winner', battle, result }, state);
  }

  if (result) {
    // Both players have moved, show turn result
    return renderScreen(res, { screen: 'result', battle, result }, state);
  }

  // Only one player has moved: show the other one's turn from here. A redirect
  // would put the state, pick included, in the address bar for them to read
  renderScreen(res, { screen: 'choose', battle, result: null }, state);
});

export default router;
