import { fetch } from "@/infrastructure/config/axios.config";
import { AxiosResponse, isAxiosError } from "axios";
import { ICuisine } from "./types";

const BASE_URL = "/cuisines";

export const cuisines = {
  getAllCuisines: async (): Promise<ICuisine[]> => {
    try {
      const res = await fetch.get<ICuisine[], AxiosResponse<ICuisine[]>>(
        BASE_URL
      );
      return res.data;
    } catch (error) {
      if (isAxiosError(error)) throw error.response?.data.message;
      throw new Error("An error occurred while fetching cuisines");
    }
  },
};
