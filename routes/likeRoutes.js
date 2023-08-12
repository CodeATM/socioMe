const express = require("express");
const router = express.Router();
const { verifyAccess } = require("../middlewares/AuthMiddleware");

const {addlikes, removelikes} = require("../Controllers/likesController");

router.post("/addLike/:postId", verifyAccess, addlikes);
router.post("/removeLike/:postId", verifyAccess, removelikes);


module.exports = router; 