const express = require('express');
const authentic = require('../controller/authenticate');
const userControll = require('../controller/userControll');
const delet = express.Router();

const authenticate = authentic;

delet.get("/delete", authenticate, function (req, res) {
  res.render("delete");
}); 

delet.post("/delete", authenticate, userControll.delet);

module.exports = delet;