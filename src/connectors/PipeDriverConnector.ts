import "dotenv/config";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

export class PipeDriveConnector {
  public async getBusssines() {
    const requestOptions = this.mountRequestGetDeals();

    try {
      const response: AxiosResponse = await axios(requestOptions);

      return response.data;
    } catch (error) {
      throw error;
    }
  }

  private mountRequestGetDeals(): AxiosRequestConfig {
    return {
      method: "get",
      url: `${process.env.COMPANY_DOMAIN_URL}deals`,
      params: {
        api_token: process.env.TOKEN,
        status: "won",
      },
    };
  }
}
