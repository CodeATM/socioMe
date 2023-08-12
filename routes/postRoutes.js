const express = require('express')
const router = express.Router()
const { verifyAccess } = require('../middlewares/AuthMiddleware')

const { addPost, getAllPosts, getOnePost, updatePost, deletePost} = require('../Controllers/postController')

router.post('/create', verifyAccess, addPost)
router.get('/get/:id', verifyAccess ,getAllPosts)
router.get('/getOne/:id', verifyAccess ,getOnePost)
router.put('/updateOne/:id', verifyAccess ,updatePost)
router.delete('/deleteOne/:id', verifyAccess ,deletePost)

module.exports = router