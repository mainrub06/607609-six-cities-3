import {extend} from "../../utils.js";

const initialState = {
  reviewsList: null
};

const ActionType = {
  GET_REVIEWS_FROM_HOTEL_ID: `GET_REVIEWS_FROM_HOTEL_ID`
};

const ActionCreator = {
  getReviewsFromHotelId: (value) => ({
    type: ActionType.SET_AUTHORIZATION_STATUS,
    payload: value
  })
};

const checkData = (data) => console.log(data);

const Operation = {
  getReviewsFromHotelId: (id) => (dispatch, getState, api) => {
    return api
      .get(`/comments/${id}`)
      .then((response) => {
        dispatch(
            ActionCreator.getReviewsFromHotelId(checkData(response.data))
        );
      })
      .catch((err) => err);
  },
  // getReviewsFromHotelId: (authData) => (dispatch, getState, api) => {
  //   return api
  //     .post(`/comments`, {
  //       email: authData.email,
  //       password: authData.password
  //     })
  //     .then((response) => {
  //       dispatch(
  //           ActionCreator.setAuthorizationStatus({
  //             authorizationStatus: AuthorizationStatus.AUTH,
  //             userInfo: response.data
  //           })
  //       );
  //     });
  // }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.GET_REVIEWS_FROM_HOTEL_ID:
      return extend(state, action.payload);
  }
  return state;
};

export {reducer, Operation, ActionType, ActionCreator};
