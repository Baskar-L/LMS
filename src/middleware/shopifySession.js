import Session from "../models/Session.js";

const shopifySession = async (
  req,
  res,
  next
) => {
  try {
    const shop =
      req.headers["x-shop-domain"];

    if (!shop) {
      return res.status(401).json({
        success: false,
        message:
          "Shop domain missing",
      });
    }

    const session =
      await Session.findOne({
        shop,
      });

    if (!session) {
      return res.status(401).json({
        success: false,
        message:
          "Shop session not found",
      });
    }

    req.shopSession = session;

    next();
  } catch (error) {
    next(error);
  }
};

export default shopifySession;