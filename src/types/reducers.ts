import { IUser } from "./user";
import { IReviewsReducer } from "./reviews";

export interface IReducer {
  data: any;
  main: any;
  user: IUser;
  reviews: IReviewsReducer;
  favorites: any;
}
