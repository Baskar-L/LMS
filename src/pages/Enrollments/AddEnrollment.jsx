import { useNavigate } from "react-router-dom";

import AppLayout from "../../components/Layout/AppLayout";

import EnrollmentForm from "../../components/Enrollments/EnrollmentForm";

import {
  createEnrollment,
} from "../../api/enrollmentApi";

const AddEnrollment = () => {
  const navigate =
    useNavigate();

  const handleSubmit =
    async (data) => {
      try {
        await createEnrollment(
          data
        );

        navigate(
          "/enrollments"
        );
      } catch (error) {
        alert(
          error?.response?.data
            ?.message ||
            "Duplicate enrollment not allowed"
        );
      }
    };

  return (
    <AppLayout>
      <EnrollmentForm
        onSubmit={
          handleSubmit
        }
      />
    </AppLayout>
  );
};

export default AddEnrollment;