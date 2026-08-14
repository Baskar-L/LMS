import api from "./axios";

export const getDashboard =
  async () => {
    const response =
      await api.get(
        "/dashboard/overview"
      );

    return response.data;
  };