import { Response } from "express";
import { injectable } from "tsyringe";
import { OpportunitieRepository } from "../repositories";

@injectable()
export class Opportunities {
  constructor(private opportunitiesRepository: OpportunitieRepository) {}

  public async getAll(response: Response): Promise<Response> {
    const opportunies = await this.opportunitiesRepository.list();
    return response.status(200).send(opportunies);
  }
}
