import {
  getFilteredOffers,
  getCityObj,
  getFirstCity,
  getOffers
} from "../../utils";

export const getloadCityOffers = (state) => state.data.loadCityOffers;
export const getCitiesNames = (state) => state.data.citiesNames;
export const getCity = (state) => {
  return getCityObj(state.data.loadCityOffers, state.main.cityName);
};
export const getOffersDetail = (state) => getOffers(state.data.loadCityOffersDetail, state.main.cityName);
export const getActiveFilter = (state) => state.main.activeFilterItem;
export const getOffersMain = (state) => getFilteredOffers(state.main.activeFilterItem, getOffers(state.data.loadCityOffers, state.main.cityName));
