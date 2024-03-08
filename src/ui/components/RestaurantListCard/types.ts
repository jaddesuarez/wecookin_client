import { ICuisine } from "@/services/cuisines/types";

export interface IRestaurantListCardProps {
  _id: string;
  name: string;
  neighborhood: string;
  cuisineType: ICuisine;
  image: string;
}
