import express from "express";
import {
  loginClient,
  loginAdmin,
  refresh,
  logout
} from "../controllers/authController.js";

const router = express.Router();

router.post("/client/login", loginClient);
router.post("/admin/login", loginAdmin);

router.post("/refresh", refresh);
router.post("/logout", logout);

export default router;

