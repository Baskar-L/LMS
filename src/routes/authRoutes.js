import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";

import {
  installApp,
  authCallback,
  me,
  devLogin
} from "../controllers/authController.js";

const router =
  express.Router();

router.get(
  "/install",
  installApp
);

router.get(
  "/callback",
  authCallback
);

router.get(
  "/me",
  authMiddleware,
  me
);

router.get(
  "/dev-login",
  devLogin
);

export default router;