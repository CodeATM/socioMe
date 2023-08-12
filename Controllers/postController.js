const User = require("./../Models/userModel");
const Post = require("../Models/postModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

const addPost = catchAsync(async (req, res, next) => {
  const { title, body } = req.body;

  let post = await Post.create({
    title: title,
    body: body,
    user: req.user.id,
  });

  if(!post) {
    return next(new AppError('Cannot add post now'))
  }

  res.json({ success: true, message: "Post created successfully" });
});

const getAllPosts = catchAsync(async (req, res, next) => {
  const posts = await Post.find({ user: req.params.id });

  if (posts) {
    return res.status(200).json(posts);
  } else {
    return next(new AppError("Could not get all post at this moment", 500));
  }
});

const getOnePost = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  console.log(post);

  if (post) {
    return res.status(200).json({ post });
  } else {
    return next(new AppError("Could not get this post at this moment", 500));
  }
});

const updatePost = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  if (post.user.toString() === req.user.id.toString()) {
    const updatedpost = await Post.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    return res.status(200).json(updatedpost);
  } else {
    return next(new AppError("you cannot update this post"));
  }
});

const deletePost = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return next(new AppError("This post doesn't Exist", 404));
  } else if (post.user.toString() !== req.user.id.toString()) {
    return next(new AppError("This post doesn't Exist", 404));
  } else {
    await Post.findByIdAndDelete(req.user.id)
    return res.status(200).json({ success: true, message: "Post Deleted successfully"})
  }
});



module.exports = { addPost, getAllPosts, getOnePost, updatePost, deletePost};
