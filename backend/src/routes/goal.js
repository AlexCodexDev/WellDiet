import { Router } from "express";
import * as Controller from "../domain/goals/controller.js";

const goalRouter = Router();

goalRouter.get("/fetch", Controller.FetchController);

goalRouter.post("/create", Controller.CreateController);

goalRouter.put("/update/:code", Controller.UpdateController);

goalRouter.delete("/delete/:code", Controller.DeleteController);

export default goalRouter;