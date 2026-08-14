import { body } from "express-validator";

export const createEnrollmentValidator =
  [
    body("studentId")
      .notEmpty()
      .withMessage(
        "Student is required"
      ),

    body("courseId")
      .notEmpty()
      .withMessage(
        "Course is required"
      ),
  ];