import jwt from "jsonwebtoken";
import env from "../config/env.js";

const authMiddleware = (
  req,
  res,
  next
) => {
  try {
    const authHeader =
      req.headers.authorization;

    console.log(
      "AUTH HEADER:",
      authHeader
    );

    const token =
      authHeader?.split(" ")[1];

    console.log(
      "TOKEN:",
      token
    );

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const decoded = jwt.verify(
      token,
      env.JWT_SECRET
    );

    console.log(
      "DECODED:",
      decoded
    );

    req.user = decoded;

    next();
  } catch (error) {
    console.log(error);

    return res.status(401).json({
      success: false,
      message: "Invalid Token",
    });
  }
};

export default authMiddleware;