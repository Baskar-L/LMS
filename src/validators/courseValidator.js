import { body } from "express-validator";

export const createCourseValidator = [
  body("title")
    .notEmpty()
    .withMessage(
      "Course title is required"
    ),



  body("instructorName")
    .notEmpty()
    .withMessage(
      "Instructor name is required"
    ),

  body("category")
    .notEmpty()
    .withMessage(
      "Category is required"
    ),

  body("duration")
    .notEmpty()
    .withMessage(
      "Duration is required"
    ),
];