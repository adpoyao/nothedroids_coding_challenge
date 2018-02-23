'use strict';

const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
const cors = require('cors');

const { PORT, CLIENT_ORIGIN, DATABASE_URL } = require('./config');
const { router: usersRouter } = require('./users');
const { router: authRouter, localStrategy, jwtStrategy } = require('./auth');

const app = express();

const { dbConnect } = require('./db-mongoose');
const mongoose = require('mongoose');

passport.use(localStrategy);
passport.use(jwtStrategy);

app.use(cors({origin: CLIENT_ORIGIN}));
app.use(bodyParser.json());

const jwtAuth = passport.authenticate('jwt', { session: false });

app.use('/api/users/', usersRouter);
app.use('/api/auth/', authRouter);

let server;
function runServer() {
  return new Promise((resolve, reject) => {
    mongoose.connect(DATABASE_URL, err => {
      console.log(DATABASE_URL);
      if (err) {
        return reject(err);
      }
      server = app
        .listen(PORT, () => {
          console.log(`Your app is listening on port ${PORT}`);
          resolve();
        })
        .on('error', err => {
          mongoose.disconnect();
          reject(err);
        });
    });
  });
}
function closeServer() {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
      console.log('Closing server');
      server.close(err => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  });
}

if (require.main === module) {
  runServer().catch(err => console.error(err));
}

module.exports = { app, runServer, closeServer };