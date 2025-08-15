import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { createReview } from "../controllers/reviewController.js";

const router = express.Router()

router.route('/create/:courseId').post(isAuthenticated, createReview)

export default router;