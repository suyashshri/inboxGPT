import { Router } from "express";
import {
  googleCallback,
  saveToken,
  startGoogleAuth,
} from "../controllers/auth.controller";

const router = Router();

router.get("/google", startGoogleAuth);
router.get("/google/callback", googleCallback);
router.post("/save-token", saveToken);

export default router;
