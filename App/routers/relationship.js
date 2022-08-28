const express = require('express');
const neo4j = require('../data/neo4j');
const relationships = express.Router();

relationships.get('/users/:username1/donate/:username2', async(req, res, next) =>{
    const session = neo4j.session();
    const result = await session.run(
         `MATCH (p1:Pessoa{username:"${req.params.username1}"})`+
         `OPTIONAL MATCH (p2:Pessoa{username:"${req.params.username2}"})`+
         ` MERGE (p1)-[:DOAR {date:date()}]->(p2) `+
         `RETURN p2`);
     await session.close();
    if(result.summary.counters._stats.relationshipsCreated > 0){
         return res.redirect('/user');
    }else{
     res.flash("error", 'tente novamente mais tarde');
     return res.redirect('/user');
    }
    
});


module.exports = relationships;