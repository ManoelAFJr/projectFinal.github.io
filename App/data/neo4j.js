require('dotenv').config();
const neo4j = require('neo4j-driver');

const driver = neo4j.driver(
    `${process.env.NEO4JCLOUD_URL}`,
     neo4j.auth.basic(process.env.NEO4JCLOUD_USER, process.env.NEO4JCLOUD_PASSWORD)
);
    
console.log('connect Neo4j');
module.exports = driver;