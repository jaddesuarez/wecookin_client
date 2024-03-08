import { ILoggedUser } from "@/services/auth/types";
import { ICuisine } from "@/services/cuisines/types";
import { IReview } from "@/services/reviews/types";

export interface IRestaurantProps {
  _id: string;
  name: string;
  address: string;
  neighborhood: string;
  location?: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  image: string;
  cuisineType: ICuisine;
  operatingHours: {
    Monday: { hours: string; isOpen: boolean };
    Tuesday: { hours: string; isOpen: boolean };
    Wednesday: { hours: string; isOpen: boolean };
    Thursday: { hours: string; isOpen: boolean };
    Friday: { hours: string; isOpen: boolean };
    Saturday: { hours: string; isOpen: boolean };
    Sunday: { hours: string; isOpen: boolean };
  };
  owner: string;
  reviews: IReview[];
}
