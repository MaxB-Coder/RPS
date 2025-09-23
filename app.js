import express from "express";
import path from "path";
import bodyParser from "body-parser";
import gameRouter from "./routes/game.js";
import turnP1Router from "./routes/turnP1.js";
import turnP2Router from "./routes/turnP2.js";

const app = express();

app.use(express.static(path.join(path.resolve(), "public")));

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set view engine
app.set("view engine", "ejs");
app.set("views", path.join(path.resolve(), "views"));

// Routes
app.use("/game", gameRouter);
app.use("/turnP1", turnP1Router);
app.use("/turnP2", turnP2Router);

app.get("/", (req, res) => res.render("index"));

// Start server
const port = process.env.PORT || 3010;
app.listen(port, () => console.log(`Listening on port ${port}`));

export default app;