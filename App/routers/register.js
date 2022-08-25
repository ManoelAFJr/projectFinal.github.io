const express = require('express');
const passport = require('passport');
const User = require('../model/user');

const register = express.Router();

register.get('/register', (req, res)=>{
  res.render('register');
});

register.post('/register', (req, res, next) =>{
  const name = {
    firstName : req.body.firstName,
    lastName : req.body.lastName,
  }; 
  const age = req.body.age;
  const username = req.body.username;
  const blood = req.body.blood;
  const email = req.body.email;
  const password = req.body.password;
  const address = {
    city : req.body.city,
    road : req.body.road,
    district : req.body.district,
    zip : req.body.zip
  };
  
  User.findOne({email: email}, (err, user)=>{
    if (err){
      return next(err);
    }
    if(user){
      req.flash('error', 'User existent!');
      return res.redirect('/register');
    }

    const newUser = new User({
      name : name,
      username: username,
      age : age,
      blood: blood,
      email: email,
      password : password,
      address : address,
    });
    newUser.save(next);
  });
  
  },
  passport.authenticate('login', {
    successRedirect: '/tech',
    failureRedirect: '/register',
    failureFlash: true,
  })
  
);

register.post('/api/register', (req, res, next) =>{
  const name = {
    firstName : req.body.firstName,
    lastName : req.body.lastName,
  }; 
  const age = req.body.age;
  const username = req.body.username;
  const blood = req.body.blood;
  const email = req.body.email;
  const password = req.body.password;
  const address = {
    city : req.body.city,
    road : req.body.road,
    district : req.body.district,
    zip : req.body.zip
  };
  
  User.findOne({email: email}, (err, user)=>{
    if (err){
      return next(err);
    }
    if(user){
      return res.status(401).json(user);
    }

    const newUser = new User({
      name : name,
      username: username,
      blood: blood,
      age : age,
      email: email,
      password : password,
      address : address,
    });
    newUser.save(next);
    return res.json(newUser);
  });
  
  }
);

module.exports = register;