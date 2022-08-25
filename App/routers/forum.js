const express = require('express');
const User = require('../model/user');
const forum = express.Router();


function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated(true)) {
    next();
  } else {
    req.flash('info', 'You must log in to gain access!');
    res.redirect('/');
  }
}
forum.get('/forum', ensureAuthenticated, (req, res, next)=>{
  User.find().sort({createdAt: 'descending'}).exec((err, users)=>{
    if (err){
      return next(err);
    }
    res.render('forum', {users: users});
  });
});

forum.post('/forum',  function (req, res, next) {
  req.user.msg = req.body.message;
  req.user.save(function (err) {
    if (err) {
      next(err);
      return;
    }
    res.redirect('/forum');
  });
});

forum.post('/api/forum',  function (req, res, next) {
  req.user.msg = req.body.message;
  req.user.save(function (err) {
    if (err) {
      next(err);
      return;
    }
    res.status(200).json(message);
  });
});

module.exports =  forum;