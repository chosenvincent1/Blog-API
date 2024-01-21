const express = require('express');
const {
    createUser
} = require('../Controllers/User_Controller')


const userRouter = express.Router();

userRouter.post('/signup', createUser);


module.exports = userRouter;