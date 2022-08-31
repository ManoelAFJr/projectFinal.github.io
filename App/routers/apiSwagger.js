const express = require('express');
const apiControll = require('../controller/apiControll');
const apiSwagger = express.Router();


apiSwagger.get('/api/user/:username', apiControll.apiUserUsername);
apiSwagger.get('/api/user', apiControll.listUser);


apiSwagger.post('/api/delete/:email', apiControll.apiDelete);


module.exports = apiSwagger;