import axios, { AxiosError } from "axios";
import { Currency, HisoryResponse } from "context";

class CoincapAPI {
  public async getCurrencies(limit: number): Promise<Currency[]> {
    try {
      const response = await axios.get(`https://api.coincap.io/v2/assets?limit=${limit}`);
      return response.data.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        throw new Error(`Failed to fetch currencies: ${axiosError.response?.statusText}`);
      }
      const genericError = error as Error;
      throw new Error(`Failed to fetch currencies: ${genericError.message}`);
    }
  }
  public async getBasicCurrencies(): Promise<Currency[]> {
    try {
      const response = await axios.get(`https://api.coincap.io/v2/assets?limit=3`);
      return response.data.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        throw new Error(`Failed to fetch currencies: ${axiosError.response?.statusText}`);
      }
      const genericError = error as Error;
      throw new Error(`Failed to fetch currencies: ${genericError.message}`);
    }
  }
  public async getCurrencyDetails(id: string): Promise<Currency> {
    try {
      const response = await axios.get(`https://api.coincap.io/v2/assets/${id}`);
      return response.data.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        throw new Error(`Failed to fetch currencies: ${axiosError.response?.statusText}`);
      }
      const genericError = error as Error;
      throw new Error(`Failed to fetch currencies: ${genericError.message}`);
    }
  }
  public async getCurrencyHistory(id: string): Promise<HisoryResponse> {
    try {
      const response = await axios.get(
        `https://api.coincap.io/v2/assets/${id}/history?interval=d1`,
      );
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        throw new Error(`Failed to fetch currencies: ${axiosError.response?.statusText}`);
      }
      const genericError = error as Error;
      throw new Error(`Failed to fetch currencies: ${genericError.message}`);
    }
  }
}

export const coincapAPI = new CoincapAPI();
