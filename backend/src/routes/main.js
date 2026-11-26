import { Router } from "express";
import authRouter from "./auth.js";
import categoryRouter from "./categories.js";
import factRoute from "./fact.js";

const router = Router();

router.use("/auth", authRouter);
router.use("/category", categoryRouter);
router.use('/fact', factRoute);

export default router;