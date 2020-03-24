import React from "react";
import renderer from "react-test-renderer";
import {App} from "./app.jsx";
import PLACE_MOCK from "../../mock/offers";
import PLACE_MOCK_DETAIL from "../../mock/offers-detail";
import {OFFERS_SORT_ITEMS, cities as CITIES, OFFERS_CSS_CLASSES} from "../../const";

const CITY_MOCK = {
  name: `Paris`,
  location: {
    latitude: 1.1,
    longitude: 1.2,
    zoom: 13
  }
};

const USER_INFO_MOCK = {
  "id": 1,
  "name": `mainrub`,
  "email": `mainrub06@gmail.com`,
  "avatar_url": `/static/avatar/8.jpg`,
  "is_pro": false
};

const authStatus = `AUTH`;

const REVIEWS = [
  {
    id: 1,
    rate: 2,
    comment: `review.comment`,
    date: `review.date`,
    user: {
      id: 1,
      isPro: false,
      name: `review.user.name`,
      avatar: `review.user.avatar_url`
    }
  },
  {
    id: 2,
    rate: 3,
    comment: `review.comment`,
    date: `review.date`,
    user: {
      id: 1,
      isPro: false,
      name: `review.user.name`,
      avatar: `review.user.avatar_url`
    }
  }
];

it(`Render snapshot <App/>`, () => {
  const tree = renderer
    .create(
        <App
          citiesNames = {CITIES}
          city={CITY_MOCK}
          offersDetail={PLACE_MOCK_DETAIL}
          reviews={REVIEWS}
          onChangeCity={() => {}}
          offers={PLACE_MOCK}
          activeId={PLACE_MOCK_DETAIL[0].id}
          activeFilter={OFFERS_SORT_ITEMS[0]}
          onChangeFilterType={() => {}}
          userInfo = {USER_INFO_MOCK}
          authStatus = {authStatus}
          login = {() => {}}
          getAuthorizationStatus = {() => {}}
          offersCssClasses = {OFFERS_CSS_CLASSES.MAIN}
        />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
