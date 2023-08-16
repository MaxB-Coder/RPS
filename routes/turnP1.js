import { Router } from 'express';
const router = Router();

router.post('/', (req, res) => {
    const weaponP1 = req.body;
    req.app.locals.weaponP1 = weaponP1;
    const battle = req.app.locals.battle;
  
    battle.switch();
  
    const player = req.app.locals.battle.currentPlayer();

  res.render('gameP2', {
    name: player.name,
    score: player.score
  });
})



export default router;