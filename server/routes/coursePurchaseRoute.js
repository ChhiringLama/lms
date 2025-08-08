import express from "express";
import {
  createCheckoutSession,
  getAllPurchasedCourse,
  getCourseDetailWithPurchaseStatus,
  webhook,
} from "../controllers/coursePurchaseController.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.route("/webhook").post(express.raw({ type: "application/json" }), webhook);
router.route("/checkout/create-checkout-session").post(isAuthenticated, createCheckoutSession);

router.route("/course/:courseId/detail-with-status").get(getCourseDetailWithPurchaseStatus);
router.route("/").get(isAuthenticated,getAllPurchasedCourse);
export default router;
