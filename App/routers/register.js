const express = require('express');
const userControll = require('../controller/userControll')

const register = express.Router();

register.get('/register', (req, res, next)=>{
  res.render('register');
});

register.post('/register', userControll.singup, userControll.log);

module.exports = register;