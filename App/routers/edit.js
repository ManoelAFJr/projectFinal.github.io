const express = require("express");
const edit = express.Router();
const User = require('../model/user');


function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated(true)) {
    next();
  } else {
    req.flash('info', 'You must log in to gain access!');
    res.redirect('/');
  }
}

edit.get('/users/:username', ensureAuthenticated, function (req, res, next) {
    User.findOne({ username: req.params.username }, function (err, user) {
      if (err) {
        return next(err);
      }
      if (!user) {
        return next(404);
      }
      res.render('profile', { user: user });
    });
  });
  
  edit.get('/edite', ensureAuthenticated, function (req, res) {
    res.render('edit');
  });

  edit.post('/api/edite', async (req, res) =>{
    const email = req.body.email;
    const age = req.body.age;
    const username = req.body.username;
    const address = {
      city : req.body.city,
      road : req.body.road,
      district : req.body.district,
      zip : req.body.zip
    }
    const result =  await User.updateOne({email: email}, 
      {$set:{username:username, age:age, address:address }}, {upsert:true});
      if(result.modifiedCount > 0){
        res.status(200).json();
      }
      res.status(400).json();
    });
   
  edit.post('/edite', ensureAuthenticated, function (req, res, next) {
    req.user.username = req.body.username;
    req.user.age = req.body.age;
    req.user.address = {
      city : req.body.city,
      road : req.body.road,
      district : req.body.district,
      zip : req.body.zip
    }
    req.user.save(function (err) {
      if (err) {
        next(err);
        return;
      }
      req.flash('info', 'Upgrade sucess!');
      res.redirect('/tech');
    });
  });

 
  module.exports = edit;