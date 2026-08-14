import {
  useEffect,
  useState,
} from "react";

import Modal from "../Common/Modal";

import {
  getStudents,
} from "../../api/studentApi";

import {
  getCourses,
} from "../../api/courseApi";

import {
  createEnrollment,
} from "../../api/enrollmentApi";

import {
  useToast,
} from "../../context/ToastContext";

const EnrollmentModal = ({
  isOpen,
  onClose,
  refreshData,
}) => {

  const { showToast } =
    useToast();

  const [students, setStudents] =
    useState([]);

  const [courses, setCourses] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({
      studentId: "",
      courseId: "",
      status: "In Progress",
    });

  useEffect(() => {

    if (isOpen) {
      loadData();

      setFormData({
        studentId: "",
        courseId: "",
        status: "In Progress",
      });
    }

  }, [isOpen]);

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

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        setLoading(true);

        await createEnrollment(
          formData
        );

        showToast(
          "success",
          "Enrollment created successfully"
        );

        refreshData();

        onClose();

      } catch (error) {

        showToast(
          "error",
          error?.response?.data
            ?.message ||
            "Enrollment failed"
        );

      } finally {

        setLoading(false);

      }
    };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="New Enrollment"
      size="xl"
    >
      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >

        <select
          className="input-box"
          value={
            formData.studentId
          }
          onChange={(e) =>
            setFormData({
              ...formData,
              studentId:
                e.target.value,
            })
          }
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

        <select
          className="input-box"
          value={
            formData.courseId
          }
          onChange={(e) =>
            setFormData({
              ...formData,
              courseId:
                e.target.value,
            })
          }
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

        <select
          className="input-box"
          value={
            formData.status
          }
          onChange={(e) =>
            setFormData({
              ...formData,
              status:
                e.target.value,
            })
          }
        >
          <option>
            In Progress
          </option>

          <option>
            Completed
          </option>
        </select>

        <div className="flex justify-end gap-3">

          <button
            type="button"
            onClick={onClose}
            className="secondary-btn"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="primary-btn"
          >
            {loading
              ? "Saving..."
              : "Enroll"}
          </button>

        </div>

      </form>
    </Modal>
  );
};

export default EnrollmentModal;