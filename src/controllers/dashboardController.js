import dashboardService from "../services/dashboardService.js";

import Enrollment from "../models/Enrollment.js";

import ApiResponse from "../utils/ApiResponse.js";

export const getDashboard =
  async (req, res, next) => {
    try {
      const stats =
        await dashboardService.getStats(
          req.user.merchantId
        );

      const recentEnrollments =
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
            "title"
          )
          .sort({
            createdAt: -1,
          })
          .limit(5);

      res.json(
        new ApiResponse(
          200,
          {
            stats,
            recentEnrollments,
          },
          "Dashboard data fetched successfully"
        )
      );
    } catch (error) {
      next(error);
    }
  };