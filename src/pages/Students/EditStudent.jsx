import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import AppLayout from "../../components/Layout/AppLayout";

import StudentForm from "../../components/Students/StudentForm";

import {
  getStudentById,
  updateStudent,
} from "../../api/studentApi";

const EditStudent = () => {
  const { id } =
    useParams();

  const navigate =
    useNavigate();

  const [student, setStudent] =
    useState(null);

  const loadStudent =
    async () => {
      const response =
        await getStudentById(
          id
        );

      setStudent(
        response.data
      );
    };

  useEffect(() => {
    loadStudent();
  }, []);

  const handleSubmit =
    async (data) => {
      await updateStudent(
        id,
        data
      );

      navigate("/students");
    };

  if (!student)
    return null;

  return (
    <AppLayout>
      <StudentForm
        initialValues={
          student
        }
        onSubmit={
          handleSubmit
        }
      />
    </AppLayout>
  );
};

export default EditStudent;