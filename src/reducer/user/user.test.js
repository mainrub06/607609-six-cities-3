import MockAdapter from "axios-mock-adapter";
import {createAPI} from "../../api";
import {Operation, ActionType} from "./user";

const initialPayload = {data: `Hallo World!`};

const api = createAPI();

describe(`test api from reducer(user)`, () => {
  it(`Should return initial payload`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const loader = Operation.getAuthorizationStatus();

    apiMock
      .onGet(`/login`)
      .reply(200, initialPayload);

    return loader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.SET_AUTHORIZATION_STATUS,
          payload: {
            authorizationStatus: `AUTH`,
            userInfo: initialPayload
          },
        });
      });
  });
});
