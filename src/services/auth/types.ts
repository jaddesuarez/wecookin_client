import { IRestaurant } from "../restaurants/types";

export interface IAuthData {
  email: string;
  password: string;
}

export interface ILoggedUser {
  _id?: string;
  email: string;
  username: string;
  avatar?: string;
  favoriteRestaurants?: string[];
  role?: string;
}
