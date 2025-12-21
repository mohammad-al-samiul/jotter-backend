import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { env } from "../../config";
import ApiError from "../../errors/ApiError";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new ApiError(401, "Unauthorized");
  }

  const token = authHeader.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : authHeader;

  if (!token) {
    throw new ApiError(401, "Unauthorized");
  }

  try {
    const decoded = jwt.verify(token, env.jwtSecret) as JwtPayload & {
      userId: string;
    };

    req.user = decoded;
    next();
  } catch {
    throw new ApiError(401, "Invalid or expired token");
  }
};

export default authMiddleware;
