import { fetch } from "@/infrastructure/config/axios.config";
import { AxiosResponse, isAxiosError } from "axios";
import { IRestaurant } from "../restaurants/types";
import { ILoggedUser } from "../auth/types";

const BASE_URL = "/users";

export const users = {
  getFavoriteRestaurants: async (): Promise<IRestaurant[]> => {
    try {
      const res = await fetch.get<IRestaurant[], AxiosResponse<IRestaurant[]>>(
        `${BASE_URL}/getFavoriteRestaurants`
      );
      return res.data;
    } catch (error) {
      if (isAxiosError(error)) throw error.response?.data.message;
      throw new Error("An error occurred while fetching Favorite Restaurants");
    }
  },
  getMyRestaurants: async (): Promise<IRestaurant[]> => {
    try {
      const res = await fetch.get<IRestaurant[], AxiosResponse<IRestaurant[]>>(
        `${BASE_URL}/getMyRestaurants`
      );
      return res.data;
    } catch (error) {
      if (isAxiosError(error)) throw error.response?.data.message;
      throw new Error("An error occurred while fetching My Restaurants");
    }
  },
  likeRestaurant: async (restaurant_id: string) => {
    try {
      const res = await fetch.put(
        `${BASE_URL}/likeRestaurant/${restaurant_id}`
      );
      return res.data;
    } catch (error) {
      if (isAxiosError(error)) throw error.response?.data.message;
      throw new Error("An error occurred while liking restaurant");
    }
  },
  dislikeRestaurant: async (restaurant_id: string) => {
    try {
      const res = await fetch.put(
        `${BASE_URL}/dislikeRestaurant/${restaurant_id}`
      );
      return res.data;
    } catch (error) {
      if (isAxiosError(error)) throw error.response?.data.message;
      throw new Error("An error occurred while desliking restaurant");
    }
  },
  editUser: async (newUserData: ILoggedUser) => {
    try {
      const res = await fetch.put(`${BASE_URL}/editUser`, newUserData);
    } catch (error) {
      if (isAxiosError(error)) throw error.response?.data.message;
      throw new Error("An error occurred while desliking restaurant");
    }
  },
};
