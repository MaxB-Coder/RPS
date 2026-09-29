import express from "express";
import path from "path";
import gameRouter from "./routes/game.js";
import turnP1Router from "./routes/turnP1.js";
import turnP2Router from "./routes/turnP2.js";
import { renderScreen } from "./routes/render.js";

const app = express();

app.use(express.static(path.join(path.resolve(), "public")));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set view engine
app.set("view engine", "ejs");
app.set("views", path.join(path.resolve(), "views"));

// Routes
app.use("/game", gameRouter);
app.use("/turnP1", turnP1Router);
app.use("/turnP2", turnP2Router);

app.get("/", (req, res) => renderScreen(res, null));

// Start server
const port = process.env.PORT || 3010;
app.listen(port, () => console.log(`Listening on port ${port}`));

export default app;