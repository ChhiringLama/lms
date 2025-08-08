import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/generateToken.js";
import { deleteMediaCD, uploadMediaCD } from "../utils/cloudinary.js";
import upload from "../utils/multer.js";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Input field is not properly filled.",
      });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "User already exists with the given email.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);

    await User.create({ name, email, password: hashedPassword });

    return res.status(201).json({
      success: true,
      message: "Account created successfully.",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to register",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Input field is not properly filled.",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Incorrect Email or Password",
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: "Incorrect Email or Password",
      });
    }

    generateToken(res, user, `Welcome back ${user.name}`);
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to register",
    });
  }
};

export const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logged out succesfull",
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to register",
    });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    //We saved req.id from isAthenticated middleware
    const userId = req.id;
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({
        message: "Profile not found",
        success: false,
      });
    }
    return res.status(200).json({
      success: true,
      user,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to register",
    });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const userId = req.id;
    const { name, bio } = req.body;
    const profilePhoto = req.file;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    // Delete old image if exists
    if (user.photoUrl) {
      const publicID = user.photoUrl.split("/").pop().split(".")[0];
      await deleteMediaCD(publicID);
    }

    // Upload new photo if provided
    let photoUrl = user.photoUrl;
    if (profilePhoto) {
      const cloudRes = await uploadMediaCD(profilePhoto.path);
      photoUrl = cloudRes.secure_url;
    }

    const updatedData = { photoUrl };

    //check if name was changed
    if (name && name.trim() !== "") {
      updatedData.name = name.trim();
    }

    // Only update if bio is non-empty
    if (bio && bio.trim() !== "") {
      updatedData.bio = bio.trim();
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updatedData, {
      new: true,
    }).select("-password");

    return res.status(200).json({
      success: true,
      message: "User updated",
      user: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update profile",
    });
  }
};
