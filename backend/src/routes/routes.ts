import { Router } from "express";
import authRoutes from "./auth.routes";
import emailRoutes from "./email.routes";
import aiRoutes from "./ai.routes";
import taskRoutes from "./task.routes";
import userRoutes from "./user.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/emails", emailRoutes);
router.use("/ai", aiRoutes);
router.use("/tasks", taskRoutes);
router.use("/user", userRoutes);

export default router;
