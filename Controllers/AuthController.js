const express = require("express");
const User = require("../Models/userModel");
const CatchAsync = require("../utils/catchAsync");
const AppError = require("./../utils/appError");
const catchAsync = require("../utils/catchAsync");
const Jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userToken = (id) => {
  return Jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const registerUser = catchAsync(async (req, res, next) => {
  const { name, username, email, password } = req.body;

  const emailCheck = await User.findOne({ email: email });
  if (emailCheck) {
    next(new AppError(`Email already Exist.`, 404));
  }
  const usernameCheck = await User.findOne({ username: username });
  if (usernameCheck) {
    next(new AppError(`Username not available`, 404));
  }
  let user = await User.create({
    name: name,
    username: username,
    email: email,
    password: password,
  });
  const token = userToken(user._id);

  res.json({ success: true, message: "Accounts created successfully", token });
});

const loginUser = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError(`Please provide Email and Password`, 404));
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError(`Incorrect Email or Password`, 404));
  }

  const token = userToken(user._id);
  console.log(user);

  res.json({ success: "success", message: "Logged in successfully", token });
});

const forgetPassword = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(
      new AppError("There is no account registered with this email", 404)
    );
  }

  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });
});

const resetPassword = catchAsync(async (req, res, next) => {
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.tokken)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!user) {
    return next(new App("Token Invalid or has expired"));
  }

  user.password = req.body.password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  const token = userToken(user._id);
  console.log(user);

  res.json({ success: "success", message: "Logged in successfully", token });
});

const updatePassword = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  if (!(await user.correctPassword(req.body.currentPassword, user.password))) {
    return next(new AppError("Your current password is wrong", 401));
  }

  console.log(req.body.passwordCurrent, user.password)

  user.password = req.body.password;
  await user.save();

  const token = userToken(user._id);
  console.log(user);

  res.json({ success: "success", message: "Logged in successfully", token });
});

module.exports = { registerUser, loginUser, resetPassword, forgetPassword, updatePassword };
