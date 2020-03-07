import MockAdapter from "axios-mock-adapter";
import {createAPI} from "../../api";
import {Operation, ActionType} from "./data";

const initialPayload = {data: `Hallo World!`};

const api = createAPI();

describe(`test api from reducer`, () => {
  it(`Should return initial payload`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const loader = Operation.loadOffers();

    apiMock
      .onGet(`/hotels`)
      .reply(200, [initialPayload]);

    return loader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_OFFERS,
          payload: [initialPayload],
        });
      });
  });
});
