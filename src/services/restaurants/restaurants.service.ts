import { fetch } from "@/infrastructure/config/axios.config";
import { AxiosResponse, isAxiosError } from "axios";
import { ICreateRestaurant, IRestaurant, IRestaurantAvgRating } from "./types";

const BASE_URL = "/restaurants";

export const restaurants = {
  getAllRestaurants: async (): Promise<IRestaurant[]> => {
    try {
      const res = await fetch.get<IRestaurant[], AxiosResponse<IRestaurant[]>>(
        `${BASE_URL}/getAll`
      );
      return res.data;
    } catch (error) {
      if (isAxiosError(error)) throw error.response?.data.message;
      throw new Error("An error occurred while fetching restaurants");
    }
  },
  getRandomRestaurants: async (): Promise<IRestaurant[]> => {
    try {
      const res = await fetch.get<IRestaurant[], AxiosResponse<IRestaurant[]>>(
        `${BASE_URL}/getRandom`
      );
      return res.data;
    } catch (error) {
      if (isAxiosError(error)) throw error.response?.data.message;
      throw new Error("An error occurred while fetching restaurants");
    }
  },
  getRestaurantById: async (
    restaurant_id: string | string[] | undefined
  ): Promise<IRestaurant> => {
    try {
      const res = await fetch.get<IRestaurant, AxiosResponse<IRestaurant>>(
        `${BASE_URL}/getById/${restaurant_id}`
      );
      return res.data;
    } catch (error) {
      if (isAxiosError(error)) throw error.response?.data.message;
      throw new Error("An error occurred while fetching restaurant");
    }
  },
  getRestaurantAvgRatingById: async (
    restaurant_id: string | string[] | undefined
  ): Promise<IRestaurantAvgRating> => {
    try {
      const res = await fetch.get<
        IRestaurantAvgRating,
        AxiosResponse<IRestaurantAvgRating>
      >(`${BASE_URL}/getAvgRatingById/${restaurant_id}`);
      return res.data;
    } catch (error) {
      if (isAxiosError(error)) throw error.response?.data.message;
      throw new Error("An error occurred while fetching restaurant avg rating");
    }
  },
  createRestaurant: async (
    restaurantData: ICreateRestaurant
  ): Promise<IRestaurant> => {
    try {
      const res = await fetch.post<IRestaurant, AxiosResponse<IRestaurant>>(
        `${BASE_URL}/create`,
        restaurantData
      );
      return res.data;
    } catch (error) {
      if (isAxiosError(error)) throw error.response?.data.message;
      throw new Error("An error occurred while creating restaurant");
    }
  },
  editRestaurant: async (
    restaurant_id: string,
    restaurantData: ICreateRestaurant
  ): Promise<IRestaurant> => {
    try {
      const res = await fetch.put<IRestaurant, AxiosResponse<IRestaurant>>(
        `${BASE_URL}/edit/${restaurant_id}`,
        restaurantData
      );
      return res.data;
    } catch (error) {
      if (isAxiosError(error)) throw error.response?.data.message;
      throw new Error("An error occurred while editing restaurant");
    }
  },
  deleteRestaurant: async (restaurant_id: string) => {
    try {
      const res = await fetch.delete(`${BASE_URL}/delete/${restaurant_id}`);
    } catch (error) {
      if (isAxiosError(error)) throw error.response?.data.message;
      throw new Error("An error occurred while deleting restaurant");
    }
  },
};
