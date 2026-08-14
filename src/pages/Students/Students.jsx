import {
  useEffect,
  useState,
} from "react";

import { Link } from "react-router-dom";

import AppLayout from "../../components/Layout/AppLayout";

import StudentTable from "../../components/Students/StudentTable";

import ConfirmModal from "../../components/Common/ConfirmModal";

import {
  getStudents,
  deleteStudent,
} from "../../api/studentApi";

const Students = () => {
  const [students, setStudents] =
    useState([]);

  const [deleteId, setDeleteId] =
    useState(null);

  const loadStudents =
    async () => {
      const response =
        await getStudents();

      setStudents(
        response.data || []
      );
    };

  useEffect(() => {
    loadStudents();
  }, []);

  const handleDelete =
    async () => {
      await deleteStudent(
        deleteId
      );

      setDeleteId(null);

      loadStudents();
    };

  return (
    <AppLayout>
      <div className="page-container">
        <div className="flex justify-between items-center">
          <h1 className="page-title">
            Students
          </h1>

          <Link
            to="/students/add"
            className="primary-btn"
          >
            Add Student
          </Link>
        </div>

        <StudentTable
          students={students}
          onDelete={setDeleteId}
        />
      </div>

      <ConfirmModal
        isOpen={!!deleteId}
        title="Delete Student"
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

export default Students;