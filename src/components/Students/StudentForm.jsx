import { useState } from "react";

const StudentForm = ({
  initialValues,
  onSubmit,
  loading,
}) => {
  const [formData, setFormData] =
    useState(
      initialValues || {
        name: "",
        email: "",
      }
    );

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="page-container"
    >
      <h2 className="page-title mb-5">
        Student Form
      </h2>

      <div className="modal-grid">
        <div>
          <label className="form-label">
            Student Name
          </label>

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="input-box"
            required
          />
        </div>

        <div>
          <label className="form-label">
            Email Address
          </label>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="input-box"
            required
          />
        </div>
      </div>

      <button
        type="submit"
        className="primary-btn mt-5"
        disabled={loading}
      >
        {loading
          ? "Saving..."
          : "Save Student"}
      </button>
    </form>
  );
};

export default StudentForm;