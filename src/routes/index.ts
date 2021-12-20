import { Router } from "express";
import * as db from "../database";
import { pipedriveRoutes } from "./pipedrive.routes";
import { opportuniesRoutes } from "./opportunities.routes";

db.connect();
const routes = Router();

routes.use("/pipedrive", pipedriveRoutes);
routes.use("/opportunities", opportuniesRoutes);

export { routes };
