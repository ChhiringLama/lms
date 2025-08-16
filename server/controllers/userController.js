import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/generateToken.js";
import { deleteMediaCD, uploadMediaCD } from "../utils/cloudinary.js";

export const getActivity = async (req, res) => {
  try {
    const userId = req.id;
    const { activities } = await User.findById(userId).select("activities");
  
    if (!activities || activities.length <= 0) {
      return res.status(200).json({
        message: "No activity found",
      })
    }

    return res.status(200).json({
     activities
    })

  } catch (error) {
    return res.status(400).json({
      message: error || "An error occured"
    })
  }
}

export const createActivity = async (req, res) => {
  try {
    const { action, actionDes = "No Description" } = req.body;
    const userId = req.id; // middleware sets this

    // push activity into user model
    await User.findByIdAndUpdate(userId, {
      $push: {
        activities: {
          $each: [{ action, actionDes, createdAt: new Date() }],
          $position: 0, // push at the beginning (optional)
          $slice: 5     // keep only the latest 5 items
        },
      },
    });
    return res.status(201).json({ message: "Activity logged successfully" });

  } catch (error) {
    return res.status(400).json({
      message: error || "An error occured"
    })
  }
}


export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check for missing fields
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Input field is not properly filled.",
      });
    }

    // Email format validation
    if (!/\S+@\S+\.\S+/.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format.",
      });
    }

    // Password length check
    if (password.length < 4) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 4 characters long.",
      });
    }

    // Check if user already exists
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "User already exists with the given email.",
      });
    }

    // Hash password and create user
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ name, email, password: hashedPassword });

    return res.status(201).json({
      success: true,
      message: "Account created successfully.",
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message || "Failed to register",
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
