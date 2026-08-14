import {
  useEffect,
  useState,
} from "react";

import Modal from "../Common/Modal";

import {
  getStudentById,
} from "../../api/studentApi";

import {
  formatDate,
} from "../../utils/helpers";

const ViewStudentModal = ({
  isOpen,
  studentId,
  onClose,
}) => {

  const [student, setStudent] =
    useState(null);

  useEffect(() => {

    if (
      isOpen &&
      studentId
    ) {
      loadStudent();
    }

  }, [isOpen, studentId]);

  const loadStudent =
    async () => {

      const res =
        await getStudentById(
          studentId
        );

      setStudent(
        res.data
      );
    };

  if (!student)
    return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Student Details"
      size="lg"
    >

      <div className="grid gap-4">

        <div>
          <p className="font-semibold">
            Name
          </p>

          <p>
            {student.name}
          </p>
        </div>

        <div>
          <p className="font-semibold">
            Email
          </p>

          <p>
            {student.email}
          </p>
        </div>

        <div>
          <p className="font-semibold">
            Created Date
          </p>

          <p>
            {formatDate(
              student.createdAt
            )}
          </p>
        </div>

      </div>

    </Modal>
  );
};

export default ViewStudentModal;