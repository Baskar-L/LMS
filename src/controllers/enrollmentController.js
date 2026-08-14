import Enrollment from "../models/Enrollment.js";

import enrollmentService from "../services/enrollmentService.js";

import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";

export const createEnrollment =
  async (req, res, next) => {
    try {
      const { studentId, courseId } =
        req.body;

      const exists =
        await enrollmentService.checkDuplicate(
          studentId,
          courseId
        );

      if (exists) {
        throw new ApiError(
          400,
          "Student already enrolled in this course"
        );
      }

      const enrollment =
        await Enrollment.create({
          merchantId:
            req.user.merchantId,
          studentId,
          courseId,
        });

      res
        .status(201)
        .json(
          new ApiResponse(
            201,
            enrollment,
            "Enrollment created successfully"
          )
        );
    } catch (error) {
      next(error);
    }
  };

export const getEnrollments =
  async (req, res, next) => {
    try {
      const enrollments =
        await Enrollment.find({
          merchantId:
            req.user.merchantId,
        })
          .populate(
            "studentId",
            "name email"
          )
          .populate(
            "courseId",
            "title category"
          );

      res.json(
        new ApiResponse(
          200,
          enrollments,
          "Enrollments fetched successfully"
        )
      );
    } catch (error) {
      next(error);
    }
  };

export const updateEnrollmentStatus =
  async (req, res, next) => {
    try {
      const enrollment =
        await Enrollment.findByIdAndUpdate(
          req.params.id,
          {
            status:
              req.body.status,
          },
          {
            new: true,
          }
        );

      res.json(
        new ApiResponse(
          200,
          enrollment,
          "Enrollment updated successfully"
        )
      );
    } catch (error) {
      next(error);
    }
  };

export const deleteEnrollment =
  async (req, res, next) => {
    try {
      await Enrollment.findByIdAndDelete(
        req.params.id
      );

      res.json(
        new ApiResponse(
          200,
          null,
          "Enrollment deleted successfully"
        )
      );
    } catch (error) {
      next(error);
    }
  };