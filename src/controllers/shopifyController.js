import Session from "../models/Session.js";

import shopifyService from "../services/shopifyService.js";

import {
  GET_SHOP_DETAILS,
  GET_CUSTOMERS,
    GET_PRODUCTS,
} from "../graphql/shopQueries.js";

import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";

export const getShopDetails =
  async (req, res, next) => {
    try {
      const session =
        await Session.findOne({
          merchantId:
            req.user.merchantId,
        });

      if (!session) {
        throw new ApiError(
          404,
          "Shopify session not found"
        );
      }

      const result =
        await shopifyService.executeQuery(
          session.shop,
          session.accessToken,
          GET_SHOP_DETAILS
        );

      res.json(
        new ApiResponse(
          200,
          result.data,
          "Shop fetched successfully"
        )
      );
    } catch (error) {
      next(error);
    }
  };


export const getCustomers =
  async (req, res, next) => {
    try {
      const session =
        await Session.findOne({
          merchantId:
            req.user.merchantId,
        });

      if (!session) {
        throw new ApiError(
          404,
          "Shopify session not found"
        );
      }

      const result =
        await shopifyService.executeQuery(
          session.shop,
          session.accessToken,
          GET_CUSTOMERS
        );

      res.json(
        new ApiResponse(
          200,
          result.data,
          "Customers fetched successfully"
        )
      );
    } catch (error) {
      next(error);
    }
  };



export const getProducts =
  async (req, res, next) => {
    try {
      const session =
        await Session.findOne({
          merchantId:
            req.user.merchantId,
        });

      if (!session) {
        throw new ApiError(
          404,
          "Shopify session not found"
        );
      }

      const result =
        await shopifyService.executeQuery(
          session.shop,
          session.accessToken,
          GET_PRODUCTS
        );

      res.json(
        new ApiResponse(
          200,
          result.data,
          "Products fetched successfully"
        )
      );
    } catch (error) {
      next(error);
    }
  };



export const getProducts = async (req, res, next) => {
  try {
    const session = await Session.findOne({
      merchantId: req.user.merchantId,
    });

    const result =
      await shopifyService.executeQuery(
        session.shop,
        session.accessToken,
        GET_PRODUCTS
      );

    console.log(
      "PRODUCTS RESULT:",
      JSON.stringify(result, null, 2)
    );

    res.json(
      new ApiResponse(
        200,
        result.data,
        "Products fetched successfully"
      )
    );
  } catch (error) {
    console.log(error);
    next(error);
  }
};