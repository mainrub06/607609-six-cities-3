import {extend, getFilteredData} from "../../utils.js";

const initialState = {
  loadCityOffers: null,
  citiesNames: null,
  loadCityOffersDetail: null
};

const ActionType = {
  LOAD_OFFERS: `LOAD_OFFERS`
};

const ActionCreator = {
  loadOffers: (offers) => ({
    type: ActionType.LOAD_OFFERS,
    payload: offers
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

const reducer = (state = initialState, action)=>{
  switch (action.type) {
    case ActionType.LOAD_OFFERS:
      return extend(state, getFilteredData(action.payload));
  }
  return state;
};

export {reducer, Operation, ActionType, ActionCreator};
