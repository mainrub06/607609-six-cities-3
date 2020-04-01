import {extend, getFilteredData, getFavoriteTargetByCityAndId, getNearHotelsIdWithActiveHotel} from "../../utils.js";

const initialState = {
  loadCityOffers: null,
  citiesNames: null,
  nearOffers: null
};

const ActionType = {
  LOAD_OFFERS: `LOAD_OFFERS`,
  CHANGE_FAVORITE_BY_ID: `CHANGE_FAVORITE_BY_ID`,
  GET_NEAR_OFFERS: `GET_NEAR_OFFERS`
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
  getNearOffers: (offers) => ({
    type: ActionType.GET_NEAR_OFFERS,
    payload: offers
  })
};

const Operation = {
  loadOffers: () => (dispatch, getState, api) => {
    return api.get(`/hotels`)
      .then((response) => {
        dispatch(ActionCreator.loadOffers(response.data));
      });
  },
  getNearOffers: (id) => (dispatch, getState, api) => {
    return api.get(`/hotels/${id}/nearby`)
      .then((response) => {
        dispatch(ActionCreator.getNearOffers(getNearHotelsIdWithActiveHotel(getState(), id, response.data)));
      });
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_OFFERS:
      return extend(state, getFilteredData(action.payload));
    case ActionType.CHANGE_FAVORITE_BY_ID:
      return extend(state, {loadCityOffers: getFavoriteTargetByCityAndId(state.loadCityOffers, action.payload)});
    case ActionType.GET_NEAR_OFFERS:
      return extend(state, {nearOffers: action.payload});
  }
  return state;
};

export {reducer, Operation, ActionType, ActionCreator};
