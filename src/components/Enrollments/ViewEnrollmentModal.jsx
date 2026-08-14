import {
  useEffect,
  useState,
} from "react";

import Modal from "../Common/Modal";

import {
  getEnrollmentById,
} from "../../api/enrollmentApi";

import StatusBadge from "./StatusBadge";

import {
  formatDate,
} from "../../utils/helpers";

const ViewEnrollmentModal = ({
  isOpen,
  enrollmentId,
  onClose,
}) => {

  const [data, setData] =
    useState(null);

  useEffect(() => {

    if (
      isOpen &&
      enrollmentId
    ) {
      loadData();
    }

  }, [
    isOpen,
    enrollmentId,
  ]);

  const loadData =
    async () => {

      const res =
        await getEnrollmentById(
          enrollmentId
        );

      setData(
        res.data
      );
    };

  if (!data)
    return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Enrollment Details"
      size="lg"
    >

      <div className="grid md:grid-cols-2 gap-5">

        <div>
          <p className="font-semibold">
            Student
          </p>

          <p>
            {
              data.studentId
                ?.name
            }
          </p>
        </div>

        <div>
          <p className="font-semibold">
            Email
          </p>

          <p>
            {
              data.studentId
                ?.email
            }
          </p>
        </div>

        <div>
          <p className="font-semibold">
            Course
          </p>

          <p>
            {
              data.courseId
                ?.title
            }
          </p>
        </div>

        <div>
          <p className="font-semibold">
            Enrollment Date
          </p>

          <p>
            {formatDate(
              data.enrollmentDate
            )}
          </p>
        </div>

        <div>
          <p className="font-semibold">
            Status
          </p>

          <StatusBadge
            status={
              data.status
            }
          />
        </div>

      </div>

    </Modal>
  );
};

export default ViewEnrollmentModal;