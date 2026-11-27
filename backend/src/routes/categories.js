import { Router } from "express";
import * as Controller from "../domain/categories/controller.js";

const categoryRouter = Router();

categoryRouter.get("/fetch", Controller.FetchController);

categoryRouter.post("/create", Controller.CreateController);

categoryRouter.put("/update/:code", Controller.UpdateController);

categoryRouter.delete("/delete/:code", Controller.DeleteController);

export default categoryRouter;