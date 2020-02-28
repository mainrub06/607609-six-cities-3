import mockCityOffers from "./mock/city-offers";
import mockCityOffersDetail from "./mock/city-offers-detail";
import mockReviews from "./mock/reviews";
import {extend, getGrowingArrayByPrice, getFallingArrayByPrice, getTopRated} from "./utils.js";

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
  SET_FILTERED_OFFERS: `SET_FILTERED_OFFERS`,
  ON_OFFER_HOVER: `ON_OFFER_HOVER`
};

const getCityData = (cityIn) => {
  return {
    city: cityIn,
    offers: mockCityOffers[cityIn],
    offersDetail: mockCityOffersDetail[cityIn],
    reviews: mockReviews
  };
};

const getFilteredOffers = (type, city) => {
  switch (type) {
    case `Price: low to high`:
      return {offers: getGrowingArrayByPrice(mockCityOffers[city])};
    case `Price: high to low`:
      return {offers: getFallingArrayByPrice(mockCityOffers[city])};
    case `Top rated first`:
      return {offers: getTopRated(mockCityOffers[city])};
  }
  return {offers: mockCityOffers[city]};
};

const onHoverOffer = (id) => {
  console.log(id);
}

const ActionCreator = {
  changeCity: (city) => ({
    type: ActionType.CHENGE_CITY,
    payload: city
  }),
  setFilteredOffers: (type) => ({
    type: ActionType.SET_FILTERED_OFFERS,
    payload: type
  }),
  onOfferHover: (id) => ({
    type: ActionType.ON_OFFER_HOVER,
    payload: id
  })
};

const reducer = (state = initialState, action)=>{
  switch (action.type) {
    case ActionType.CHENGE_CITY:
      return extend(state, getCityData(action.payload));
    case ActionType.SET_FILTERED_OFFERS:
      return extend(state, getFilteredOffers(action.payload, state.city));
    case ActionType.ON_OFFER_HOVER:
      return extend(state, onHoverOffer(action.payload))
  }
  return state;
};

export {reducer, ActionType, ActionCreator};
