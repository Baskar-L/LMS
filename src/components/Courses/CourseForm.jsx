import { useState } from "react";

const CourseForm = ({
  initialValues,
  onSubmit,
  loading,
}) => {
  const [formData, setFormData] =
    useState(
      initialValues || {
        title: "",
        description: "",
        instructorName: "",
        category: "",
        duration: "",
        status: "Active",
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
      <div className="modal-grid">
        <div>
          <label className="form-label">
            Course Title
          </label>

          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="input-box"
            required
          />
        </div>

        <div>
          <label className="form-label">
            Instructor Name
          </label>

          <input
            type="text"
            name="instructorName"
            value={
              formData.instructorName
            }
            onChange={handleChange}
            className="input-box"
            required
          />
        </div>

        <div>
          <label className="form-label">
            Category
          </label>

          <input
            type="text"
            name="category"
            value={
              formData.category
            }
            onChange={handleChange}
            className="input-box"
            required
          />
        </div>

        <div>
          <label className="form-label">
            Duration
          </label>

          <input
            type="text"
            name="duration"
            value={
              formData.duration
            }
            onChange={handleChange}
            className="input-box"
            placeholder="10 Hours"
            required
          />
        </div>

        <div>
          <label className="form-label">
            Status
          </label>

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="input-box"
          >
            <option value="Active">
              Active
            </option>

            <option value="Inactive">
              Inactive
            </option>
          </select>
        </div>
      </div>

      <div className="mt-4">
        <label className="form-label">
          Description
        </label>

        <textarea
          rows={5}
          name="description"
          value={
            formData.description
          }
          onChange={handleChange}
          className="input-box"
          required
        />
      </div>

      <button
        type="submit"
        className="primary-btn mt-5"
        disabled={loading}
      >
        {loading
          ? "Saving..."
          : "Save Course"}
      </button>
    </form>
  );
};

export default CourseForm;