const { json } = require('body-parser');
const express = require('express');
const User = require('../model/user');
const delet = express.Router();

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    req.flash('info', 'You must log in to gain access!');
    res.redirect('/');
  }
}

delet.post('/delete/:email', (req, res, next)=>{
    const email = req.params.email;
    User.deleteOne({ email : email}, (err, user)=>{
      if(err){
        return next(err);
      } 
      if(!user){
        return next(404);
      }
     /*  res.status(200).send('deu certo'); */
      res.render('/', {user: user});
    });
});
delet.post('/api/delete/:email', (req, res, next)=>{
  const email = req.params.email;
  User.deleteOne({ email : email}, (err, user)=>{
    if(err){
      return next(err);
    } 
    if(!user){
      return next(404);
    }
    res.status(200).json('deu certo');
  });
});

delet.get("/delete", ensureAuthenticated, function (req, res) {
  res.render("delete");
}); 

delet.post('/api/delete/:_id', (req, res, next)=>{
  const id = req.params._id;
  User.deleteOne({ id : id}, (err, user)=>{
    if(err){
      return next(err);
    } 
    if(!user){
      return next(404);
    }
    res.status(200).json('deu certo');
  });
});

delet.post("/delete", ensureAuthenticated, 
function(req, res, next){
  const email = req.body.email;
  const id = req.body._id;
 
   User.deleteOne({email: email, id: id}, function(err){
     if(err){
       next(err);
       return
     }
     if(User){
       req.flash("error", "User not found");
       return res.redirect("/delete");
     }
      return res.redirect("/");
   })
  }
)

module.exports = delet;