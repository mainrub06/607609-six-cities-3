import MockAdapter from "axios-mock-adapter";
import {createAPI} from "../../api";
import {Operation, ActionType, ActionCreator, reducer} from "./data";

const initialPayload = {data: `Hallo World!`};
const mockId = `1`;
const mockState = () => ({
  loadCityOffers: null
});
const mockNullPayload = null;

const initialState = {
  loadCityOffers: null,
  citiesNames: null,
  nearOffers: null
};

const api = createAPI();

describe(`test Operation from reducer/data`, () => {
  it(`=> loadOffers should return initial payload`, function () {
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

  it(`=> getNearHotels should return mockGetNearHotelsPayload`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const loader = Operation.getNearOffers(mockId);

    apiMock
      .onGet(`/hotels/${mockId}/nearby`)
      .reply(200, mockNullPayload);

    return loader(dispatch, mockState, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.GET_NEAR_OFFERS,
          payload: mockNullPayload,
        });
      });
  });
});

describe(`test ActionCreator from reducer/data`, () => {
  const mockLoadOffersAC = ActionCreator.loadOffers(mockNullPayload);
  it(`=> ActionCreator.loadOffers should return initialState`, () => {
    expect(reducer(initialState, mockLoadOffersAC)).toEqual(initialState);
  });

  const mockChangeFavoriteById = ActionCreator.changeFavoriteById(mockNullPayload);
  it(`=> ActionCreator.changeFavoriteById should return initialState`, () => {
    expect(reducer(initialState, mockChangeFavoriteById)).toEqual(initialState);
  });

  const mockGetNearHotels = ActionCreator.getNearOffers(mockNullPayload);
  it(`=> ActionCreator.changeFavoriteById should return initialState`, () => {
    expect(reducer(initialState, mockGetNearHotels)).toEqual(initialState);
  });
});

describe(`test reducer from reducer/data`, () => {
  it(`=> action = undefined should return initialState`, () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });
});
