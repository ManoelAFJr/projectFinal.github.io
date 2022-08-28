const express = require('express');
const userControll = require('../controller/userControll')
const relationships = express.Router();

relationships.get('/users/:username1/donate/:username2', userControll.donors )

module.exports = relationships;