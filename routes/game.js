import { Router } from "express";
import Battle from "../src/battle.js";
import { renderScreen } from "./render.js";

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

  const battle = Battle.fromRequest(stateParam);
  if (!battle) return res.status(400).send("Invalid game state");
  renderScreen(res, { screen: "choose", battle, result: null }, encodeURIComponent(battle.serialize()));
});

export default router;
