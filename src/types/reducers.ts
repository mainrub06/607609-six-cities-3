import { IUser } from "./user";

export interface IReducer {
  data: any;
  main: any;
  user: IUser;
  reviews: any;
  favorites: any;
}
