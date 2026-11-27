import { Router } from "express";
import * as Controller from "../domain/facts/controller.js";

const factRouter = Router();

factRouter.get("/fetch", Controller.FetchController);

factRouter.post("/create", Controller.CreateController);

factRouter.put("/update/:code", Controller.UpdateController);

factRouter.delete("/delete/:code", Controller.DeleteController);

export default factRouter;