import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import errorMiddleware from "./middlewares/error.middleware.js";
import notFoundMiddleware from "./middlewares/notFound.middleware.js";
import router from "./router/index.js";

const app = express();

app.use(helmet());

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", router);

app.use(notFoundMiddleware);

app.use(errorMiddleware);

export default app;
