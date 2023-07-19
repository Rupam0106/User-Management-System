const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please Enter title of the Task"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Please Enter Description of the Product"],
      trim: true,
    },
    productImage: {
      type: String,
      required: [true, "Please Provide Product Image"],
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", productSchema);
