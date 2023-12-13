import { Request, Response } from "express";
import { validateCredentials } from "../validations/auth";
import { generateJwtToken } from "../utils/jwt/jwt";
import { RequestHandler } from "express";

export const loginHandler: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const user = await validateCredentials(req.body);
  if (!user) {
    return res.status(401).send("Invalid credentials");
  }

  const token = generateJwtToken(user.wallet_address);
  return res.json({ success: true, token });
};
