import axios from "axios";
import env from "../config/env.js";

class ShopifyService {
  async executeQuery(
    shop,
    accessToken,
    query
  ) {
    const response = await axios.post(
      `https://${shop}/admin/api/${env.SHOPIFY_API_VERSION}/graphql.json`,
      { query },
      {
        headers: {
          "X-Shopify-Access-Token":
            accessToken,
          "Content-Type":
            "application/json",
        },
      }
    );

    return response.data;
  }
}

export default new ShopifyService();