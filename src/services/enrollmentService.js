import Enrollment from "../models/Enrollment.js";

class EnrollmentService {
  async checkDuplicate(
    studentId,
    courseId
  ) {
    return await Enrollment.findOne({
      studentId,
      courseId,
    });
  }
}

export default new EnrollmentService();