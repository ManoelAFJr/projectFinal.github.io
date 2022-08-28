require('dotenv').config();

const { createClient } = require("redis")

// redis@v4
const redisClient = createClient(
  { legacyMode: true })
redisClient.connect().catch(console.error);

module.exports = redisClient;

/* const redisClient = redis.createClient({
    url:`redis://${process.env.R_USER}:${process.env.R_PASSWORD}`+
    `@${process.env.R_HOST}:${process.env.R_PORT}`});

redisClient.on('connect', (result)=>{
    console.log('Redis Conectado!');
});

(async ()=>{
    await redisClient.connect();
})();
 */
