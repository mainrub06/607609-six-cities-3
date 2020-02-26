import mockCityOffers from "./mock/city-offers";
import mockCityOffersDetail from "./mock/city-offers-detail";
import mockReviews from "./mock/reviews";
import {extend} from "./utils.js";

const initialCity = Object.keys(mockCityOffers)[0];
const initialCityOffers = mockCityOffers[initialCity];
const initialCityOffersDetail = mockCityOffersDetail[initialCity];

const initialState = {
  city: initialCity,
  offers: initialCityOffers,
  offersDetail: initialCityOffersDetail,
  reviews: mockReviews
};

const ActionType = {
  CHENGE_CITY: `CHENGE_CITY`,
  GET_CITY_OFFERS: `GET_CITY_OFFERS`,
  GET_CITY_OFFERS_DETAIL: `GET_CITY_OFFERS_DETAIL`
};

const ActionCreator = {
  changeCity: (city) => ({
    type: ActionType.CHENGE_CITY,
    payload: city
  }),

  getCityOffers: (city) => ({
    type: ActionType.GET_CITY_OFFERS,
    payload: mockCityOffers[city]
  }),

  getCityOffersDetail: (city) => ({
    type: ActionType.GET_CITY_OFFERS_DETAIL,
    payload: mockCityOffersDetail[city]
  })
};

const reducer = (state = initialState, action)=>{
  switch (action.type) {
    case ActionType.CHENGE_CITY:
      return extend(state, {city: action.payload});
    case ActionType.GET_CITY_OFFERS:
      return extend(state, {offers: action.payload});
    case ActionType.GET_CITY_OFFERS_DETAIL:
      return extend(state, {offersDetail: action.payload});
  }
  return state;
};

export {reducer, ActionType, ActionCreator};
