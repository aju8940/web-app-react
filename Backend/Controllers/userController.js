const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../Models/userModels')
require('dotenv').config();
const cloudinary = require('../Utils/utils')


// GET USER 
getUser = asyncHandler(async (req, res) => {
    const { _id, name, email,image } = await User.findById(req.user.id)
     
    res.status(200).json({
        id: _id,
        name,
        email,
        image
    })
})

// POST LOGIN 
postLogin = asyncHandler(async (req, res) => {

    const { email, password } = req.body
    const user = await User.findOne({ email })

    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            status: true,
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user.id)
        })
    } else {
        throw new Error('Invalid Credentials')
    }
})

// POST SIGNUP 
postSignup = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
        res.status(400)
        throw new Error('Please add all fields')
    }

    const userExist = await User.findOne({ email })

    if (userExist) {
        res.status(400)
        throw new Error('User Already exist')
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })

    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user.id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
    res.json({ message: `Register User` })
})

// EDIT USER 
const editUser = async (req, res) => {
    try {
      const id = req.params.id;
      const { name, email, password } = req.body;
  
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      let user = await User.findById(id);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      user.name = name;
      user.email = email;
      user.password = hashedPassword;
  
      const updatedUser = await user.save();
  
      res.json({ message: 'User updated', user: updatedUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

//   UPLOAD IMAGE 
const uploadImage = async(req,res)=>{
    const id = req.params.id
    console.log(id);
    if(!req.file){
        return res.status(401).json({
            status:"failed",
            message:'please upload your image before submit'

        })
    }

    const {url} = await cloudinary.uploader.upload(req.file.path)
    const updatedUser = await User.findByIdAndUpdate(
        id,
        { image : url },
        { new: true }
      );
      console.log(updatedUser);
    
    res.json({
        status:'success',
        message:"Profile updated successfully",
        image:url
    })

}
  
// GENERATE JWT 
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '1d'
    })
}

module.exports = {
    getUser,
    postLogin,
    postSignup,
    editUser,
    uploadImage
}