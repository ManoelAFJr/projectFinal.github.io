require('dotenv').config();
const neo4j = require('neo4j-driver');

const driver = neo4j.driver(
    `bolt://${process.env.NEO4J_URL}`,
    neo4j.auth.basic(process.env.NEO4J_USER, process.env.NEO4J_PASSWORD)
);
    
console.log('connect Neo4j');
module.exports = driver;