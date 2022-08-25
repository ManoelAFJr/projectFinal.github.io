const express = require('express');
const User = require('../model/user');
const index = express.Router();

index.get('/', function (req, res, next) {
  res.render('index');
});

module.exports =  index;