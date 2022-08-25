const redis = require("redis");
require('dotenv').config();

const redisClient = redis.createClient({
    url:`redis://${process.env.R_USER}:${process.env.R_PASSWORD}`+
    `@${process.env.R_HOST}:${process.env.R_PORT}`});

redisClient.on('connect', (result)=>{
    console.log('Redis Conectado!');
});

(async ()=>{
    await redisClient.connect();
})();

module.exports = redisClient;