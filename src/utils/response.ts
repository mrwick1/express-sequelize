import { Response } from "express";

export const sendResponse = async (
  res: Response,
  statusCode: number,
  success: boolean,
  message: string,
  data: any,
  error: any
) => {
  return res.status(statusCode).json({
    success,
    message,
    data,
    error,
  });
};
