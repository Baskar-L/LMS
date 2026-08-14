import {
  useEffect,
  useState,
} from "react";

import {
  getStudents,
} from "../../api/studentApi";

import {
  getCourses,
} from "../../api/courseApi";

const EnrollmentForm = ({
  onSubmit,
  loading,
}) => {
  const [students, setStudents] =
    useState([]);

  const [courses, setCourses] =
    useState([]);

  const [formData, setFormData] =
    useState({
      studentId: "",
      courseId: "",
      status: "In Progress",
    });

  useEffect(() => {
    loadData();
  }, []);

  const loadData =
    async () => {
      const studentRes =
        await getStudents();

      const courseRes =
        await getCourses();

      setStudents(
        studentRes.data || []
      );

      setCourses(
        courseRes.data || []
      );
    };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="page-container"
    >
      <h2 className="page-title mb-5">
        Student Enrollment
      </h2>

      <div className="modal-grid">
        <div>
          <label>
            Student
          </label>

          <select
            name="studentId"
            value={
              formData.studentId
            }
            onChange={
              handleChange
            }
            className="input-box"
            required
          >
            <option value="">
              Select Student
            </option>

            {students.map(
              (student) => (
                <option
                  key={
                    student._id
                  }
                  value={
                    student._id
                  }
                >
                  {student.name}
                </option>
              )
            )}
          </select>
        </div>

        <div>
          <label>
            Course
          </label>

          <select
            name="courseId"
            value={
              formData.courseId
            }
            onChange={
              handleChange
            }
            className="input-box"
            required
          >
            <option value="">
              Select Course
            </option>

            {courses.map(
              (course) => (
                <option
                  key={
                    course._id
                  }
                  value={
                    course._id
                  }
                >
                  {course.title}
                </option>
              )
            )}
          </select>
        </div>

        <div>
          <label>
            Status
          </label>

          <select
            name="status"
            value={
              formData.status
            }
            onChange={
              handleChange
            }
            className="input-box"
          >
            <option>
              In Progress
            </option>

            <option>
              Completed
            </option>
          </select>
        </div>
      </div>

      <button
        type="submit"
        className="primary-btn mt-5"
        disabled={loading}
      >
        {loading
          ? "Saving..."
          : "Enroll Student"}
      </button>
    </form>
  );
};

export default EnrollmentForm;