import { Router } from "express";
import authRouter from "./auth.js";
import categoryRouter from "./categories.js";
import factRouter from "./fact.js";
import goalRouter from "./goal.js";

const router = Router();

router.use("/auth", authRouter);
router.use("/category", categoryRouter);
router.use('/fact', factRouter);
router.use("/goal", goalRouter);

export default router;