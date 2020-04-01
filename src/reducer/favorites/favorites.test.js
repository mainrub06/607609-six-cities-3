import MockAdapter from "axios-mock-adapter";
import {createAPI} from "../../api";
import {Operation, ActionType, reducer} from "./favorites";

const initialPayload = false;
const mockId = `1`;
const mockOperationAdd = `1`;
const initialState = {
  isError: false,
  favorites: null
};

const api = createAPI();

describe(`test Operation from reducer/favorites`, () => {
  it(`=> getFavoriteResponse => For not auth user should return false(initialPayload)`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const loader = Operation.getFavoriteResponse(mockId, mockOperationAdd);

    apiMock
      .onPost(`/favorite/${mockId}/${mockOperationAdd}`)
      .reply(200, initialPayload);

    return loader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.GET_FAVORITE_RESPONSE,
          payload: initialPayload,
        });
      });
  });

  it(`=> getFavoritesData => For not auth user should return false(initialPayload)`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const loader = Operation.getFavoritesData();

    apiMock
      .onGet(`/favorite`)
      .reply(200, initialPayload);

    return loader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.GET_FAVORITES_DATA,
          payload: initialPayload,
        });
      });
  });
});

describe(`test reducer from reducer/favorites`, () => {
  it(`=> action = undefined should return initialState`, () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });
});
