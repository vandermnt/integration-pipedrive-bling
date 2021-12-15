import "dotenv/config";
import axios, { AxiosRequestConfig } from "axios";

export class BlingConnector {
  constructor() {}

  public async createOrder(orders: any): Promise<void> {
    for (const index in orders) {
      const requestOptions = this.mountPostRequest(orders[index]);

      try {
        await axios(requestOptions);
      } catch (error) {
        throw error
      }
    }
  }

  private mountPostRequest(order: any): AxiosRequestConfig {
    return {
      method: "post",
      url: `${process.env.BLING_URL_API}`,
      params: {
        apikey: process.env.API_KEY,
        xml: order,
      },
    };
  }
}
