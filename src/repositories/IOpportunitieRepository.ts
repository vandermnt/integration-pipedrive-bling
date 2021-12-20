import { OpportunitiesFromMongoDB } from "../model";

export interface IOpportunitieRepository {
  create(totalValue: number, createdAt: string): Promise<void>;
  update(idOpportunitie: any, totalValue: number): Promise<void>;
  findByDate(date: string): Promise<OpportunitiesFromMongoDB>;
  list(): Promise<OpportunitiesFromMongoDB[]>;
}
