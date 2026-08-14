import Student from "../models/Student.js";

import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";

export const createStudent =
  async (req, res, next) => {
    try {
      const student =
        await Student.create({
          merchantId:
            req.user.merchantId,
          ...req.body,
        });

      res
        .status(201)
        .json(
          new ApiResponse(
            201,
            student,
            "Student created successfully"
          )
        );
    } catch (error) {
      next(error);
    }
  };

export const getStudents = async (
  req,
  res,
  next
) => {
  try {
    const students =
      await Student.find({
        merchantId:
          req.user.merchantId,
      });

    res.json(
      new ApiResponse(
        200,
        students,
        "Students fetched successfully"
      )
    );
  } catch (error) {
    next(error);
  }
};

export const getStudent = async (
  req,
  res,
  next
) => {
  try {
    const student =
      await Student.findById(
        req.params.id
      );

    if (!student) {
      throw new ApiError(
        404,
        "Student not found"
      );
    }

    res.json(
      new ApiResponse(
        200,
        student,
        "Student fetched successfully"
      )
    );
  } catch (error) {
    next(error);
  }
};

export const updateStudent =
  async (req, res, next) => {
    try {
      const student =
        await Student.findByIdAndUpdate(
          req.params.id,
          req.body,
          {
            new: true,
          }
        );

      if (!student) {
        throw new ApiError(
          404,
          "Student not found"
        );
      }

      res.json(
        new ApiResponse(
          200,
          student,
          "Student updated successfully"
        )
      );
    } catch (error) {
      next(error);
    }
  };

export const deleteStudent =
  async (req, res, next) => {
    try {
      const student =
        await Student.findByIdAndDelete(
          req.params.id
        );

      if (!student) {
        throw new ApiError(
          404,
          "Student not found"
        );
      }

      res.json(
        new ApiResponse(
          200,
          null,
          "Student deleted successfully"
        )
      );
    } catch (error) {
      next(error);
    }
  };