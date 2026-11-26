import { Router } from "express";
import * as Controller from "../domain/facts/controller.js";

const factRoute = Router();

factRoute.get("/fetch", Controller.FetchController);

factRoute.put("/update/:code", Controller.UpdateController);

factRoute.post("/create", Controller.CreateController);
factRoute.post("/delete/:code", Controller.DeleteController);

export default factRoute;