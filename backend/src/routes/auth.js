import { Router } from "express";
import { authenticate } from "../middleware/auth";
import * as Controller from "../domain/auth/controller";

const authRouter = Router();

authRouter.post("/register", Controller.RegisterController);
authRouter.post("/login", Controller.LoginController);
authRouter.post("/logout", Controller.LogoutController);

authRouter.get("/me", authenticate, (req, res) => {
    res.json({
        user: req.user
    });
});

export default authRouter;