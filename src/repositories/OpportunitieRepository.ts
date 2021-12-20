import { Opportunities, OpportunitiesFromMongoDB } from "../model";
import { IOpportunitieRepository } from "./IOpportunitieRepository";

export class OpportunitieRepository implements IOpportunitieRepository {
  public async create(totalValue: number, createdAt: string): Promise<void> {
    await Opportunities.create({
      totalValue,
      createdAt,
    });
  }

  public async update(idOpportunitie: any, totalValue: number): Promise<void> {
    await Opportunities.updateOne({ _id: idOpportunitie }, { totalValue });
  }

  public async list(): Promise<OpportunitiesFromMongoDB[]> {
    return Opportunities.find();
  }

  public async findByDate(
    createdAt: string
  ): Promise<OpportunitiesFromMongoDB> {
    return Opportunities.findOne({
      createdAt,
    });
  }
}
