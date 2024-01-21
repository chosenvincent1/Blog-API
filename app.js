const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const blogRouter = require('./Route/Blog_Route');
const userRouter = require('./Route/User_Route');

const app = express();
dotenv.config();

app.use(express.json());
app.use('/blog', blogRouter);
app.use('/user', userRouter);

const PORT = process.env.PORT || 7000;
const MongoDB_String = process.env.MongoDB_String;

async function connectMongoDB() {
    try {
        await mongoose.connect(`${MongoDB_String}`);
        console.log('MongoDB Connected Successfully')
    } catch (error) { 
        console.error(error);
    }
}

connectMongoDB();

app.listen(PORT, ()=> {
    console.log(`App Listening on Port ${PORT}`)
});