import MockAdapter from "axios-mock-adapter";
import {createAPI} from "../../api";
import {Operation, ActionType, reducer} from "./user";

const AuthorizationStatus = {
  AUTH: `AUTH`,
  NO_AUTH: `NO_AUTH`
};
const initialState = {
  authorizationStatus: AuthorizationStatus.NO_AUTH,
  userInfo: null
};
const initialPayload = {data: `Hallo World!`};
const mockAuthUserPass = {
  email: `react@gmail.com`,
  password: `12345`
};

const api = createAPI();

describe(`test Operation from reducer/user`, () => {
  it(`=> Should return initial payload`, function () {
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
            authorizationStatus: AuthorizationStatus.AUTH,
            userInfo: initialPayload
          },
        });
      });
  });

  it(`=> Should return success authorization`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const loader = Operation.setAuthorizationStatus(mockAuthUserPass);

    apiMock
      .onPost(`/login`, mockAuthUserPass)
      .reply(200, initialPayload);

    return loader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.SET_AUTHORIZATION_STATUS,
          payload: {
            authorizationStatus: AuthorizationStatus.AUTH,
            userInfo: initialPayload
          },
        });
      });
  });
});

describe(`test reducer from reducer/user`, () => {
  it(`=> action = undefined should return initialState`, () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });
});
