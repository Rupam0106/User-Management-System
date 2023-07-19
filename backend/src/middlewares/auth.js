const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("./catchAsyncError");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
const { HTTP_UNAUTHORIZED } = require("../constants/http_status");

exports.isAuthenticate = catchAsyncError(async (req, res, next) => {
  const { refreshToken } = req.cookies;
  const accessToken = req.headers["authorization"];
  if (!refreshToken && !accessToken) {
    return next(
      new ErrorHandler(
        "Session Expired please login in Again",
        HTTP_UNAUTHORIZED
      )
    );
  }
  const decodedToken = jwt.verify(refreshToken, process.env.JWT_SECRET);
  req.user = await userModel.findById(decodedToken.id);
  next();
});

exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role: ${req.user.role} is not allowed to access this resouce `,
          HTTP_UNAUTHORIZED
        )
      );
    }

    next();
  };
};
