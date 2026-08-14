

import { useNavigate } from "react-router-dom";

import AppLayout from "../../components/Layout/AppLayout";

import StudentForm from "../../components/Students/StudentForm";

import {
  createStudent,
} from "../../api/studentApi";

const AddStudent = () => {
  const navigate =
    useNavigate();

  const handleSubmit =
    async (data) => {
      await createStudent(data);

      navigate("/students");
    };

  return (
    <AppLayout>
      <StudentForm
        onSubmit={
          handleSubmit
        }
      />
    </AppLayout>
  );
};

export default AddStudent;