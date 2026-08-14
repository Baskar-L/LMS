import axiosInstance from "./axios";

export const getShopDetails =
  async () =>
    axiosInstance.get(
      "/shopify/shop"
    );

export const getCustomers =
  async () =>
    axiosInstance.get(
      "/shopify/customers"
    );

export const getProducts =
  async () =>
    axiosInstance.get(
      "/shopify/products"
    );