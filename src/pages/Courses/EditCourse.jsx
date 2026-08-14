import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import AppLayout from "../../components/Layout/AppLayout";

import CourseForm from "../../components/Courses/CourseForm";

import {
  getCourseById,
  updateCourse,
} from "../../api/courseApi";

const EditCourse = () => {
  const { id } =
    useParams();

  const navigate =
    useNavigate();

  const [course, setCourse] =
    useState(null);

  useEffect(() => {
    loadCourse();
  }, []);

  const loadCourse =
    async () => {
      const res =
        await getCourseById(
          id
        );

      setCourse(
        res.data
      );
    };

  const handleSubmit =
    async (data) => {
      await updateCourse(
        id,
        data
      );

      navigate("/courses");
    };

  if (!course)
    return null;

  return (
    <AppLayout>
      <CourseForm
        initialValues={
          course
        }
        onSubmit={
          handleSubmit
        }
      />
    </AppLayout>
  );
};

export default EditCourse;