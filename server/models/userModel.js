import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Username is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    password: {
      type: String,
      required: [true, "Email is required"],
    },
    role: {
      type: String,
      enum: ["instructor", "student"],
      default: "student",
    },
    bio: {
      type: String,
      validate: {
        validator: function (v) {
          const wordCount = v?.trim().split(/\s+/).length;
          return wordCount <= 150;
        },
        message: "Bio must not exceed 150 words.",
      },
    },
    enrolledCourses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
    photoUrl: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
