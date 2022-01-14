const Mongoose = require("mongoose");

const TaskSchema = new Mongoose.Schema(
  {
    title: String,
    description: String,
    assigned_to: {
      type: Mongoose.Types.ObjectId,
      ref: "users",
    },
    due_date: Date,
    statuses: [String],
    section_id: {
      type: Mongoose.Types.ObjectId,
      ref: "section",
    },
    project_id: {
      type: Mongoose.Types.ObjectId,
      ref: "project",
    },
    user_id: {
      type: Mongoose.Types.ObjectId,
      ref: "users",
    },
    order: Number,
    isComplated: Boolean,
    comments: [
      {
        comment: String,
        commented_at: Date,
        user_id: {
          type: Mongoose.Types.ObjectId,
          ref: "users",
        },
      },
    ],
    media: [String],
    sub_tasks: [
      {
        type: Mongoose.Types.ObjectId,
        ref: "task",
      },
    ],
  },
  { timestamps: true, versionKey: false }
);

module.exports = Mongoose.model("task", TaskSchema);
