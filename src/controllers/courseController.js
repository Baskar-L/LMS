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

    const {
      search = "",
      status = "",
      fromDate = "",
      toDate = "",
      page = 1,
      limit = 1000,
    } = req.query;

    const query = {
      merchantId:
        req.user.merchantId,
    };

    /* SEARCH */

    if (search) {
      query.$or = [
        {
          title: {
            $regex: search,
            $options: "i",
          },
        },
        {
          instructorName: {
            $regex: search,
            $options: "i",
          },
        },
        {
          category: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    /* STATUS */

    if (status) {
      query.status = status;
    }

    /* DATE */

    if (
      fromDate ||
      toDate
    ) {

      query.createdAt = {};

      if (fromDate) {
        query.createdAt.$gte =
          new Date(fromDate);
      }

      if (toDate) {

        const endDate =
          new Date(toDate);

        endDate.setHours(
          23,
          59,
          59,
          999
        );

        query.createdAt.$lte =
          endDate;
      }
    }

    const total =
      await Course.countDocuments(
        query
      );

    const courses =
      await Course.find(query)
        .sort({
          createdAt: -1,
        })
        .skip(
          (page - 1) * limit
        )
        .limit(Number(limit));

    res.json({
      success: true,
      data: courses,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages:
          Math.ceil(
            total / limit
          ),
      },
    });

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