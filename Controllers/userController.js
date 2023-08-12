const express = require("express");
const User = require("../Models/userModel");
const CatchAsync = require("../utils/catchAsync");
const AppError = require("./../utils/appError");
const catchAsync = require("../utils/catchAsync");
const Jwt = require("jsonwebtoken");
const crypto = require("crypto");

const getFollowers = CatchAsync(async (req, res, next) => {
    const user = await User.findById(req.user.id)

    const followers = await user.followers

    res.status(200).json(followers)
});

const handleFollow = CatchAsync(async (req, res, next) => {
  const { username } = req.body;

  const user = await User.findById(req.user.id);
  const follower = await User.findOne({ username: username });

  if (!follower) {
    return next(new AppError("Cannot find use with this username", 404));
  }

  const checkifFollowed = await user.followers.includes(follower.id);
  if (!checkifFollowed) {
    await user.followers.push(follower.id);
    await user.save();
  } else {
    await user.followers.pop(follower.id);
    await user.save();
  }

  res.json(user.followers);
});

const updateUserData = CatchAsync(async (req, res, next) => {
  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    { $set: req.body },
    { new: true }
  );
  if (!updatedUser) {
    return next(new AppError("Unable to update user now"));
  }
  res.json(updatedUser);
});

module.exports = { updateUserData, handleFollow, getFollowers };
