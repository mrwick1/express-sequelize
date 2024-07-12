import { Request, Response } from "express";
import { sendResponse } from "../utils/response";

export const signUp = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    await sendResponse(
      res,
      200,
      true,
      "User signed up successfully",
      { email },
      null
    );
  } catch (error) {
    sendResponse(res, 500, false, "Internal Server Error", null, error);
  }
};
