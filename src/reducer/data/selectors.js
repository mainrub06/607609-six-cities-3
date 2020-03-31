import {
  getFilteredOffers,
  getCityObj,
  getOffers,
  getAllOffers,
  getOfferById
} from "../../utils";

export const getloadCityOffers = (state) => state.data.loadCityOffers;

export const getCitiesNames = (state) => state.data.citiesNames;

export const getCity = (state) => {
  return getCityObj(state.data.loadCityOffers, state.main.cityName);
};

export const getActiveFilter = (state) => state.main.activeFilterItem;

export const getOffersMain = (state) => getFilteredOffers(state.main.activeFilterItem, getOffers(state.data.loadCityOffers, state.main.cityName));

export const getNearOffers = (state) => {
  if (state.data.nearOffers) {
    return state.data.nearOffers.map((id) => getAllOffers(state.data.loadCityOffers).find((offer) => offer.id === id));
  }
  return null;
};

export const getOffer = (state, ownProps) => {
  if (state.data.loadCityOffers) {
    return getOfferById(state.data.loadCityOffers, ownProps.match.params.id);
  }
  return null;
};
