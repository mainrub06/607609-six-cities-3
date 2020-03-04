import mockCityOffers from "../../mock/city-offers";
import mockCityOffersDetail from "../../mock/city-offers-detail";
import mockReviews from "../../mock/reviews";
import {extend} from "../../utils.js";
import {OFFERS_SORT_ITEMS} from "../../const";

const initialCity = Object.keys(mockCityOffers)[0];
const initialCityOffers = mockCityOffers[initialCity];
const initialCityOffersDetail = mockCityOffersDetail[initialCity];

const initialState = {
  city: initialCity,
  offers: initialCityOffers,
  offersDetail: initialCityOffersDetail,
  reviews: mockReviews,
  cities: mockCityOffers,
  citiesDetail: mockCityOffersDetail,
  activeFilterItem: OFFERS_SORT_ITEMS[0]
};

const ActionType = {
  CHENGE_CITY: `CHENGE_CITY`,
  SET_FILTERED_OFFERS: `SET_FILTERED_OFFERS`
};

const ActionCreator = {
  changeCity: (city) => ({
    type: ActionType.CHENGE_CITY,
    payload: city
  }),
  setActiveFilter: (type) => ({
    type: ActionType.SET_FILTERED_OFFERS,
    payload: type
  })
};

const reducer = (state = initialState, action)=>{
  switch (action.type) {
    case ActionType.CHENGE_CITY:
      return extend(state, action.payload);
    case ActionType.SET_FILTERED_OFFERS:
      return extend(state, action.payload);
  }
  return state;
};

export {reducer, ActionType, ActionCreator};
