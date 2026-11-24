import { Router } from "express";
import * as Controller from "../domain/categories/controller.js";

const categoryRouter = Router();

categoryRouter.get("/fetch", Controller.FetchController);

categoryRouter.put("/update/:code", Controller.UpdateController);

categoryRouter.post("/create", Controller.CreateController);
categoryRouter.post("/delete/:code", Controller.DeleteController);

export default categoryRouter;