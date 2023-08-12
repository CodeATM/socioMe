const User = require("./../Models/userModel");
const Comment = require("./../Models/commentsModel");
const Post = require("./../Models/postModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

const createComments = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  const createComment = await Comment.create({
    ...req.body,
    user: req.user.id,
    post: req.params.postId,
  });

  const post = await Post.findById(req.params.postId);
  const add = await post.comments.push(createComment._id);
  post.save();

  if (add) {
    const comments = await Comment.find({ post: createComment.post });
    console.log(comments);
    res.status(200).json(createComment);
  } else {
    return next(new AppError("Unable to add comment now"));
  }
});

const updateComments = catchAsync(async (req, res, next) => {
  const comment = await Comment.findById(req.params.commentId);
  if (!comment) {
    return next(new AppError("there is no comments with this ID"));
  }

  if (comment.user.toString() === req.user.id.toString()) {
    const updatedpost = await Post.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    return res.status(200).json(updatedpost);
  } else {
    return next(new AppError("You can only update your post"));
  }
});

const deleteComments = catchAsync(async (req, res, next) => {
  const comment = await Comment.findById(req.params.commentId);

  if (comment.user.toString() === req.user.id) {
    await Comment.findByIdAndDelete(req.params.commentId);
    return res.status(200).json({ msg: "Comment deleted succesfully" });
  } else {
    return next(new AppError("You cannot delete this comment "));
  }
});

module.exports = { createComments, deleteComments, updateComments };
