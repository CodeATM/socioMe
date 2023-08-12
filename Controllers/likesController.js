const User = require("./../Models/userModel");
const Comment = require("./../Models/commentsModel");
const Post = require("./../Models/postModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

const addlikes = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  const checkIfLiked = await post.likes.includes(user._id);
  const post = await Post.findById(req.params.postId);

  if (checkIfLiked) {
    return next(new AppError("You have alreaady like this post", 404));
  } else {
    await post.likes.push(user._id);
    post.save();
    res.status(200).json({ msg: "like added" });
  }
});

const removelikes = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  const post = await Post.findById(req.params.postId);

  const checkIfLiked = await post.likes.includes(user._id);
  if (checkIfLiked) {
    await post.likes.pop(user._id);
    post.save();
    res.status(200).json({ msg: "like removed" });
  } else {
    return next(new AppError("You have not like this post", 404));
  }
});

module.exports = { addlikes, removelikes };
