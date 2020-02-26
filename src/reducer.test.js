import {reducer} from "./reducer.js";
import mockCityOffers from "./mock/city-offers";
import mockCityOffersDetail from "./mock/city-offers-detail";
import mockReviews from "./mock/reviews";

const initialCity = Object.keys(mockCityOffers)[0];
const initialCityOffers = mockCityOffers[initialCity];
const initialCityOffersDetail = mockCityOffersDetail[initialCity];

it(`Reducer return initial state`, () => {
  expect(reducer(undefined, {})).toEqual({
    city: initialCity,
    offers: initialCityOffers,
    offersDetail: initialCityOffersDetail,
    reviews: mockReviews
  });
});
