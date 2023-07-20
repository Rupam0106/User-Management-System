const catchAsyncError = require("../middlewares/catchAsyncError");
const userModel = require("../models/userModel");
const ErrorHandler = require("../utils/errorHandler");
const sendToken = require("../utils/jwtToken");
const aws = require("../Aws/aws.js");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const {
  HTTP_UNAUTHORIZED,
  HTTP_BAD_REQUEST,
  HTTP_CREATED,
  HTTP_OK,
  HTTP_PAGE_NOT_FOUND,
} = require("../constants/http_status");
const taskModel = require("../models/taskModel");

//register User
exports.registerUser = catchAsyncError(async (req, res, next) => {
  let avatar = await aws.uploadFile(req.files[0]);

  const { name, email, password, role } = req.body;

  const user = await userModel.create({
    name,
    email,
    password,
    avatar,
    role,
  });

  sendToken(user, HTTP_CREATED, res);
});

// Login User
exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  // checking if user has given password and email both
  if (!email || !password) {
    return next(
      new ErrorHandler("Please Enter Email & Password", HTTP_BAD_REQUEST)
    );
  }

  const user = await userModel.findOne({ email }).select("+password");

  if (!user) {
    return next(
      new ErrorHandler("Invalid email or password", HTTP_UNAUTHORIZED)
    );
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(
      new ErrorHandler("Invalid email or password", HTTP_UNAUTHORIZED)
    );
  }
  sendToken(user, HTTP_OK, res);
});

//logout
exports.logoutUser = catchAsyncError(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(new Date().getTime()),
    httpOnly: true,
  });

  res.status(HTTP_OK).json({
    sucess: true,
    message: "Logged Out Successfully",
  });
});

//forgot password
exports.forgotPassword = catchAsyncError(async (req, res, next) => {
  const user = await userModel.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler("User not found", HTTP_PAGE_NOT_FOUND));
  }

  // Get ResetPassword Token
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/user/password/reset/${resetToken}`;

  const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;

  try {
    await sendEmail({
      email: user.email,
      subject: `Ecommerce Password Recovery`,
      message,
    });

    res.status(HTTP_OK).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorHandler(error.message, HTTP));
  }
});

// Reset Password
exports.resetPassword = catchAsyncError(async (req, res, next) => {
  // creating token hash
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await userModel.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHandler(
        "Reset Password Token is invalid or has been expired",
        HTTP_BAD_REQUEST
      )
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(
      new ErrorHandler("Password does not matched", HTTP_UNAUTHORIZED)
    );
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendToken(user, HTTP_OK, res);
});

// get user details
exports.getUserDetails = catchAsyncError(async (req, res) => {
  const task = await taskModel
    .findOne({ userId: req.user.id })
    .populate("userId");
  res.status(HTTP_OK).json({
    success: true,
    task,
  });
});

// update User password
exports.updatePassword = catchAsyncError(async (req, res, next) => {
  const user = await userModel.findById(req.user.id).select("+password");
  if (!user) {
    return next(new ErrorHandler(`User Already Deleted `, HTTP_BAD_REQUEST));
  }
  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

  if (!isPasswordMatched) {
    return next(
      new ErrorHandler("Old password is incorrect", HTTP_BAD_REQUEST)
    );
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHandler("password does not match", HTTP_BAD_REQUEST));
  }

  user.password = req.body.newPassword;

  await user.save();

  sendToken(user, HTTP_OK, res);
});

// Delete User
exports.deleteUser = catchAsyncError(async (req, res, next) => {
  const user = await userModel.findByIdAndDelete(req.user.id);

  if (!user) {
    return next(
      new ErrorHandler(
        `User does not exist with Id: ${req.user.id}`,
        HTTP_BAD_REQUEST
      )
    );
  }

  res.status(HTTP_OK).json({
    success: true,
    message: "User Deleted Successfully",
  });
});

//generated refresh token
exports.refreshToken = catchAsyncError(async (req, res, next) => {
  const refreshToken = req.cookies["refreshToken"];
  if (!refreshToken) {
    return res
      .status(HTTP_UNAUTHORIZED)
      .send("Access Denied. No refresh token provided.");
  }
  const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
  const accessToken = jwt.sign({ id: decoded.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
  res.header("Authorization", accessToken).json({
    success: true,
    message: "New Access token generated Successfully",
  });
});
