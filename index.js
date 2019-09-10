const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');

//Import route
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/post');

dotenv.config();

//Connect to DB
mongoose.connect(
    process.env.DB_CONNECT,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => { console.log('Connect to DB!') }
);

//Middleware
app.use(express.json());

//Middleware - Router
app.use('/api/user', authRoutes);
app.use('/api/post', postRoutes);

//Server lisen
app.listen(3000, () => console.log("Server Up and Running!"));