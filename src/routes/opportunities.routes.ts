import { container } from "tsyringe";
import { Request, Response, Router } from "express";
import { Opportunities } from "../handlers";

const opportuniesRoutes = Router();
const opportunities = container.resolve(Opportunities);

opportuniesRoutes.get("/", async (request: Request, response: Response) => {
  await opportunities.getAll(response);
});

export { opportuniesRoutes };
