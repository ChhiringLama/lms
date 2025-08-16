import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
  register,
  login,
  updateUserProfile,
  logout,
  getUserProfile,
  createActivity,
  getActivity,
} from "../controllers/userController.js";
 import upload from "../utils/multer.js";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/profile").get(isAuthenticated, getUserProfile);
router.route("/profile/update").put(isAuthenticated,upload.single("profilePhoto"),updateUserProfile);


router.route('/create-activity').post(isAuthenticated, createActivity) 
router.route('/get-activity').get(isAuthenticated,getActivity) 

export default router;
