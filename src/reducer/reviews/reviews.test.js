import MockAdapter from "axios-mock-adapter";
import {createAPI} from "../../api";
import {Operation, ActionType, ActionCreator, reducer} from "./reviews";

const initialPayload = `Hallo Worlds`;
const statusMock = 200;
const mockId = `1`;
const api = createAPI();
const initialState = {
  reviewsList: null,
  reviewsResponse: null
};
const targetState = {
  reviewsList: null,
  reviewsResponse: 200
};

describe(`test Operation from reducer/reviews`, () => {
  it(`=> getNearHotels should return initialPayload`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const loader = Operation.getReviewsFromHotelId(mockId);

    apiMock
      .onGet(`/comments/${mockId}`)
      .reply(200, initialPayload);

    return loader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.GET_REVIEWS_FROM_HOTEL_ID,
          payload: {dataReviews: initialPayload, status: statusMock},
        });
      });
  });
});

describe(`test ActionCreator from reducer/reviews`, () => {
  const mockGetReviewsFromHotelId = ActionCreator.getReviewsFromHotelId({status: 200, dataReviews: null});
  it(`=> getReviewsFromHotelId = should return targetState`, () => {
    expect(reducer(initialState, mockGetReviewsFromHotelId)).toEqual(targetState);
  });
});

describe(`test reducer from reducer/reviews`, () => {
  it(`=> action = undefined should return initialState`, () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });
});

