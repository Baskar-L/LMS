import api from "./axios";

export const getEnrollments =
  async () => {
    const response =
      await api.get("/enrollments");

    return response.data;
  };

export const getEnrollmentById =
  async (id) => {
    const response =
      await api.get(
        `/enrollments/${id}`
      );

    return response.data;
  };

export const createEnrollment =
  async (data) => {
    const response =
      await api.post(
        "/enrollments",
        data
      );

    return response.data;
  };

export const updateEnrollmentStatus =
  async (
    id,
    status
  ) => {
    const response =
      await api.patch(
        `/enrollments/${id}/status`,
        { status }
      );

    return response.data;
  };

export const deleteEnrollment =
  async (id) => {
    const response =
      await api.delete(
        `/enrollments/${id}`
      );

    return response.data;
  };