import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";

import validateMiddleware from "../middleware/validateMiddleware.js";

import {
  createEnrollmentValidator,
} from "../validators/enrollmentValidator.js";

import {
  createEnrollment,
  getEnrollments,
  updateEnrollmentStatus,
  deleteEnrollment,
} from "../controllers/enrollmentController.js";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  createEnrollmentValidator,
  validateMiddleware,
  createEnrollment
);

router.get(
  "/",
  authMiddleware,
  getEnrollments
);

router.patch(
  "/:id/status",
  authMiddleware,
  updateEnrollmentStatus
);

router.delete(
  "/:id",
  authMiddleware,
  deleteEnrollment
);

export default router;