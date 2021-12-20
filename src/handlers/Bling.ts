import { injectable } from "tsyringe";
import { OpportunitieRepository } from "../repositories";

@injectable()
export class Bling {
  constructor(private opportunitieRepository: OpportunitieRepository) {}

  public async handle(ordersFromPipeDrive: any): Promise<void> {
    if (!ordersFromPipeDrive.data.length) {
      return;
    }

    for (const order of ordersFromPipeDrive.data) {
      const existsOpportunities = await this.opportunitieRepository.findByDate(
        new Date(order.add_time).toLocaleDateString()
      );

      if (existsOpportunities) {
        console.log(`Oportunidade existente ${existsOpportunities}`);
        const newTotal = existsOpportunities.totalValue + order.weighted_value;
        await this.opportunitieRepository.update(
          existsOpportunities._id,
          newTotal
        );

        continue;
      }

      const formatDate = new Date(order.add_time).toLocaleDateString();

      await this.opportunitieRepository.create(
        order.weighted_value,
        formatDate
      );
    }
  }
}
