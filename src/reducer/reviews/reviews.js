import {extend, getReviewsList} from "../../utils.js";

const initialState = {
  reviewsList: null
};

const ActionType = {
  GET_REVIEWS_FROM_HOTEL_ID: `GET_REVIEWS_FROM_HOTEL_ID`
};

const ActionCreator = {
  getReviewsFromHotelId: (value) => ({
    type: ActionType.GET_REVIEWS_FROM_HOTEL_ID,
    payload: value
  })
};

const Operation = {
  getReviewsFromHotelId: (id) => (dispatch, getState, api) => {
    return api
      .get(`/comments/${id}`)
      .then((response) => {
        dispatch(
            ActionCreator.getReviewsFromHotelId(getReviewsList(response.data))
        );
      })
      .catch((err) => err);
  },
  postReviewFromHotelId: (postComment, id) => (dispatch, getState, api) => {
    return api
      .post(`/comments/${id}`, {
        comment: postComment.text,
        rating: postComment.rate
      })
      .then((response) => {
        dispatch(
            ActionCreator.getReviewsFromHotelId(getReviewsList(response.data))
        );
      });
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.GET_REVIEWS_FROM_HOTEL_ID:
      return extend(state, {reviewsList: action.payload});
  }
  return state;
};

export {reducer, Operation, ActionType, ActionCreator};
