const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
require('dotenv').config();
const User = require('../Models/userModels')

// GET ADMIN 
const adminHome = async (req, res) => {
    const users = await User.find({})
    res.json({ users })
}


// POST LOGIN 
const postLogin = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    if (email == 'admin@gmail.com' && password == '123') {
        const id = Math.random() * 100
        res.json({
            _id: Math.random() * 100,
            email: "admin@gmail.com",
            token: generateToken(id)
        })
    } else {
        res.status(401).json({ message: "Invalid Credentials" })
    }
})


// DELETE USER 
const deleteUser = async (req, res) => {
    let user = await User.deleteOne({ _id: req.params.id })
    res.json({ message: 'user deleted', user })
}

// EDIT USER 
const editUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email } = req.body;
        let user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        user.name = name;
        user.email = email;

        const updatedUser = await user.save();

        res.json({ message: 'User updated', user: updatedUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}


// GENERATE JWT 
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '1d'
    })
}


module.exports = {
    postLogin,
    adminHome,
    deleteUser,
    editUser
}