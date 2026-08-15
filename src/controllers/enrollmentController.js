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

export const getEnrollments = async (
  req,
  res,
  next
) => {
  try {
    const {
      page = 1,
      limit = 5,
      search = "",
      status,
      fromDate,
      toDate,
    } = req.query;

    const query = {
      merchantId: req.user.merchantId,
    };

    if (status) {
      query.status = status;
    }

    if (fromDate || toDate) {
      query.enrollmentDate = {};

      if (fromDate) {
        query.enrollmentDate.$gte =
          new Date(fromDate);
      }

      if (toDate) {
        query.enrollmentDate.$lte =
          new Date(
            `${toDate}T23:59:59.999Z`
          );
      }
    }

    let enrollments =
      await Enrollment.find(query)
        .populate(
          "studentId",
          "name email"
        )
        .populate(
          "courseId",
          "title category"
        )
        .sort({
          createdAt: -1,
        });

    if (search) {
      const keyword =
        search.toLowerCase();

      enrollments =
        enrollments.filter(
          (item) =>
            item.studentId?.name
              ?.toLowerCase()
              .includes(keyword) ||
            item.studentId?.email
              ?.toLowerCase()
              .includes(keyword) ||
            item.courseId?.title
              ?.toLowerCase()
              .includes(keyword)
        );
    }

    const total =
      enrollments.length;

    const start =
      (page - 1) * limit;

    const data =
      enrollments.slice(
        start,
        start + Number(limit)
      );

    res.json(
      new ApiResponse(
        200,
        data,
        "Enrollments fetched successfully",
        {
          page: Number(page),
          totalPages:
            Math.ceil(
              total / limit
            ),
          totalRecords:
            total,
        }
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