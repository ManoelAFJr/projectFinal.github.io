const express = require('express');
const apiControll = require('../controller/apiControll');
const apiSwagger = express.Router();

apiSwagger.post('/api/login', apiControll.apiLogin);

apiSwagger.get('/api/user/:username', apiControll.apiUserUsername);
apiSwagger.get('/api/user', apiControll.listUser);

apiSwagger.post('/api/register', apiControll.apiRegister);
apiSwagger.post('/api/delete/:email', apiControll.apiDelete);
apiSwagger.post('/api/delete/:_id', apiControll.apiDeleteId);
apiSwagger.post('/api/edite', apiControll.apiEdite);
apiSwagger.post('/api/forum', apiControll.apiForum);

module.exports = apiSwagger;