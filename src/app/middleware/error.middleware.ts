import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { handleZodError } from "../errors/handleZodError";
import ApiError from "../errors/ApiError";

const errorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500;
  let message = "Internal Server Error";
  let errors: any[] | undefined;

  /* ===== ZOD ERROR ===== */
  if (err instanceof ZodError) {
    const formatted = handleZodError(err);
    statusCode = formatted.statusCode;
    message = formatted.message;
    errors = formatted.errors;
  } else if (err instanceof ApiError) {
    /* ===== API / CUSTOM ERROR ===== */
    statusCode = err.statusCode;
    message = err.message;
  } else if (err instanceof Error) {
    /* ===== DEFAULT ERROR ===== */
    message = err.message;
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(errors && { errors }),
  });
};

export default errorMiddleware;
