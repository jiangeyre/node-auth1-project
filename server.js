const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const usersRouter = require('./users/user-router');

const server = express();

server.use(helmet());
server.use(logger);
server.use(express.json());
server.use(cors());

server.use('/', usersRouter);

router.get('/', (req, res) => {
  res.status(200).send('<h1>Hello heck wow it me!</h1>');
})

function logger(req, res, next) {
  console.log(req.method, req.url, Date.now())
  
  next();
};

module.exports = server; 