const express = require('express')
const router = express.Router()
const { verifyAccess } = require("../middlewares/AuthMiddleware");

const {registerUser, loginUser, resetPassword, forgetPassword,  updatePassword} = require('../Controllers/AuthController')
const {updateUserData, handleFollow, getFollowers,} = require('../Controllers/userController')

//Authentication Routes
router.post('/register', registerUser) 
router.post('/login', loginUser)
router.post('/forgetPassword', forgetPassword) 
router.post('/resetPassword/:token', resetPassword)
router.post('/updatePassword',verifyAccess, updatePassword)


//User Routes
router.put('/updateUser', verifyAccess, updateUserData)
router.post('/follow', verifyAccess, handleFollow) 
router.get('/getFollowers', verifyAccess, getFollowers) 


module.exports = router 