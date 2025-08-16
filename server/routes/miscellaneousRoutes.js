import express from "express";
import { getLecturers } from "../controllers/miscellaneousController.js";
const router = express.Router();

router.route("/get-lecturers").get(getLecturers);

export default router;
