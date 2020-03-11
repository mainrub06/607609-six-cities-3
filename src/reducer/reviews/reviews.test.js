import MockAdapter from "axios-mock-adapter";
import {createAPI} from "../../api";
import {Operation, ActionType} from "./reviews";

const initialPayload = {data: `Hallo World!`};
const mockId = `1`;

const api = createAPI();

describe(`test api from reducer(reviews)`, () => {
  it(`Should return initial payload`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const loader = Operation.getReviewsFromHotelId(mockId);

    apiMock
      .onGet(`/comments/${mockId}`)
      .reply(200, [initialPayload]);

    return loader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.GET_REVIEWS_FROM_HOTEL_ID,
          payload: [initialPayload],
        });
      });
  });
});
