const express = require('express');
const app=express();
const dotenv = require('dotenv');
const cors = require('cors');

const corsOptions = {
    exposedHeaders: 'authtoken',
  }; 

dotenv.config();
const mongoose = require('mongoose');
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');

mongoose.connect(process.env.DB_CONNECT,()=>console.log('connected'));

app.use(express.json());
app.use(cors(corsOptions));
app.use('/api/user',authRoute);
app.use('/api/posts',postRoute);

app.listen(8080,()=>console.log('runn'));