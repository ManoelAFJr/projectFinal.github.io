const express = require('express');
const tech = express.Router();

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated(true)) {
    next();
  } else {
    req.flash('info', 'You must log in to gain access!');
    res.redirect('/');
  }
}
tech.get('/tech', ensureAuthenticated,function (req, res, next) {
  res.render('tech');
});


module.exports =  tech;