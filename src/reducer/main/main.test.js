import {reducer, ActionCreator} from "./main.js";
import mockReviews from "../../mock/reviews";
import {OFFERS_SORT_ITEMS} from "../../const";

const initialState = {
  cityName: `Paris`,
  offers: null,
  offersDetail: null,
  reviews: mockReviews,
  activeFilterItem: OFFERS_SORT_ITEMS[0],
  activeOfferId: null
};

const mockActionChangeCity = ActionCreator.changeCity(`Rostov-on-Don`);
const newStateChangeCity = {
  cityName: `Rostov-on-Don`,
  offers: null,
  offersDetail: null,
  reviews: mockReviews,
  activeFilterItem: OFFERS_SORT_ITEMS[0],
  activeOfferId: null
};

const mockActionChangeActiveFilter = ActionCreator.setActiveFilter({activeFilterItem: OFFERS_SORT_ITEMS[1]});
const newStateChangeActiveFilter = {
  cityName: `Paris`,
  offers: null,
  offersDetail: null,
  reviews: mockReviews,
  activeFilterItem: OFFERS_SORT_ITEMS[1],
  activeOfferId: null
};

const mockActionSetActiveOfferId = ActionCreator.setActiveOfferId({activeOfferId: 6});
const newStateSetActiveOfferId = {
  cityName: `Paris`,
  offers: null,
  offersDetail: null,
  reviews: mockReviews,
  activeFilterItem: OFFERS_SORT_ITEMS[0],
  activeOfferId: 6
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

  it(`Reducer return new state(active-hotel-id)`, () => {
    expect(reducer(initialState, mockActionSetActiveOfferId)).toEqual(newStateSetActiveOfferId);
  });
});
