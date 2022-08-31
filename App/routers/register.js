const express = require('express');
const userControll = require('../controller/userControll')
const apiControll = require('../controller/apiControll');

const register = express.Router();

register.get('/register', (req, res, next)=>{
  res.render('register');
});

register.post('/register', userControll.singup, userControll.log);
register.post('/api/register', apiControll.apiRegister);

module.exports = register;