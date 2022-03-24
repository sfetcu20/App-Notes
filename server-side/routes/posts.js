const router = require('express').Router();
const verify = require('./verifyToken');
router.get('/hasToken',verify,(req,res)=>{
    res.json({
        posts:{
            message: 'validated',
            description: 'rrandom'
        }
    });
});


module.exports= router;