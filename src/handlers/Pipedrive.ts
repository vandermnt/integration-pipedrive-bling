import { toXML } from "jstoxml";
import { v1 as uuidV1 } from "uuid";
import { container, injectable } from "tsyringe";
import { PipedriveConnector, BlingConnector } from "../connectors";
import { Bling } from ".";
import { Response } from "express";

@injectable()
export class Pipedrive {
  public bling;

  constructor(
    private pipedriveConnector: PipedriveConnector,
    private blingConnector: BlingConnector
  ) {
    this.bling = container.resolve(Bling);
  }

  public async handle(response: Response): Promise<Response> {
    try {
      const ordersFromPipeDrive = await this.pipedriveConnector.getBussines();
      const order = this.translate(ordersFromPipeDrive);

      await this.blingConnector.createOrder(order);
      await this.bling.handle(ordersFromPipeDrive);

      return response
        .status(200)
        .send(
          "Estamos processando/enviando seus pedidos da Pipedrive para Bling, confira em instantes na Bling!"
        );
    } catch (error: any) {
      const statusText = error.response?.statusText ?? "Unknow error";
      const platform = error.response?.config?.url;

      if (platform.includes("pipedrive")) {
        return response
          .status(error.response.status)
          .send(`[PIPEDRIVE] - ${statusText}`);
      }

      if (platform.includes("bling")) {
        return response
          .status(error.response.status)
          .send(`[BLING] - ${statusText}`);
      }

      return response.status(error.response.status).send(statusText);
    }
  }

  private translate(ordersFromPipeDrive: any): any[] {
    let orders = [];

    for (const order of ordersFromPipeDrive.data) {
      const orderToJson = {
        pedido: {
          cliente: {
            nome: order.person_name,
          },
          volume: {
            servico: "SEDEX - CONTRATO", //TODO - Coloquei estático, pois não é retornado esse valor na request de get /deals
          },
          servico: "PAC - CONTRATO", //TODO - Coloquei estático, pois não é retornado esse valor na request de get /deals
          itens: {
            item: {
              codigo: uuidV1(),
              descricao: `Produto ${uuidV1()}`, //TODO - Coloquei estático, pois não é retornado esse valor na request de get /deals
              qtde: order.products_count,
              vlr_unit: order.weighted_value / order.products_count,
            },
          },
          parcela: {
            data: new Date(order.add_time).toLocaleDateString(),
            vlr: order.weighted_value,
          },
        },
      };

      orders.push(toXML(orderToJson));
    }
    return orders;
  }
}
