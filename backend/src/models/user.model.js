import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "User name is required"],
      trim: true,
    },

    email: {
      type: String,
      required: [true, "User email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/\S+@\S+\.\S+/, "Please fill a valid email address"],
    },

    password: {
      type: String,
      required: [true, "User password is required"],
      trim: true,
      minLength: 6,
    },

    // add history later
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);

export default User;
