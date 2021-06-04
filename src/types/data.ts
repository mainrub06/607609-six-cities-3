import {IOffer} from "./offer";

export interface IData {
  loadCityOffers: {[key: string]: IOffer[]};
  citiesNames: string[];
  nearOffers: null | IOffer[];
}
