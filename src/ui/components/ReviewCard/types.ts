export interface ReviewCardProps {
  _id: string;
  comment: string;
  rating: number;
  owner: {
    _id: string;
    username: string;
    avatar: string;
  };
}
