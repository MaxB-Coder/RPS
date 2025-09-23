import { Router } from "express";
import Battle from "../src/battle.js";

const router = Router();

router.post("/", (req, res) => {
  const stateParam = req.body.state;
  if (!stateParam) return res.status(400).send("Missing game state");

  const battle = Battle.deserialize(decodeURIComponent(stateParam));

  const move = req.body.move;
  if (!move) return res.status(400).send("Missing move");

  battle.play(move);

  const winner = battle.checkWin();
  const state = encodeURIComponent(battle.serialize());

  if (winner) {
    res.render("winner", { winnerName: winner.name, winnerScore: winner.score, state });
  } else {
    battle.nextPlayer();
    const updatedState = encodeURIComponent(battle.serialize());
    res.redirect(`/game?state=${updatedState}`);
  }
});

export default router;
