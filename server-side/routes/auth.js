const router = require('express').Router();
const bcrypt = require('bcryptjs/dist/bcrypt');
const User = require('../model/User');
const Validation = require('../validation');
const jwt = require('jsonwebtoken');

router.post('/register',async (req,res)=>{
   const {error} = Validation.registerValidation(req.body);
   if(error) return res.status(400).send(error.details[0].message);

   const emailExist = await User.findOne({email :req.body.email});
   if(emailExist) return res.status(400).send('Email exists');

   const salt = await bcrypt.genSalt(10);
   const hashPassword = await bcrypt.hash(req.body.password,salt);

  const user = new User({
      name:req.body.name,
      email:req.body.email,
      password:hashPassword,
  })
  try{
    const savedUser = await user.save();
    res.send(savedUser);
  }
  catch(err){
      res.status(400).send(err);
   }
});

router.post('/login', async (req,res)=>{
  console.log(JSON.stringify(req.body));
    const {error} = Validation.loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({email :req.body.email});
   if(!user) return res.status(400).send('Email doesn`t exist');

   const validPass = await bcrypt.compare(req.body.password,user.password)
   if(!validPass) return res.status(400).send('Wrong Password');

   const token = jwt.sign({_id:user._id},process.env.SECRET)
   res.header('authtoken',token).send(token);
});

module.exports= router;