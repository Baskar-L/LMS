import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/authRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import enrollmentRoutes from "./routes/enrollmentRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import shopifyRoutes from "./routes/shopifyRoutes.js";

import errorMiddleware from "./middleware/errorMiddleware.js";

const app = express();

app.use(helmet());

app.use(cors());

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(cookieParser());

app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.json({
    success: true,
    message:
      "Shopify LMS API Running",
  });
});

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/courses",
  courseRoutes
);

app.use(
  "/api/students",
  studentRoutes
);

app.use(
  "/api/enrollments",
  enrollmentRoutes
);

app.use(
  "/api/dashboard",
  dashboardRoutes
);

app.use(
  "/api/shopify",
  shopifyRoutes
);

app.use(errorMiddleware);

export default app;