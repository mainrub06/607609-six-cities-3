import { extend, getReviewsList } from "../../utils";

const initialState = {
  reviewsList: null,
  reviewsResponse: null,
};

const ActionType = {
  GET_REVIEWS_FROM_HOTEL_ID: `GET_REVIEWS_FROM_HOTEL_ID`,
};

const ActionCreator = {
  getReviewsFromHotelId: (value) => ({
    type: ActionType.GET_REVIEWS_FROM_HOTEL_ID,
    payload: value,
  }),
};

const getReviewsDataFromServer = (response) => ({
  dataReviews: response.data,
  status: response.status,
});

const Operation = {
  getReviewsFromHotelId: (id) => (dispatch, getState, api) => {
    return api.get(`/comments/${id}`).then((response) => {
      dispatch(
        ActionCreator.getReviewsFromHotelId(getReviewsDataFromServer(response))
      );
    });
  },
  postReviewFromHotelId: (postComment, id) => (dispatch, getState, api) => {
    return api
      .post(`/comments/${id}`, {
        comment: postComment.text,
        rating: postComment.rate,
      })
      .then((response) => {
        dispatch(
          ActionCreator.getReviewsFromHotelId(
            getReviewsDataFromServer(response)
          )
        );
      });
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.GET_REVIEWS_FROM_HOTEL_ID:
      return extend(state, {
        reviewsResponse: action.payload.status,
        reviewsList: getReviewsList(action.payload.dataReviews),
      });
  }
  return state;
};

export { reducer, Operation, ActionType, ActionCreator };
