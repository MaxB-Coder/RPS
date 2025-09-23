import { Router } from "express";
import Battle from "../src/battle.js";

const router = Router();

router.post("/", (req, res) => {
  const stateParam = req.body.state;
  if (!stateParam) return res.status(400).send("Missing game state");

  const battle = Battle.deserialize(decodeURIComponent(stateParam));

  const move = req.body.move;
  if (!move) return res.status(400).send("Missing move");

  const result = battle.play(move); // store Player 2 move
  const state = encodeURIComponent(battle.serialize());

  // Check for winner
  const winner = battle.checkWin();
  if (winner) {
    return res.render("winner", {
      winner,
      player1: battle.players[0],
      player2: battle.players[1],
      state
    });
  }

  if (result) {
    // Both players have moved, show turn result
    return res.render("turnResult", {
      result,
      player1: battle.players[0],
      player2: battle.players[1],
      state
    });
  }

  // Only Player 2 has moved? Normally shouldn't happen
  res.redirect(`/game?state=${state}`);
});

export default router;
