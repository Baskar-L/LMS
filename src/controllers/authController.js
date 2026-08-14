import jwt from "jsonwebtoken";

import Merchant from "../models/Merchant.js";
import crypto from "crypto";

import axios from "axios";



import Session from "../models/Session.js";

import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";

import env from "../config/env.js";

const generateToken = (merchant) => {
  return jwt.sign(
    {
      merchantId: merchant._id,
      shopDomain: merchant.shopDomain,
    },
    env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
};

export const me = async (req, res, next) => {
  try {
    const merchant = await Merchant.findById(
      req.user.merchantId
    );

    if (!merchant) {
      throw new ApiError(
        404,
        "Merchant not found"
      );
    }

    res.status(200).json(
      new ApiResponse(
        200,
        merchant,
        "Merchant fetched successfully"
      )
    );
  } catch (error) {
    next(error);
  }
};

export const createMerchantToken =
  async (merchant) => {
    return generateToken(merchant);
  };



export const installApp =
  async (req, res) => {
    try {
      const { shop } =
        req.query;

      if (!shop) {
        return res.status(400).json({
          success: false,
          message:
            "Shop parameter required",
        });
      }

      const state =
        crypto
          .randomBytes(16)
          .toString("hex");

      const installUrl =
        `https://${shop}/admin/oauth/authorize` +
        `?client_id=${env.SHOPIFY_API_KEY}` +
        `&scope=${env.SHOPIFY_SCOPES}` +
        `&redirect_uri=${env.SHOPIFY_APP_URL}/api/auth/callback` +
        `&state=${state}`;

      console.log("INSTALL URL:");
      console.log(installUrl);

      return res.redirect(
        installUrl
      );
    } catch (error) {
      console.log(error);

      res.status(500).json({
        success: false,
      });
    }
  };



export const authCallback =
  async (req, res, next) => {

    console.log("===== CALLBACK HIT =====");
    console.log(req.query);
    try {
      const {
        shop,
        code,
      } = req.query;

      if (!shop || !code) {
        return res.status(400).json({
          success: false,
          message: "Missing shop or code",
        });
      }

      console.log("Shop:", shop);

      const tokenResponse =
        await axios.post(
          `https://${shop}/admin/oauth/access_token`,
          {
            client_id:
              env
                .SHOPIFY_API_KEY,

            client_secret:
              env
                .SHOPIFY_API_SECRET,

            code,
          }
        );

      console.log("Access Token Received");

      const accessToken =
        tokenResponse.data
          .access_token;

      const shopResponse = await axios.post(
        `https://${shop}/admin/api/${env.SHOPIFY_API_VERSION}/graphql.json`,
        {
          query: `
      {
        shop {
          name
          email
          myshopifyDomain
        }
      }
    `,
        },
        {
          headers: {
            "X-Shopify-Access-Token": accessToken,
            "Content-Type": "application/json",
          },
        }
      );

      const shopData =
        shopResponse.data
          .data.shop;

      let merchant =
        await Merchant.findOne({
          shopDomain:
            shopData.myshopifyDomain,
        });

      if (!merchant) {
        merchant =
          await Merchant.create({
            shopName:
              shopData.name,

            shopDomain:
              shopData.myshopifyDomain,

            email:
              shopData.email,

            accessToken,
          });
      } else {
        merchant.accessToken =
          accessToken;

        await merchant.save();
      }

      await Session.findOneAndUpdate(
        {
          merchantId:
            merchant._id,
        },
        {
          merchantId:
            merchant._id,

          shop:
            shopData.myshopifyDomain,

          accessToken,
        },
        {
          upsert: true,
          new: true,
        }
      );

      const token =
        generateToken(
          merchant
        );

      res.redirect(
        `${env.CLIENT_URL}/auth/success?token=${token}`
      );
    } catch (error) {
      next(error);
    }
  };



export const devLogin = async (req, res) => {
  const merchant =
    await Merchant.findOne();

  if (!merchant) {
    return res.status(404).json({
      success: false,
      message: "No merchant found"
    });
  }

  const token = jwt.sign(
    {
      merchantId: merchant._id,
      shopDomain: merchant.shopDomain
    },
    env.JWT_SECRET,
    {
      expiresIn: "7d"
    }
  );

  res.json({
    success: true,
    token,
    merchant
  });
};