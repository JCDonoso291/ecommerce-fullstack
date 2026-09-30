import express from "express";
import {
  loginClient,
  loginAdmin
} from "../controllers/authController.js";

const router = express.Router();

router.post("/client/login", loginClient);
router.post("/admin/login", loginAdmin);

export default router;

