import { IUser } from "./user";
import { IReviewsReducer } from "./reviews";
import { IFavorites } from "./favorites";

export interface IReducer {
  data: any;
  main: any;
  user: IUser;
  reviews: IReviewsReducer;
  favorites: IFavorites;
}
