const { json } = require("body-parser");
const { error } = require("express-openapi-validator");
const User = require("../model/user");


//apiUserUsername get('/api/user/:username')
const apiUserUsername = async (req, res, next) => {
  const pessoa = await User.find({ username: req.params.username });
  if (pessoa.length > 0) {
    res.status(200).send(pessoa);
  } else {
    res.status(400).json("Usuario nao encontrada");
  }
};

//delet.post('/api/delete/:email)
const apiDelete = (req, res, next) => {
  const email = req.params.email;
  User.deleteOne({ email: email }, (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return next(404);
    }
    res.status(200).json("deu certo");
  });
};

//edit.post('/api/edite')
const apiEdite = async (req, res) => {
  const email = req.body.email;
  const age = req.body.age;
  const username = req.body.username;
  const address = {
    city: req.body.city,
    road: req.body.road,
    district: req.body.district,
    zip: req.body.zip,
  };
  const result = await User.updateOne(
    { email: email },
    { $set: { username: username, age: age, address: address } },
    { upsert: true }
  );
  if (result.modifiedCount > 0) {
    res.status(200).json();
  }
  res.status(400).json();
};

//forum.post('/api/forum')
const apiForum = (req, res, next) => {
  req.user.msg = req.body.message;
  req.user.save((err) => {
    if (err) {
      next(err);
      return;
    }
    res.status(200).json(message);
  });
};

//login.get("/api/logout")
const apiExit = (req, res, next) => {
  req.logout(req.user, (err) => {
    if (err) return next(err);
    res.status(200).json("logout");
  });
};

//profile.get('/api/user')
const listUser = (req, res, next) => {
  User.find()
    .sort({ createdAt: "descending" })
    .exec((err, users) => {
      if (err) {
        return next(err);
      }
      res.status(200).send(users);
    });
};

//register.post('/api/register')
const apiRegister = (req, res, next) => {
  const name = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  };
  const age = req.body.age;
  const username = req.body.username;
  const blood = req.body.blood;
  const email = req.body.email;
  const password = req.body.password;
  const address = {
    city: req.body.city,
    road: req.body.road,
    district: req.body.district,
    zip: req.body.zip,
  };

  User.findOne({ email: email }, (err, user) => {
    if (err) {
      return next(err);
    }
    if (user) {
      return res.status(401).json(user);
    }

    const newUser = new User({
      name: name,
      username: username,
      blood: blood,
      age: age,
      email: email,
      password: password,
      address: address,
    });
    newUser.save(next);
    return res.json(newUser);
  });
};

module.exports = {
  apiDelete,
  apiEdite,
  apiForum,
  apiUserUsername,
  apiExit,
  listUser,
  apiRegister,
};
