const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const jwt = require("jsonwebtoken");
const User = require("../Models/userModel");

exports.verifyAccess = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET)
  // console.log(decoded)
  req.user = await User.findById(decoded.id)
  // console.log(req.user)

  // console.log(token);

  if (!token) {
    return next(new AppError("You are not Logged in ", 401));
  }
  next()
});
