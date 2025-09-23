import express from "express";
import path from "path";
import { fileURLToPath } from "url";

// __dirname replacement in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware & config
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

// TODO: import your routes here, e.g.
// import gameRoutes from "./routes/game.js";
import indexRouter from './routes/index.js';
import gameRouter from './routes/game.js';
import turnP1Router from './routes/turnP1.js';
import turnP2Router from './routes/turnP2.js';

// Use routes
app.use('/', indexRouter);
app.use('/game', gameRouter);
app.use('/turnP1', turnP1Router);
app.use('/turnP2', turnP2Router);

// Export app for Vercel
export default app;

// Only listen locally (Vercel handles serving the exported app)
if (process.env.NODE_ENV !== "production") {
  const port = process.env.PORT || 3010;
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
}