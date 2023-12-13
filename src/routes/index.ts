import { default as express } from "express";
import { default as auth } from "./auth";

const router = express.Router();

router.use("/auth", auth);

router.use("*", (req, res) => {
  res.status(404).json({
    errors: {
      msg: "URL_NOT_FOUND",
    },
  });
});

export default router;
