import { toXML } from "jstoxml";
import { v1 as uuidV1 } from "uuid";
import { injectable } from "tsyringe";
import { PipeDriveConnector, BlingConnector } from "../connectors";
import { IOrderBehaviour } from ".";

@injectable()
export class PipeDrive implements IOrderBehaviour {
  constructor(
    private pipeDriveConnector: PipeDriveConnector,
    private blingConnector: BlingConnector
  ) {}

  public async handle(): Promise<void> {
    const ordersFromPipeDrive = await this.pipeDriveConnector.getBusssines();
    const order = this.mountOrder(ordersFromPipeDrive);

    await this.blingConnector.createOrder(order);
  }

  private mountOrder(response: any) {
    let orders = [];

    for (const order of response.data) {
      const orderToJson: any = {
        pedido: {
          cliente: {
            nome: order.person_name,
          },
          volume: {
            servico: "SEDEX - CONTRATO", //TODO - Coloquei estático, pois não é retornado esse valor na request de get deals
          },
          servico: "PAC - CONTRATO", //TODO - Coloquei estático, pois não é retornado esse valor na request de get deals
          itens: {
            item: {
              codigo: uuidV1(),
              descricao: `Produto ${uuidV1()}`, //TODO - Coloquei estático, pois não é retornado esse valor na request de get deals
              qtde: order.products_count,
              vlr_unit: order.weighted_value / order.products_count,
            },
          },
          parcela: {
            data: order.add_time,
            vlr: order.weighted_value,
          },
        },
      };

      orders.push(toXML(orderToJson));
    }

    return orders;
  }
}
