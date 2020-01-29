const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session);

const dbConn = require('../database/dbConfig');

const authRouter = require('../auth/auth-router');
const usersRouter = require('../users/user-router');

const server = express();

const sessionConfig = {
  name: 'darksideCookies',
  secret: process.env.SESSION_SECRET || "snitches get stitches",
  cookie: {
    maxAge: 1000 * 60 * 10,
    secure: false,
    httpOnly: true,
  },
  resave: false,
  saveUninitialized: true,
  store: new KnexSessionStore({
    knex: dbConn,
    tableName: "sessions",
    sidfieldname: "sid",
    createtable: true,
    clearInterval: 60000,
  }),
};

server.use(helmet());
server.use(session(sessionConfig));
server.use(logger);
server.use(express.json());
server.use(cors());

server.use('/api/auth', authRouter);
server.use('/api/users', usersRouter);

server.get('/', (req, res) => {
  res.status(200).send('<h1>Hello heck wow it me!</h1>');
})

function logger(req, res, next) {
  console.log(req.method, req.url, Date.now())
  
  next();
};

module.exports = server; 