import MockAdapter from "axios-mock-adapter";
import {createAPI} from "../../api";
import {Operation, ActionType} from "./favorites";

const initialPayload = false;
const mockId = `1`;
const mockOperationAdd = `1`;

const api = createAPI();

describe(`test api from reducer(favorites) => For not auth user should return false`, () => {
  it(`Should return initial payload`, function () {
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
});

