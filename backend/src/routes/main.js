import { Router } from "express";
import authRouter from "./auth.js";
import categoryRouter from "./categories.js";
import factRouter from "./fact.js";
import goalRouter from "./goal.js";
import actionRouter from "./action.js";

const router = Router();

router.use("/auth", authRouter);
router.use("/category", categoryRouter);
router.use('/fact', factRouter);
router.use("/goal", goalRouter);
router.use("/action", actionRouter);

export default router;