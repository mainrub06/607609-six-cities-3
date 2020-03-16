import {extend, getFilteredData, getFavoriteTargetByCityAndId} from "../../utils.js";

const initialState = {
  loadCityOffers: null,
  citiesNames: null,
  loadCityOffersDetail: null
};

const ActionType = {
  LOAD_OFFERS: `LOAD_OFFERS`,
  CHANGE_FAVORITE_BY_ID: `CHANGE_FAVORITE_BY_ID`
};

const ActionCreator = {
  loadOffers: (offers) => ({
    type: ActionType.LOAD_OFFERS,
    payload: offers
  }),
  changeFavoriteById: (obj) => ({
    type: ActionType.CHANGE_FAVORITE_BY_ID,
    payload: obj
  })
};

const Operation = {
  loadOffers: () => (dispatch, getState, api) => {
    return api.get(`/hotels`)
      .then((response) => {
        dispatch(ActionCreator.loadOffers(response.data));
      });
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_OFFERS:
      return extend(state, getFilteredData(action.payload));
    case ActionType.CHANGE_FAVORITE_BY_ID:
      return extend(state, {loadCityOffers: getFavoriteTargetByCityAndId(state, action.payload)});
  }
  return state;
};

export {reducer, Operation, ActionType, ActionCreator};
