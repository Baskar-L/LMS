import Course from "../models/Course.js";
import Student from "../models/Student.js";
import Enrollment from "../models/Enrollment.js";

class DashboardService {
  async getStats(merchantId) {
    const totalCourses =
      await Course.countDocuments({
        merchantId,
      });

    const totalStudents =
      await Student.countDocuments({
        merchantId,
      });

    const totalEnrollments =
      await Enrollment.countDocuments({
        merchantId,
      });

    const completed =
      await Enrollment.countDocuments({
        merchantId,
        status: "Completed",
      });

    const inProgress =
      await Enrollment.countDocuments({
        merchantId,
        status: "In Progress",
      });

    return {
      totalCourses,
      totalStudents,
      totalEnrollments,
      completed,
      inProgress,
    };
  }
}

export default new DashboardService();