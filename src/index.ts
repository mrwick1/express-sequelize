import dotenv from "@dotenvx/dotenvx";
dotenv.config();
import express from "express";
import rateLimit from "express-rate-limit";
import cors from "cors";
const app = express();
const port = process.env.PORT || 3000;
import helmet from "helmet";
import { logger } from "./config/logger";
import winston from "winston";
import authRoutes from "./routes/auth-routes";
import { loggerMiddleware } from "./middlewares/logger";
import { connect } from "./config/db";

// setup cors for cross origin requests
app.use(cors());

// setup helmet for security headers
app.use(helmet());

// body parser
app.use(express.json());

// setup rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// setup logger
if (process.env.ENVIRONMENT !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
}

// setup logger middleware
app.use(loggerMiddleware);

// default route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// auth routes
app.use("/auth", authRoutes);

// Establish database connection
const startServer = async () => {
  try {
    await connect();
    app.listen(port, () => {
      console.log(`Server running successfully at http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
  }
};

startServer();
