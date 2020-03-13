import {extend} from "../../utils.js";
import {FAVORITE_REQUESTS} from "../../const";

const initialState = {
  isError: false
};

const ActionType = {
  GET_FAVORITE_RESPONSE: `GET_FAVORITE_RESPONSE`
};

const ActionCreator = {
  getFavoriteResponse: (value) => ({
    type: ActionType.GET_FAVORITE_RESPONSE,
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
        console.log(err);
        throw err;
      });
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.GET_FAVORITE_RESPONSE:
      return extend(state, {isError: action.payload});
  }
  return state;
};

export {reducer, Operation, ActionType, ActionCreator};
