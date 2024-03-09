export interface IReview {
  _id: string;
  comment: string;
  rating: number;
  owner: {
    _id: string;
    username: string;
    avatar: string;
  };
}

export interface ICreateReview {
  comment: string;
  rating: number;
}
