import Course from "../models/Course.js";

import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";

export const createCourse = async (
  req,
  res,
  next
) => {
  try {
    const course = await Course.create({
      merchantId:
        req.user.merchantId,
      ...req.body,
    });

    res
      .status(201)
      .json(
        new ApiResponse(
          201,
          course,
          "Course created successfully"
        )
      );
  } catch (error) {
    next(error);
  }
};

export const getCourses = async (
  req,
  res,
  next
) => {
  try {
    const courses = await Course.find({
      merchantId:
        req.user.merchantId,
    });

    res.json(
      new ApiResponse(
        200,
        courses,
        "Courses fetched successfully"
      )
    );
  } catch (error) {
    next(error);
  }
};

export const getCourse = async (
  req,
  res,
  next
) => {
  try {
    const course =
      await Course.findById(
        req.params.id
      );

    if (!course) {
      throw new ApiError(
        404,
        "Course not found"
      );
    }

    res.json(
      new ApiResponse(
        200,
        course,
        "Course fetched successfully"
      )
    );
  } catch (error) {
    next(error);
  }
};

export const updateCourse =
  async (req, res, next) => {
    try {
      const course =
        await Course.findByIdAndUpdate(
          req.params.id,
          req.body,
          {
            new: true,
          }
        );

      if (!course) {
        throw new ApiError(
          404,
          "Course not found"
        );
      }

      res.json(
        new ApiResponse(
          200,
          course,
          "Course updated successfully"
        )
      );
    } catch (error) {
      next(error);
    }
  };

export const deleteCourse =
  async (req, res, next) => {
    try {
      const course =
        await Course.findByIdAndDelete(
          req.params.id
        );

      if (!course) {
        throw new ApiError(
          404,
          "Course not found"
        );
      }

      res.json(
        new ApiResponse(
          200,
          null,
          "Course deleted successfully"
        )
      );
    } catch (error) {
      next(error);
    }
  };