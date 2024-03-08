import { IRestaurant } from "@/services/restaurants/types";

export interface IDataDisplayProps {
  favoriteRestaurants?: IRestaurant[];
  myRestaurants?: IRestaurant[];
  isAdmin: boolean;
}
