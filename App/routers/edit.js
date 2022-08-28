const express = require("express");
const userControll = require('../controller/userControll');
const edit = express.Router();
const authentic = require('../controller/authenticate');
const authenticate = authentic;


edit.get('/edite', authenticate, (req, res) =>{
  res.render('edit');
});

edit.get('/users/:username', authenticate, userControll.editeUsername)
 
edit.post('/edite', authenticate, userControll.edite);
  

module.exports = edit;