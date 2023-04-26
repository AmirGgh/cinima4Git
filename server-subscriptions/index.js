const express = require('express');
const cors = require('cors');
const connectDB = require('./configs/db');

const moviesRouter = require('./routers/moviesRouter');
const membersRouter = require('./routers/membersRouter');
const subscriptionsRouter = require('./routers/subscriptionsRouter');
const { firstServerRun } = require('./firstRun/firstServerRun');

const app = express();
const port = 8080;

connectDB();
firstServerRun();
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8000');
  next();
});

app.use('/movies', moviesRouter);
app.use('/members', membersRouter);
app.use('/subscriptions', subscriptionsRouter);

app.listen(port, () => {
  console.log(`app is listening at http://localhost:${port}`);
});
