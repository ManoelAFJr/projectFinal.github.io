const { json } = require('body-parser');
const express = require('express');
const { error } = require('express-openapi-validator');
const passport = require('passport');
const User = require('../model/user');

const methodSwagger = express.Router();

methodSwagger.post(
  '/api/login',(req, res)=>{
    passport.authenticate('login',{
      successRedirect: res.status(200).json('sucess'),
      failureRedirect: res.status(400).json('error')
    })
  }
);

methodSwagger.get('/api/user/:username', async(req, res, next)=>{
    const pessoa = await User.find({username: req.params.username});
    if(pessoa.length > 0){
        res.status(200).send(pessoa)
    }else{
        res.status(400).json('Usuario nao encontrada');
   }
});

module.exports = methodSwagger;