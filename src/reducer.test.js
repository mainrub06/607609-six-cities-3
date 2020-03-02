import {reducer, ActionCreator} from "./reducer.js";
import mockCityOffers from "./mock/city-offers";
import mockCityOffersDetail from "./mock/city-offers-detail";
import mockReviews from "./mock/reviews";
import {OFFERS_SORT_ITEMS} from "./const";

const initialCity = Object.keys(mockCityOffers)[0];
const initialCityOffers = mockCityOffers[initialCity];
const initialCityOffersDetail = mockCityOffersDetail[initialCity];

const initialState = {
  city: initialCity,
  offers: initialCityOffers,
  offersDetail: initialCityOffersDetail,
  reviews: mockReviews,
  cities: mockCityOffers,
  citiesDetail: mockCityOffersDetail,
  activeFilterItem: OFFERS_SORT_ITEMS[0]
};

const targetCity = Object.keys(mockCityOffers)[1];
const actionChangeCity = ActionCreator.changeCity({city: targetCity});

describe(`Reducer tests`, () => {
  it(`Reducer return initial state`, () => {
    expect(reducer(undefined, {})).toEqual({
      city: initialCity,
      offers: initialCityOffers,
      offersDetail: initialCityOffersDetail,
      reviews: mockReviews,
      cities: mockCityOffers,
      citiesDetail: mockCityOffersDetail,
      activeFilterItem: OFFERS_SORT_ITEMS[0]
    });
  });

  it(`Reducer return target city state`, () => {
    expect(reducer(initialState, actionChangeCity)).toEqual({
      city: targetCity,
      offers: initialCityOffers,
      offersDetail: initialCityOffersDetail,
      reviews: mockReviews,
      cities: mockCityOffers,
      citiesDetail: mockCityOffersDetail,
      activeFilterItem: OFFERS_SORT_ITEMS[0]
    });
  });
});
