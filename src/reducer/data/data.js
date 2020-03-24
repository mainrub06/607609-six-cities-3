import {extend, getFilteredData, getFavoriteTargetByCityAndId, getNearHotelsIdWithActiveHotel} from "../../utils.js";

const initialState = {
  loadCityOffers: null,
  citiesNames: null,
  loadCityOffersDetail: null,
  nearHotels: null
};

const ActionType = {
  LOAD_OFFERS: `LOAD_OFFERS`,
  CHANGE_FAVORITE_BY_ID: `CHANGE_FAVORITE_BY_ID`,
  GET_NEAR_HOTELS: `GET_NEAR_HOTELS`
};

const ActionCreator = {
  loadOffers: (offers) => ({
    type: ActionType.LOAD_OFFERS,
    payload: offers
  }),
  changeFavoriteById: (obj) => ({
    type: ActionType.CHANGE_FAVORITE_BY_ID,
    payload: obj
  }),
  getNearHotels: (hotels) => ({
    type: ActionType.GET_NEAR_HOTELS,
    payload: hotels
  })
};

const Operation = {
  loadOffers: () => (dispatch, getState, api) => {
    return api.get(`/hotels`)
      .then((response) => {
        dispatch(ActionCreator.loadOffers(response.data));
      });
  },
  getNearHotels: (id) => (dispatch, getState, api) => {
    return api.get(`/hotels/${id}/nearby`)
      .then((response) => {
        dispatch(ActionCreator.getNearHotels(getNearHotelsIdWithActiveHotel(getState(), id, response.data)));
      });
  }
};


const start = `start`;

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_OFFERS:
      return extend(state, getFilteredData(action.payload));
    case ActionType.CHANGE_FAVORITE_BY_ID:
      return extend(state, {loadCityOffers: getFavoriteTargetByCityAndId(state.loadCityOffers, action.payload), loadCityOffersDetail: getFavoriteTargetByCityAndId(state.loadCityOffersDetail, action.payload)}); // start here
    case ActionType.GET_NEAR_HOTELS:
      return extend(state, {nearHotels: action.payload});
  }
  return state;
};

export {reducer, Operation, ActionType, ActionCreator};
