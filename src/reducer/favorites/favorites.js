import {extend} from "../../utils.js";
import {FAVORITE_REQUESTS} from "../../const";

const initialState = {
  updatedHotel: null
};

const ActionType = {
  GET_UPDATED_HOTEL: `GET_UPDATED_HOTEL`
};

const ActionCreator = {
  getUpdatedHotel: (value) => ({
    type: ActionType.GET_UPDATED_HOTEL,
    payload: value
  })
};

const Operation = {
  getUpdatedHotel: (id, value) => (dispatch, getState, api) => {
    const valueForFavoritesServer = value ? FAVORITE_REQUESTS.ADD : FAVORITE_REQUESTS.DELETE;
    return api
      .post(`/favorite/${id}/${valueForFavoritesServer}`)
      .then((response) => {
        dispatch(
            ActionCreator.getUpdatedHotel(response)
        );
      })
      .catch((err) => err);
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.GET_UPDATED_HOTEL:
      return extend(state, {updatedHotel: action.payload});
  }
  return state;
};

export {reducer, Operation, ActionType, ActionCreator};
