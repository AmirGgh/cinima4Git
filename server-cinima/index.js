const express = require('express');
const cors = require('cors');
const connectDB = require('./configs/db');

const usersRouter = require('./routers/usersRouter');
const jsonDataRouter = require('./routers/jsonDataRouter');
const jsonPremiRouter = require('./routers/jsonPremissionsRouter');
const moviesRouter = require('./routers/moviesRouter');
const membersRouter = require('./routers/membersRouter');
const subscriptionsRouter = require('./routers/subscriptionsRouter');
const authController = require('./controllers/authControllers');
const { defineAdmin } = require('./BLL/usersBLL');

const app = express();
const port = 8000;

connectDB();

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  next();
});
defineAdmin()
// routers
app.use('/auth', authController);
app.use('/users', usersRouter);
app.use('/jsonPremi', jsonPremiRouter);
app.use('/jsonData', jsonDataRouter);

//web serves - subsriptions
app.use('/movies', moviesRouter);
app.use('/members', membersRouter);
app.use('/subscriptions', subscriptionsRouter);

app.listen(port, () => {
  console.log(`app is listening at http://localhost:${port}`);
});
