import { IRestaurant } from "@/services/restaurants/types";

export interface EditRestaurantFormProps {
  loadData: () => void;
  restaurant: IRestaurant | null;
}
