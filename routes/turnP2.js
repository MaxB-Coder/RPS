import { Router } from "express";
import Battle from "../src/battle.js";
import { renderScreen } from "./render.js";

const router = Router();

router.post("/", (req, res) => {
  const stateParam = req.body.state;
  if (!stateParam) return res.status(400).send("Missing game state");

  const battle = Battle.fromRequest(stateParam);
  if (!battle) return res.status(400).send("Invalid game state");

  const move = req.body.move;
  if (!move) return res.status(400).send("Missing move");

  const result = battle.play(move); // store Player 2 move
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

  // Only Player 2 has moved? Normally shouldn't happen
  res.redirect(`/game?state=${state}`);
});

export default router;
