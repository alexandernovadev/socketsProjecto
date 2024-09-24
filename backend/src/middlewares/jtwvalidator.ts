import { Request, Response, NextFunction } from "express";
import { validateToken } from "../helpers/jwttoken";

export const validateJWT = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: "Token is required",
    });
  }

  try {
    const payload = validateToken(token);
    // @ts-ignore
    req.uid = payload.uid;
    next();
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: "Invalid token",
    });
  }
};
