const express = require("express");
const router = express.Router();
const { verifyAccess } = require("../middlewares/AuthMiddleware");

const {createComments, deleteComments, updateComments} = require("../Controllers/commentsContoller");

router.post("/create/:postId", verifyAccess, createComments);
// router.get('/get/:id', verifyAccess ,getAllPosts)
// router.get('/getOne/:id', verifyAccess ,getOnePost)
router.put('/updateOne/:commentId', verifyAccess ,updateComments)
router.delete('/deleteOne/:commentId', verifyAccess, deleteComments)

module.exports = router;
