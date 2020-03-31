import mockReviews from "../../mock/reviews";
import {extend} from "../../utils.js";
import {OFFERS_SORT_ITEMS} from "../../const";


const initialState = {
  cityName: `Paris`,
  offers: null,
  offersDetail: null,
  reviews: mockReviews,
  activeFilterItem: OFFERS_SORT_ITEMS[0],
  activeOfferId: null
};

const ActionType = {
  CHENGE_CITY: `CHENGE_CITY`,
  SET_FILTERED_OFFERS: `SET_FILTERED_OFFERS`,
  SET_ACTIVE_OFFER_ID: `SET_ACTIVE_HOTEL_ID`
};

const ActionCreator = {
  changeCity: (city) => ({
    type: ActionType.CHENGE_CITY,
    payload: city
  }),
  setActiveFilter: (type) => ({
    type: ActionType.SET_FILTERED_OFFERS,
    payload: type
  }),
  setActiveOfferId: (id) => ({
    type: ActionType.SET_ACTIVE_OFFER_ID,
    payload: id
  })
};

const reducer = (state = initialState, action)=>{
  switch (action.type) {
    case ActionType.CHENGE_CITY:
      return extend(state, action.payload);
    case ActionType.SET_FILTERED_OFFERS:
      return extend(state, action.payload);
    case ActionType.SET_ACTIVE_OFFER_ID:
      return extend(state, action.payload);
  }
  return state;
};

export {reducer, ActionType, ActionCreator};
