import { container } from "tsyringe";
import { Request, Response, Router } from "express";
import { Pipedrive } from "../handlers";

const pipedriveRoutes = Router();
const pipedrive = container.resolve(Pipedrive);

pipedriveRoutes.get(
  "/opportunities",
  async (request: Request, response: Response) => {
    await pipedrive.handle(response);
  }
);

export { pipedriveRoutes };
