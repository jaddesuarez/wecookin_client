import { ICuisine } from "../cuisines/types";
import { ILoggedUser } from "../auth/types";
import { IReview } from "../reviews/types";

export interface IRestaurant {
  _id: string;
  name: string;
  address: string;
  neighborhood: string;
  location: {
    type: string;
    coordinates: {
      lat: number;
      lng: number;
    };
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

export interface ICreateRestaurant {
  name: string;
  address: string;
  neighborhood: string;
  location: {
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  image: string;
  cuisineType: string;
  operatingHours: {
    Monday: { hours: string; isOpen: boolean };
    Tuesday: { hours: string; isOpen: boolean };
    Wednesday: { hours: string; isOpen: boolean };
    Thursday: { hours: string; isOpen: boolean };
    Friday: { hours: string; isOpen: boolean };
    Saturday: { hours: string; isOpen: boolean };
    Sunday: { hours: string; isOpen: boolean };
  };
}

export interface IRestaurantAvgRating {
  rating: number;
  totalRevirews: number;
}
