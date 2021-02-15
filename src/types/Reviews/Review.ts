import { IUser } from "./User";

export interface IReview {
  id: number;
  rate: number;
  comment: string;
  date: string;
  user: IUser;
}
