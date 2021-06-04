import {IOffer} from "./offer";
import {IReview} from "./reviews";

export interface IMain {
  cityName: string;
  offers: IOffer[];
  offersDetail: IOffer;
  reviews: IReview[];
  activeFilterItem: string;
  activeOfferId: string;
};
