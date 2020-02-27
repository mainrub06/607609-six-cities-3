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
  CHENGE_CITY: `CHENGE_CITY`
};

const getCityData = (cityIn) => {
  return {
    city: cityIn,
    offers: mockCityOffers[cityIn],
    offersDetail: mockCityOffersDetail[cityIn],
    reviews: mockReviews
  };
};

const ActionCreator = {
  changeCity: (city) => ({
    type: ActionType.CHENGE_CITY,
    payload: city
  })
};

const reducer = (state = initialState, action)=>{
  switch (action.type) {
    case ActionType.CHENGE_CITY:
      return extend(state, getCityData(action.payload));
  }
  return state;
};

export {reducer, ActionType, ActionCreator};
