import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";

import validateMiddleware from "../middleware/validateMiddleware.js";

import {
  createCourseValidator,
} from "../validators/courseValidator.js";

import {
  createCourse,
  getCourses,
  getCourse,
  updateCourse,
  deleteCourse,
} from "../controllers/courseController.js";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  createCourseValidator,
  validateMiddleware,
  createCourse
);

router.get(
  "/",
  authMiddleware,
  getCourses
);

router.get(
  "/:id",
  authMiddleware,
  getCourse
);

router.put(
  "/:id",
  authMiddleware,
  updateCourse
);

router.delete(
  "/:id",
  authMiddleware,
  deleteCourse
);

export default router;