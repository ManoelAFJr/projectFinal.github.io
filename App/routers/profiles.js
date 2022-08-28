const express = require('express');
const userControll = require('../controller/userControll');
const profile = express.Router();
const authentic = require('../controller/authenticate');
const authenticate = authentic;

profile.get('/user', authenticate ,userControll.users);


module.exports = profile;
