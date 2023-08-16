import { Router } from 'express';
const router = Router();
import Battle from '../src/battle.js';

router.post('/', (req, res) => {
    const battle = new Battle();
    const names = [req.body.player1, req.body.player2];
  
    battle.setup(names);
    req.app.locals.battle = battle;

    res.redirect('/game');
})

router.get('/', (req, res) => {
  const player = req.app.locals.battle.currentPlayer();

  res.render('gameP1', {
    name: player.name,
    score: player.score
  });
})

export default router;