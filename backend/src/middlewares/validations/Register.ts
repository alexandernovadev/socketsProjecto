import { Request, Response, NextFunction } from "express";
import { check, validationResult } from "express-validator";

// Middleware for validating the registration input
const validateRegister = [
  check("name", "Name is required").not().isEmpty(),
  check("surname", "Surname is required").not().isEmpty(),
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

export default validateRegister;
