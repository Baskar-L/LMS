import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
} from "react-router-dom";

import AppLayout from "../../components/Layout/AppLayout";

import StudentDetails from "../../components/Students/StudentDetails";

import {
  getStudentById,
} from "../../api/studentApi";

const StudentView = () => {
  const { id } =
    useParams();

  const [student, setStudent] =
    useState(null);

  useEffect(() => {
    loadStudent();
  }, []);

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

  if (!student)
    return null;

  return (
    <AppLayout>
      <StudentDetails
        student={student}
      />
    </AppLayout>
  );
};

export default StudentView;