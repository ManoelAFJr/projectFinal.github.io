const express = require('express');
const User = require('../model/user');
const profile = express.Router();

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated(true)) {
    next();
  } else {
    req.flash('info', 'You must log in to gain access!');
    res.redirect('/');
  }
}

profile.get('/user', ensureAuthenticated, (req, res, next)=>{
    User.find().sort({createdAt: 'descending'}).exec((err, users)=>{
      if (err){
        return next(err);
      }
      res.render('profiles', {users: users});
    });
});

profile.get('/api/user', (req, res, next)=>{
  User.find().sort({createdAt: 'descending'}).exec((err, users)=>{
    if (err){
      return next(err);
    }
    res.status(200).send(users);
  });
});



module.exports = profile;
