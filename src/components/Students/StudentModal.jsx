import {
  useEffect,
  useState,
} from "react";

import Modal from "../Common/Modal";

import {
  createStudent,
  updateStudent,
  getStudentById,
} from "../../api/studentApi";

import {
  useToast,
} from "../../context/ToastContext";

const initialForm = {
  name: "",
  email: "",
};

const StudentModal = ({
  isOpen,
  studentId,
  onClose,
  refreshStudents,
}) => {

  const { showToast } =
    useToast();

  const [loading, setLoading] =
    useState(false);

  const [form, setForm] =
    useState(initialForm);

  useEffect(() => {

    if (
      isOpen &&
      studentId
    ) {
      loadStudent();
    }

    if (
      isOpen &&
      !studentId
    ) {
      setForm(initialForm);
    }

  }, [isOpen, studentId]);

  const loadStudent =
    async () => {

      try {

        const res =
          await getStudentById(
            studentId
          );

        setForm({
          name:
            res.data.name || "",
          email:
            res.data.email || "",
        });

      } catch {

        showToast(
          "error",
          "Failed to load student"
        );

      }
    };

  const handleChange = (
    e
  ) => {

    setForm({
      ...form,
      [e.target.name]:
        e.target.value,
    });

  };

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        setLoading(true);

        if (studentId) {

          await updateStudent(
            studentId,
            form
          );

          showToast(
            "success",
            "Student updated successfully"
          );

        } else {

          await createStudent(
            form
          );

          showToast(
            "success",
            "Student created successfully"
          );

        }

        refreshStudents();

        onClose();

      } catch {

        showToast(
          "error",
          "Save failed"
        );

      } finally {

        setLoading(false);

      }
    };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        studentId
          ? "Edit Student"
          : "Add Student"
      }
      size="lg"
    >

      <form
        onSubmit={
          handleSubmit
        }
        className="space-y-4"
      >

        <div>
          <label>
            Name
          </label>

          <input
            type="text"
            name="name"
            value={form.name}
            onChange={
              handleChange
            }
            className="input-box"
            required
          />
        </div>

        <div>
          <label>
            Email
          </label>

          <input
            type="email"
            name="email"
            value={form.email}
            onChange={
              handleChange
            }
            className="input-box"
            required
          />
        </div>

        <div className="flex justify-end gap-3">

          <button
            type="button"
            onClick={onClose}
            className="secondary-btn"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="primary-btn"
          >
            {loading
              ? "Saving..."
              : studentId
              ? "Update"
              : "Create"}
          </button>

        </div>

      </form>

    </Modal>
  );
};

export default StudentModal;