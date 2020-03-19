import {
  getFilteredOffers,
  getCityObj,
  getOffers,
  getAllOffers
} from "../../utils";

export const getloadCityOffers = (state) => state.data.loadCityOffers;
export const getCitiesNames = (state) => state.data.citiesNames;
export const getCity = (state) => {
  return getCityObj(state.data.loadCityOffers, state.main.cityName);
};
export const getOffersDetail = (state) => getAllOffers(state.data.loadCityOffersDetail);
export const getActiveFilter = (state) => state.main.activeFilterItem;
export const getOffersMain = (state) => getFilteredOffers(state.main.activeFilterItem, getOffers(state.data.loadCityOffers, state.main.cityName));
export const getNearOffers = (state) => state.data.nearHotels;
