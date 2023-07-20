const catchAsyncError = require("../middlewares/catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");
const aws = require("../Aws/aws.js");
const {
  HTTP_CREATED,
  HTTP_OK,
  HTTP_BAD_REQUEST,
  HTTP_PAGE_NOT_FOUND,
} = require("../constants/http_status");
const taskModel = require("../models/taskModel");

//create task
exports.createTask = catchAsyncError(async (req, res, next) => {
  let taskType = await aws.uploadFile(req.files[0]);
  const { title, description } = req.body;
  const task = await taskModel.create({
    title,
    description,
    taskType,
    userId: req.user.id,
  });
  res.status(HTTP_CREATED).json({
    success: true,
    task,
  });
});

exports.getAllTask = catchAsyncError(async (req, res, next) => {
  const task = await taskModel.find();
  if (!task) {
    return next(new ErrorHandler("No task Found"), HTTP_PAGE_NOT_FOUND);
  }
  res.status(HTTP_OK).json({
    success: true,
    task,
  });
});
