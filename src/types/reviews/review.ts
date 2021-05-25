import { IUser } from "./review-user";

export interface IReview {
  id: number;
  rate: number;
  comment: string;
  date: string;
  user: IUser;
}
