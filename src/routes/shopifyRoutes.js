import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";

import {
  getShopDetails,
  getCustomers,
   getProducts,
} from "../controllers/shopifyController.js";

const router = express.Router();

router.get(
  "/products",
  authMiddleware,
  getProducts
);

router.get(
  "/shop",
  authMiddleware,
  getShopDetails
);

router.get(
  "/customers",
  authMiddleware,
  getCustomers
);

export default router;