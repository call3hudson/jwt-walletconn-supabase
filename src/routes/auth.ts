import { authMiddleware } from "../utils/jwt/jwt";
import express, { Request, Response } from "express";
import { loginHandler } from "../controllers";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  return res.status(200).json({
    success: true,
  });
});

router.get("/auth", authMiddleware, (req: Request, res: Response) => {
  return res.status(200).json({
    walletAddress: req.walletAddress,
  });
});

router.post("/login", loginHandler);

export default router;
