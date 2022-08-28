const express = require('express');
const userControll = require('../controller/userControll');
const apiControll = require('../controller/apiControll')
const login = express.Router();

login.get('/login', function (req, res) {
    res.render('login');
  });
  
login.post('/login', userControll.log);

login.get("/logout", userControll.exit);
login.get("/api/logout", apiControll.apiExit);

module.exports = login ;