const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: 100,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      maxlength: 1000,
    },

    status: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true } 
);

module.exports= mongoose.model("Task", taskSchema);
