import { shopifyApi } from "@shopify/shopify-api";

import env from "./env.js";

const shopify = shopifyApi({
  apiKey: env.SHOPIFY_API_KEY,

  apiSecretKey: env.SHOPIFY_API_SECRET,

  scopes: env.SHOPIFY_SCOPES.split(","),

  hostName: env.SHOPIFY_APP_URL
    .replace("https://", "")
    .replace("http://", ""),

  apiVersion: env.SHOPIFY_API_VERSION,

  isEmbeddedApp: true,
});

export default shopify;