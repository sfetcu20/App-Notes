const { send } = require('express/lib/response');
const jwt =require('jsonwebtoken');

module.exports = function(req,res,next){
    const token = req.header('authtoken');
    console.log(token);
    if(!token) return res.status(401).send('acces denied');

    try{
    const ver = jwt.verify(token,process.env.SECRET);
    req.user = ver;
    console.log(jwt.verify(token,process.env.SECRET));
    console.log(req.user);
    //send(req.user);
    next();
    }
    catch(err){
       res.status(400).send('invalid token');
  }
}