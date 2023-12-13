import { RequestHandler, Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const generateJwtToken = (wallet_address: string) => {
  // Create a payload object with user ID and expiration
  const payload = {
    walletAddress: wallet_address,
    expires: new Date().getTime() + 10 * 60 * 1000,
  }; // 10 minutes

  // Create a JSON Web Signature object
  return `Bearer ${jwt.sign(payload, process.env.JWT_SECRET ?? "JWT_SECRET", {
    expiresIn: "10m",
  })}`; // '10m' for 10 minutes
};

declare module "express-serve-static-core" {
  interface Request {
    walletAddress?: string;
  }
}

interface JwtPayload {
  walletAddress: string;
}

export const authMiddleware: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Check for a JWT token in the Authorization header
  const authorizationHeader = req.headers.authorization;
  if (!authorizationHeader || !/Bearer .*/.test(authorizationHeader)) {
    res.status(401).send("Missing or invalid authorization header");
    return;
  }

  // Extract the JWT token from the header
  const token = authorizationHeader.split(" ")[1];

  // Validate the JWT token using the secret
  try {
    const payload = jwt.verify(
      token,
      process.env.JWT_SECRET ?? "JWT_SECRET"
    ) as JwtPayload;
    const walletAddress = payload.walletAddress;

    req.walletAddress = walletAddress;
    next();
  } catch (error) {
    res.status(401).send("Invalid JWT token");
  }
};
