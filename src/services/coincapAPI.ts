import axios, { AxiosError } from "axios";
import { Currency, HisoryResponse } from "context";

class CoincapAPI {
  private readonly BASE_URL = process.env.REACT_APP_SERVICES_COINCAP_API_BASE_URL;
  public async getCurrencies(limit: number): Promise<Currency[]> {
    try {
      const response = await axios.get(`${this.BASE_URL}?limit=${limit}`);
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
      const response = await axios.get(`${this.BASE_URL}?limit=3`);
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
      const response = await axios.get(`${this.BASE_URL}/${id}`);
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
      const response = await axios.get(`${this.BASE_URL}/${id}/history?interval=d1`);
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
