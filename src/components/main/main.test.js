import React from "react";
import renderer from "react-test-renderer";
import Main from "./main.jsx";
import PLACE_MOCK from "../../mock/offers.js";
import {OFFERS_SORT_ITEMS, CITIES, OFFERS_CSS_CLASSES} from "../../const";
import {MemoryRouter} from "react-router-dom";

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

it(`Render snapshot <Main/>`, () => {
  const tree = renderer
    .create(
        <MemoryRouter>
          <Main
            activePointId={PLACE_MOCK[0].id}
            activeFilter={OFFERS_SORT_ITEMS[0]}
            citiesNames = {CITIES}
            onChangeCity={() => {}}
            onOfferClick={() => {}}
            offers={PLACE_MOCK}
            activeCity={CITY_MOCK}
            onChangeFilterType={() => {}}
            handleOfferHover={() => {}}
            userInfo = {USER_INFO_MOCK}
            authStatus = {authStatus}
            handleClickFavoriteButton = {() => {}}
            offersCssClasses = {OFFERS_CSS_CLASSES.MAIN}
          />
        </MemoryRouter>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
