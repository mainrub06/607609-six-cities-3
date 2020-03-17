import {extend, getFavoriteHotelsData} from "../../utils.js";
import {FAVORITE_REQUESTS} from "../../const";

const initialState = {
  isError: false,
  favoritesData: null
};

const ActionType = {
  GET_FAVORITE_RESPONSE: `GET_FAVORITE_RESPONSE`,
  GET_FAVORITES_DATA: `GET_FAVORITES_DATA`
};

const ActionCreator = {
  getFavoriteResponse: (value) => ({
    type: ActionType.GET_FAVORITE_RESPONSE,
    payload: value
  }),
  getFavoritesData: (value) => ({
    type: ActionType.GET_FAVORITES_DATA,
    payload: value
  })
};

const Operation = {
  getFavoriteResponse: (id, value) => (dispatch, getState, api) => {
    const valueForFavoritesServer = value ? FAVORITE_REQUESTS.ADD : FAVORITE_REQUESTS.DELETE;
    return api
      .post(`/favorite/${id}/${valueForFavoritesServer}`)
      .then(() => {
        dispatch(
            ActionCreator.getFavoriteResponse(false)
        );
      })
      .catch((err) => {
        dispatch(
            ActionCreator.getFavoriteResponse(true)
        );
        throw err;
      });
  },
  getFavoritesData: () => (dispatch, getState, api) => {
    return api
      .get(`/favorite`)
      .then((response) => {
        dispatch(
          ActionCreator.getFavoritesData(response.data)
        );
      })
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.GET_FAVORITE_RESPONSE:
      return extend(state, {isError: action.payload});
    case ActionType.GET_FAVORITES_DATA:
      return extend(state, {favoritesData: getFavoriteHotelsData(action.payload)});
  }
  return state;
};

export {reducer, Operation, ActionType, ActionCreator};
