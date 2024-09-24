import { Request, Response, NextFunction } from "express";
import { check, validationResult } from "express-validator";

// Middleware for validating login input
const validateLogin = [
  check("email", "Please include a valid email").isEmail(),
  check("password", "Password must be at least 6 characters long").isLength({
    min: 6,
  }),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ ok: false, errors: errors.array() });
    }
    next();
  },
];

export default validateLogin;
