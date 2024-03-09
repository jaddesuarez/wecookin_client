import { IRestaurant } from "@/services/restaurants/types";
export interface ReviewCardProps {
  review: {
    _id: string;
    comment: string;
    rating: number;
    owner: {
      _id: string;
      username: string;
      avatar: string;
    };
  };
  setRestaurant: (value: IRestaurant | null) => void;
}
