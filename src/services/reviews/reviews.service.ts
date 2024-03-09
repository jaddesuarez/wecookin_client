import { fetch } from "@/infrastructure/config/axios.config";
import { isAxiosError, AxiosResponse } from "axios";
import { ICreateReview } from "./types";
import { IRestaurant } from "../restaurants/types";

const BASE_URL = "/reviews";

export const reviews = {
  createReview: async (
    restaurant_id: string,
    reviewData: ICreateReview
  ): Promise<IRestaurant> => {
    try {
      const res = await fetch.post<IRestaurant, AxiosResponse<IRestaurant>>(
        `${BASE_URL}/${restaurant_id}`,
        reviewData
      );
      return res.data;
    } catch (error) {
      if (isAxiosError(error)) throw error.response?.data.message;
      throw new Error("An error occurred while fetching restaurants");
    }
  },
  deleteReview: async (
    review_id: string,
    restaurant_id: string
  ): Promise<IRestaurant> => {
    try {
      const res = await fetch.delete<IRestaurant, AxiosResponse<IRestaurant>>(
        `${BASE_URL}/${review_id}/${restaurant_id}`
      );
      return res.data;
    } catch (error) {
      if (isAxiosError(error)) throw error.response?.data.message;
      throw new Error("An error occurred while deleting restaurant");
    }
  },
};
