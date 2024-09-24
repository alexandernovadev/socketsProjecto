import { Request, Response } from "express";
import { User } from "../models/User";
import { MongoServerError } from "mongodb";
import { comparePassword, encryptPassword } from "../helpers/bycrypt";
import { generateToken } from "../helpers/jwttoken";

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

      const token = generateToken(String(newUser._id));

      return res.json({
        ok: true,
        msg: "User created",
        data: newUser,
        token,
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
    try {
      // Find the user by email
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({
          ok: false,
          msg: "Invalid email or password",
        });
      }

      // Compare the provided password with the stored encrypted password
      const isMatch = comparePassword(password, user.password);

      if (!isMatch) {
        return res.status(400).json({
          ok: false,
          msg: "Invalid email or password",
        });
      }

      // Generate a token for the user
      const token = generateToken(String(user._id));

      return res.json({
        ok: true,
        msg: "Login successful",
        data: user,
        token,
      });
    } catch (error) {
      return res.status(500).json({
        ok: false,
        msg: "Please contact the administrator",
      });
    }
  }

  async renew(req: Request, res: Response): Promise<Response> {

    // @ts-ignore
    const uid = req.uid;

    // Generate a new token
    const token = generateToken(uid);

    // Get the user by id
    const user = await User.findById(uid);


    
    return res.json({
      ok: true,
      msg: "renew token",
      user,
      token
    });
  }
}

export default new AuthController();
