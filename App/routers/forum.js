const express = require('express');
const userControll = require('../controller/userControll');
const forum = express.Router();

const authentic = require('../controller/authenticate');
const authenticate = authentic;

forum.get("/user/forum", authenticate, async (req, res, next) => {
    const users = await userControll.getUsers(next);
    res.render("forum", { users: users });
  });
  

forum.post('/user/forum', authenticate, userControll.forum);


module.exports =  forum;