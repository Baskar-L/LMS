import {
  useEffect,
  useState,
} from "react";

import {
  Link,
} from "react-router-dom";

import AppLayout from "../../components/Layout/AppLayout";

import CourseTable from "../../components/Courses/CourseTable";

import {
  getCourses,
  deleteCourse,
} from "../../api/courseApi";

import ConfirmModal from "../../components/Common/ConfirmModal";

const Courses = () => {
  const [courses, setCourses] =
    useState([]);

  const [deleteId, setDeleteId] =
    useState(null);

  const fetchCourses =
    async () => {
      const res =
        await getCourses();

      setCourses(
        res.data || []
      );
    };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleDelete =
    async () => {
      await deleteCourse(
        deleteId
      );

      setDeleteId(null);

      fetchCourses();
    };

  return (
    <AppLayout>
      <div className="page-container">
        <div className="flex justify-between items-center">
          <h1 className="page-title">
            Courses
          </h1>

          <Link
            to="/courses/add"
            className="primary-btn"
          >
            Add Course
          </Link>
        </div>

        <CourseTable
          courses={courses}
          onDelete={setDeleteId}
        />
      </div>

      <ConfirmModal
        isOpen={!!deleteId}
        title="Delete Course"
        message="Are you sure?"
        onConfirm={
          handleDelete
        }
        onCancel={() =>
          setDeleteId(null)
        }
      />
    </AppLayout>
  );
};

export default Courses;