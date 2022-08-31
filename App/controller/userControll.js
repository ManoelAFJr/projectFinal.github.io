const passport = require('passport');
const User = require('../model/user');
const neo4j = require('../data/neo4j');


//list users get('/user')
const getUsers = async (errCalback) => {
  try {
    const users = await User.find().sort({ createdAt: "descending" });
    return users;
  } catch (err) {
    errCalback(err);
  }
};
//list user get('/users/:username')
const user = async(req, res, next) =>{
	User.findOne({ username: req.params.username }, async (err, user) =>{
		if (err) {
			return next(err);
		}
		if (!user) {
			return next(404);
		}
		const session = neo4j.session();
		const result = await session.run(
				 `MATCH (p:Pessoa {username:"${req.params.username}"})-[r:DOAR]->(p2:Pessoa) RETURN p2.username, r.date`
		);
		const persons =  (result.records || []).map(obj => {
			return {username: obj._fields[0], date: obj._fields[1]}
		}) 
		session.close();
		res.render('profile', { user: user , donors: persons});
	});
}

//register
const singup = (req, res, next) =>{
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
    newUser.save().then(async()=>{
      const session = neo4j.session({ database: 'neo4j' });
      await session.run(`CREATE (p:Pessoa {username:"${req.body.username}"})`);
      await session.close();
      next();
    });
  });
}

//edite update post('/edite')
const edite = (req, res, next) =>{
	const originalName = req.user.username;
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
      if(originalName != req.user.username){
        const session = neo4j.session();
        session.run(`MATCH (p:Pessoa {username: "${originalName}"}) SET p.username = "${req.user.username}"`)
      }
      req.flash('info', 'Upgrade sucess!');
      res.redirect('/tech');
    });
}

const editeUsername = async(req, res, next) =>{
  User.findOne({ username: req.params.username }, async function (err, user) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return next(404);
    }
    const session = neo4j.session();
    const result = await session.run(
         `MATCH (p:Pessoa {username:"${req.params.username}"})-[r:DOOU]->(p2:Pessoa) RETURN p2.username, r.date`
    );
    const persons =  (result.records || []).map(obj => {
      return {username: obj._fields[0], date: obj._fields[1]}
    }) 
    session.close();
    res.render('profile', { user: user , donors: persons});
  });
}

//delet delete post('/delete')
const deleteUser = async (id, email, errCalback) => {
  try {
    return await User.deleteOne({ _id: id, email: email });
  } catch (err) {
    errCalback(err);
  }
};

//criando relacionamento get('/users/:username1/donate/:username2')
const donors = async(req, res, next) =>{
	const session = neo4j.session();
  const result = await session.run(
       `MATCH (p1:Pessoa{username:"${req.params.username1}"})`+
       `OPTIONAL MATCH (p2:Pessoa{username:"${req.params.username2}"})`+
       ` CREATE (p1)-[:DOOU {date:date()}]->(p2) `+
       `RETURN p2`);
   await session.close();
  if(result.summary.counters._stats.relationshipsCreated > 0){
       return res.redirect('/user');
  }else{
   req.flash("error", 'tente novamente mais tarde');
   return res.redirect('/user');
  }
    
}

//login post('/login')
const log = passport.authenticate('login', {
	successRedirect: '/tech',
  failureRedirect: '/login',
  failureFlash: true,
});

//logout get('/logout')
const exit = (req, res) =>{
	req.logout(req.user, err => {
		if(err) return next(err);
		res.redirect("/");
	});
}

//forum post('forum)
const forum = (req, res, next) =>{
	req.user.msg = req.body.message;
  req.user.save(function (err) {
    if (err) {
      next(err);
      return;
    }
    res.redirect('/user/forum');
  });
}


module.exports = { getUsers, user, singup, edite, editeUsername, deleteUser, donors, log, exit, forum };