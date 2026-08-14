import {
  useEffect,
  useState,
} from "react";

import Modal from "../Common/Modal";

import {
  getCourseById,
} from "../../api/courseApi";

import {
  formatDate,
} from "../../utils/helpers";

const ViewCourseModal = ({
  isOpen,
  courseId,
  onClose,
}) => {
  const [course, setCourse] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {
    if (
      isOpen &&
      courseId
    ) {
      loadCourse();
    } else {
      setCourse(null);
    }
  }, [
    isOpen,
    courseId,
  ]);

  const loadCourse =
    async () => {
      try {
        setLoading(true);

        const res =
          await getCourseById(
            courseId
          );

        setCourse(
          res.data
        );
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Course Details"
      size="xl"
    >
      {loading ? (
        <div className="text-center py-10">
          Loading...
        </div>
      ) : course ? (
        <div className="grid md:grid-cols-2 gap-5">

          <div>
            <p className="text-sm text-gray-500">
              Title
            </p>

            <p className="font-medium">
              {course.title}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Instructor
            </p>

            <p className="font-medium">
              {
                course.instructorName
              }
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Category
            </p>

            <p className="font-medium">
              {course.category}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Duration
            </p>

            <p className="font-medium">
              {course.duration}
            </p>
          </div>

          <div className="md:col-span-2">
            <p className="text-sm text-gray-500">
              Description
            </p>

            <p className="font-medium whitespace-pre-wrap">
              {
                course.description
              }
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Status
            </p>

            <span
              className={
                course.status ===
                "Active"
                  ? "status-active"
                  : "status-inactive"
              }
            >
              {course.status}
            </span>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Created Date
            </p>

            <p className="font-medium">
              {formatDate(
                course.createdAt
              )}
            </p>
          </div>

        </div>
      ) : (
        <div className="text-center py-10">
          No Data Found
        </div>
      )}
    </Modal>
  );
};

export default ViewCourseModal;