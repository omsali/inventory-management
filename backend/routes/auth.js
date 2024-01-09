const express = require('express');
const router = express.Router();
const User = require("../models/Users");

const signup = async (req, res) => {
    try {
        const { name, username, password, role } = req.body
        let user = await User.findOne({ userName: username })
        if (user) {
            return res.status(400).json({ 
                success: false,
                message: "User already exists" });
        }

        user = await User.create({
            name: name,
            userName: username,
            password: password,
            role: role
        })

        const authToken = ` ${user._id}${username}`;

        res.json({success: true, authToken});

    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Registration Failed",
            error
        })
    }
}

const login = async (req, res) => {
    try {
        const { username, password } = req.body
        let user = await User.findOne({ userName: username })
        if (!user) {
            return res.status(400).json({ 
                success: false,
                message: "User not found" });
        }

        if( user.password !== password ){
            return res.status(400).json({ 
                success: false,
                message: "Invalid Credentials" });
        }

        const authToken = ` ${user._id}${username}${user.role}`;

        res.json({success: true, authToken});

    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Login Failed",
            error
        })
    }
}

router.route('/login').post(login);
router.route('/signup').post(signup);

module.exports = router;

