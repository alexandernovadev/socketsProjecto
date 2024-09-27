import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const generateToken = (uid: string) => {
  return jwt.sign(
    {
      uid,
    },
    process.env.JWT_SECRET as string,
    { expiresIn: "30d" }
  );
};

export const validateToken = (token: string) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET as string);
  } catch (error) {
    return null;
  }
};

export const comprobarJWT = (token = "") => {
  try {
    // @ts-ignore
    const { uid } = jwt.verify(token, process.env.JWT_SECRET || "");

    return [true, uid];
  } catch (error) {
    return [false, null];
  }
};
