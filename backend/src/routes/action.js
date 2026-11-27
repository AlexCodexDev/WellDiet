import { Router } from "express";
import * as Controller from "../domain/actions/controller.js";

const actionRouter = Router();

actionRouter.get("/fetch", Controller.FetchController);

actionRouter.post("/create", Controller.CreateController);

actionRouter.put("/update/:code", Controller.UpdateController);

actionRouter.delete("/delete/:code", Controller.DeleteController);

export default actionRouter;