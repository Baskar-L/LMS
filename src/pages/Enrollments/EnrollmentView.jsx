import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
} from "react-router-dom";

import AppLayout from "../../components/Layout/AppLayout";

import StatusBadge from "../../components/Enrollments/StatusBadge";

import {
  getEnrollmentById,
} from "../../api/enrollmentApi";

import {
  formatDate,
} from "../../utils/helpers";

const EnrollmentView = () => {
  const { id } =
    useParams();

  const [enrollment, setEnrollment] =
    useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData =
    async () => {
      const response =
        await getEnrollmentById(
          id
        );

      setEnrollment(
        response.data
      );
    };

  if (!enrollment)
    return null;

  return (
    <AppLayout>
      <div className="page-container">
        <h2 className="text-2xl font-bold">
          Enrollment Details
        </h2>

        <div className="grid md:grid-cols-2 gap-5 mt-5">
          <div>
            <strong>
              Student
            </strong>

            <p>
              {
                enrollment
                  .studentId
                  ?.name
              }
            </p>
          </div>

          <div>
            <strong>
              Email
            </strong>

            <p>
              {
                enrollment
                  .studentId
                  ?.email
              }
            </p>
          </div>

          <div>
            <strong>
              Course
            </strong>

            <p>
              {
                enrollment
                  .courseId
                  ?.title
              }
            </p>
          </div>

          <div>
            <strong>
              Enrollment Date
            </strong>

            <p>
              {formatDate(
                enrollment.enrollmentDate
              )}
            </p>
          </div>

          <div>
            <strong>
              Status
            </strong>

            <div className="mt-1">
              <StatusBadge
                status={
                  enrollment.status
                }
              />
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default EnrollmentView;