import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export type AuthUser = { userId: string; role: "USER" | "ADMIN" };

export interface AuthedRequest extends Request {
  user?: AuthUser;
}

export const requireAuth = (req: AuthedRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.replace("Bearer ", "");
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET!) as AuthUser;
    next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export const requireAdmin = (req: AuthedRequest, res: Response, next: NextFunction) => {
  if (req.user?.role !== "ADMIN") return res.status(403).json({ message: "Admins only" });
  next();
};
