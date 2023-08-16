import express, { urlencoded } from 'express';
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(urlencoded({ extended: true }));

import indexRouter from './routes/index.js';
import gameRouter from './routes/game.js';
import turnP1Router from './routes/turnP1.js';
import turnP2Router from './routes/turnP2.js';

app.use('/', indexRouter);
app.use('/game', gameRouter);
app.use('/turnP1', turnP1Router);
app.use('/turnP2', turnP2Router);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});

export default app;