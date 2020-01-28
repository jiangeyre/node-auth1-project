const bcrypt = require('bcryptjs');

const Users = require('../users/users-model.js');

module.exports = (req, res, next) => {
    console.log('session', req.session);
  
    if (req.session && req.session.loggedIn) {
      next();
    } else {
      res.status(401).json({ you: "shall not pass!" });
    }
};