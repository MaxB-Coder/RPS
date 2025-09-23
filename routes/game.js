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
  const player = battle.currentPlayer();

  const state = encodeURIComponent(battle.serialize());
  res.render("gameP1", {
    name: player.name,
    score: player.score,
    state
  });
});

export default router;
