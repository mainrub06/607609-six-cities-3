import { IUser } from "./user";
import { IReviewsReducer } from "./reviews";
import { IFavorites } from "./favorites";
import {IData} from "./data";
import {IMain} from "./main";

export interface IReducer {
  data: IData;
  main: IMain;
  user: IUser;
  reviews: IReviewsReducer;
  favorites: IFavorites;
}

export interface IRootApp {
  state: IReducer;
}
