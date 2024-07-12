import { NextFunction, Request, Response } from "express";
import { logger } from "../config/logger";

export const loggerMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const startTime = process.hrtime();

  res.on("finish", () => {
    const [seconds, nanoseconds] = process.hrtime(startTime);
    const responseTime = (seconds * 1e9 + nanoseconds) / 1e6; // Convert to milliseconds

    const logDetails = {
      clientIp: req.ip,
      method: req.method,
      url: req.originalUrl,
      status: res.statusCode,
      responseTime: `${responseTime.toFixed(2)} ms`,
      userAgent: req.get("User-Agent") || "Unknown",
    };

    logger.info(JSON.stringify(logDetails));
  });

  next();
};
