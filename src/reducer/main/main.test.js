import {reducer, ActionCreator} from "./main.js";
import mockReviews from "../../mock/reviews";
import {OFFERS_SORT_ITEMS} from "../../const";

const initialState = {
  cityName: `Paris`,
  offers: null,
  offersDetail: null,
  reviews: mockReviews,
  activeFilterItem: OFFERS_SORT_ITEMS[0]
};

const mockActionChangeCity = ActionCreator.changeCity({cityName: `Rostov-on-Don`});
const newStateChangeCity = {
  cityName: `Rostov-on-Don`,
  offers: null,
  offersDetail: null,
  reviews: mockReviews,
  activeFilterItem: OFFERS_SORT_ITEMS[0]
};

const mockActionChangeActiveFilter = ActionCreator.changeCity({activeFilterItem: OFFERS_SORT_ITEMS[1]});
const newStateChangeActiveFilter = {
  cityName: `Paris`,
  offers: null,
  offersDetail: null,
  reviews: mockReviews,
  activeFilterItem: OFFERS_SORT_ITEMS[1]
};

describe(`inner app tests`, () => {
  it(`Reducer return initial state`, () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it(`Reducer return new state(city)`, () => {
    expect(reducer(initialState, mockActionChangeCity)).toEqual(newStateChangeCity);
  });

  it(`Reducer return new state(active-filter)`, () => {
    expect(reducer(initialState, mockActionChangeActiveFilter)).toEqual(newStateChangeActiveFilter);
  });
});
