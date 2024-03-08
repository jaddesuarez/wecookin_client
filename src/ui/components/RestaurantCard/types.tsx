export interface IRestaurantCardProps {
  restaurant: {
    _id: string;
    image: string;
    name: string;
  };
  isLiked: boolean;
}
