import dotenv from "dotenv";

dotenv.config();

const env = {
  PORT: process.env.PORT || 5000,

  NODE_ENV: process.env.NODE_ENV,

  MONGODB_URI: process.env.MONGODB_URI,

  JWT_SECRET: process.env.JWT_SECRET,

  CLIENT_URL: process.env.CLIENT_URL,

  SHOPIFY_API_KEY: process.env.SHOPIFY_API_KEY,

  SHOPIFY_API_SECRET: process.env.SHOPIFY_API_SECRET,

  SHOPIFY_SCOPES: process.env.SHOPIFY_SCOPES,

  SHOPIFY_APP_URL: process.env.SHOPIFY_APP_URL,

  SHOPIFY_API_VERSION: process.env.SHOPIFY_API_VERSION,
};

export default env;