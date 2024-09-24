import { Request, Response } from "express";
import { User } from "../models/User";
import { MongoServerError } from "mongodb";
import { encryptPassword } from "../helpers/bycrypt";

class AuthController {
  async register(req: Request, res: Response): Promise<Response> {
    const { name, surname, email, password } = req.body;

    try {
      // Create a new user
      const newUser = await User.create({
        name,
        surname,
        email,
        password: encryptPassword(password),
      });

      return res.json({
        ok: true,
        msg: "User created",
        data: newUser,
      });
    } catch (error) {
      // Check if the error is a MongoDB duplicate key error (code 11000)
      if (error instanceof MongoServerError && error.code === 11000) {
        return res.status(400).json({
          ok: false,
          msg: "Email already exists",
        });
      }

      return res.status(500).json({
        ok: false,
        msg: "Please contact the administrator",
      });
    }
  }

  async login(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;
    return res.json({
      ok: true,
      msg: "login",
      email,
      password,
    });
  }

  async renew(req: Request, res: Response): Promise<Response> {
    return res.json({
      ok: true,
      msg: "renew",
    });
  }
}

export default new AuthController();
