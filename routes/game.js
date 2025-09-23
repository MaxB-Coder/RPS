import { Router } from "express";
import Battle from "../src/battle.js";

const router = Router();

router.post("/", (req, res) => {
  const battle = new Battle();
  const names = [req.body.player1, req.body.player2];
  battle.setup(names);

  const state = encodeURIComponent(battle.serialize());
  res.redirect(`/game?state=${state}`);
});

router.get("/", (req, res) => {
  const stateParam = req.query.state;
  if (!stateParam) return res.status(400).send("Missing game state");

  const battle = Battle.deserialize(decodeURIComponent(stateParam));
  const current = battle.currentPlayer();

  const template = battle.current === 0 ? "gameP1" : "gameP2";

  res.render(template, {
    name: current.name,
    score: current.score,
    state: encodeURIComponent(battle.serialize())
  });
});

export default router;
