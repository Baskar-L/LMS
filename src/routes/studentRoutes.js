import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";

import validateMiddleware from "../middleware/validateMiddleware.js";

import {
  createStudentValidator,
} from "../validators/studentValidator.js";

import {
  createStudent,
  getStudents,
  getStudent,
  updateStudent,
  deleteStudent,
} from "../controllers/studentController.js";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  createStudentValidator,
  validateMiddleware,
  createStudent
);

router.get(
  "/",
  authMiddleware,
  getStudents
);

router.get(
  "/:id",
  authMiddleware,
  getStudent
);

router.put(
  "/:id",
  authMiddleware,
  updateStudent
);

router.delete(
  "/:id",
  authMiddleware,
  deleteStudent
);

export default router;