import { fetch } from "@/infrastructure/config/axios.config";
import { isAxiosError } from "axios";
import { IReview } from "./types";

const BASE_URL = "/reviews";

export const reviews = {
  createReview: async (restaurant_id: string, reviewData: IReview) => {
    try {
      await fetch.post(`${BASE_URL}/${restaurant_id}`, reviewData);
    } catch (error) {
      if (isAxiosError(error)) throw error.response?.data.message;
      throw new Error("An error occurred while fetching restaurants");
    }
  },
  deleteReview: async (review_id: string) => {
    try {
      await fetch.delete(`${BASE_URL}/delete/${review_id}`);
    } catch (error) {
      if (isAxiosError(error)) throw error.response?.data.message;
      throw new Error("An error occurred while deleting restaurant");
    }
  },
};
