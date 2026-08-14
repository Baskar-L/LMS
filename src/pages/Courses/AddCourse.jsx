import { useNavigate } from "react-router-dom";

import AppLayout from "../../components/Layout/AppLayout";

import CourseForm from "../../components/Courses/CourseForm";

import {
  createCourse,
} from "../../api/courseApi";

const AddCourse = () => {
  const navigate =
    useNavigate();

  const handleSubmit =
    async (data) => {
      await createCourse(data);

      navigate("/courses");
    };

  return (
    <AppLayout>
      <CourseForm
        onSubmit={
          handleSubmit
        }
      />
    </AppLayout>
  );
};

export default AddCourse;