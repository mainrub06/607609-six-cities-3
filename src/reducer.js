import mockCityOffers from "./mock/city-offers";
import {extend} from "./utils.js";

const initialCity = Object.keys(mockCityOffers)[0];
const initialCityOffers = mockCityOffers[initialCity];

const initialState = {
  city: initialCity,
  offers: initialCityOffers
}

const ActionType = {
  CHENGE_CITY: `CHENGE_CITY`,
  GET_CITY_OFFERS: `GET_CITY_OFFERS`,
};

const ActionCreator = {
  changeCity: (city) => ({
    type: ActionType.CHENGE_CITY,
    payload: city
  }),

  getCityOffers: (city) => ({
    type: ActionType.GET_CITY_OFFERS,
    payload: mockCityOffers[city]
  })
};

const reducer = (state = initialState, action)=>{
  switch (action.type) {
    case ActionType.CHENGE_CITY:
      return extend(state, {city: action.payload});
    case ActionType.GET_CITY_OFFERS:
      return extend(state, {cityOffers: action.payload});
  }
  return state;
};

export {reducer, ActionType, ActionCreator};
