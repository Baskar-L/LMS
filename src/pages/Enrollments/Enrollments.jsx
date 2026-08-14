import {
  useEffect,
  useState,
} from "react";

import { Link } from "react-router-dom";

import AppLayout from "../../components/Layout/AppLayout";

import EnrollmentTable from "../../components/Enrollments/EnrollmentTable";

import ConfirmModal from "../../components/Common/ConfirmModal";

import {
  getEnrollments,
  deleteEnrollment,
} from "../../api/enrollmentApi";

const Enrollments = () => {
  const [enrollments, setEnrollments] =
    useState([]);

  const [deleteId, setDeleteId] =
    useState(null);

  const loadData =
    async () => {
      const response =
        await getEnrollments();

      setEnrollments(
        response.data || []
      );
    };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete =
    async () => {
      await deleteEnrollment(
        deleteId
      );

      setDeleteId(null);

      loadData();
    };

  return (
    <AppLayout>
      <div className="page-container">
        <div className="flex justify-between items-center">
          <h1 className="page-title">
            Enrollments
          </h1>

          <Link
            to="/enrollments/add"
            className="primary-btn"
          >
            New Enrollment
          </Link>
        </div>

        <EnrollmentTable
          enrollments={
            enrollments
          }
          onDelete={
            setDeleteId
          }
        />
      </div>

      <ConfirmModal
        isOpen={!!deleteId}
        title="Delete Enrollment"
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

export default Enrollments;