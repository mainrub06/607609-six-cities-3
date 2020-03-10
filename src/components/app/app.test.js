import React from "react";
import renderer from "react-test-renderer";
import {App} from "./app.jsx";
import PLACE_MOCK from "../../mock/offers";
import PLACE_MOCK_DETAIL from "../../mock/offers-detail";
import REVIEWS from "../../mock/reviews";
import {OFFERS_SORT_ITEMS, cities as CITIES} from "../../const";

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

it(`Render App`, () => {
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
        />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
