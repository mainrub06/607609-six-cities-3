import {reducer, ActionCreator} from "./reducer.js";
import mockCityOffers from "./mock/city-offers";
import mockCityOffersDetail from "./mock/city-offers-detail";
import mockReviews from "./mock/reviews";

const initialCity = Object.keys(mockCityOffers)[0];
const initialCityOffers = mockCityOffers[initialCity];
const initialCityOffersDetail = mockCityOffersDetail[initialCity];

const initialState = {
  city: initialCity,
  offers: initialCityOffers,
  offersDetail: initialCityOffersDetail,
  reviews: mockReviews
};

const targetCity = Object.keys(mockCityOffers)[1];

const actionChangeCity = ActionCreator.changeCity(targetCity);
const actionChangeCityOffers = ActionCreator.getCityOffers(targetCity);
const actionChangeCityOffersDetail = ActionCreator.getCityOffersDetail(targetCity);


it(`Reducer return initial state`, () => {
  expect(reducer(undefined, {})).toEqual({
    city: initialCity,
    offers: initialCityOffers,
    offersDetail: initialCityOffersDetail,
    reviews: mockReviews
  });
});

it(`Reducer return target city state`, () => {
  expect(reducer(initialState, actionChangeCity)).toEqual({
    city: targetCity,
    offers: initialCityOffers,
    offersDetail: initialCityOffersDetail,
    reviews: mockReviews
  });
});

it(`Reducer return target CityOffers state`, () => {
  expect(reducer(initialState, actionChangeCityOffers)).toEqual({
    city: initialCity,
    offers: actionChangeCityOffers.payload,
    offersDetail: initialCityOffersDetail,
    reviews: mockReviews
  });
});

it(`Reducer return target CityOffersDetail state`, () => {
  expect(reducer(initialState, actionChangeCityOffersDetail)).toEqual({
    city: initialCity,
    offers: initialCityOffers,
    offersDetail: actionChangeCityOffersDetail.payload,
    reviews: mockReviews
  });
});
