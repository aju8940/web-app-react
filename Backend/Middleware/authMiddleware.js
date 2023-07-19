const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../Models/userModels')


const protect = asyncHandler(async (req, res, next) => {
    let token

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {

        try {
            // Get TOken from HEADER 
            token = req.headers.authorization.split(' ')[1]

            // VErify Token 
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            // GEt USer from token 
            req.user = await User.findById(decoded.id).select('-password')

            next()
        } catch (error) {
            console.log(error);
            res.status(401)
            throw new Error('Not Authorized')
        }
    }

    if (!token) {
        res.status(401)
        throw new Error('Not Authorized , NO token')
    }
})

module.exports = { protect }