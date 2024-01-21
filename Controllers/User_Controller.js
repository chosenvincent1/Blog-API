const User = require('../Models/User_Model');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


async function createUser(req, res) {
    try {
        const { firstName, lastName, email, password, confirmPassword } = req.body;

        if(!firstName.trim().length > 0 || !lastName.trim().length > 0 || !email.trim().length > 0 || !password.trim().length > 0 || !confirmPassword.trim().length > 0) {
            return res.status(400).json({msg: 'All input fields are required'})
        }

        if(password !== confirmPassword) {
            return res.status(400).json({msg: 'Password and Confirm Password must match'})
        }

        const existingUser = await User.findOne({ email });

        if(existingUser) {
            return res.status(400).json({msg: 'User already exist'})
        }

        const encryptedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: encryptedPassword,
            // confirmPassword,
        });

        await newUser.save();

        res.status(201).json({msg: 'User created successfully', newUser});

    } catch (error) {
        console.error(error)
        res.status(500).json({error: 'An error occured.'})
    }
}


module.exports = {
    createUser,
}