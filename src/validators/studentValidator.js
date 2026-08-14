import { body } from "express-validator";

export const createStudentValidator = [
  body("name")
    .notEmpty()
    .withMessage(
      "Student name is required"
    ),

  body("email")
    .isEmail()
    .withMessage(
      "Valid email required"
    ),
];