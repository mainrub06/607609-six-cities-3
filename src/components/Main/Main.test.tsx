import React from "react";
import renderer from "react-test-renderer";
import Main from "./Main";
import PLACE_MOCK from "../../mock/offers";
import { OFFERS_SORT_ITEMS, CITIES, OFFERS_CSS_CLASSES } from "../../const";
import { MemoryRouter } from "react-router-dom";
import {IUserInfo} from "../../types/user";

const CITY_MOCK = {
  name: `Paris`,
  location: {
    latitude: 1.1,
    longitude: 1.2,
    zoom: 13,
  },
};

const USER_INFO_MOCK = {
  id: "1",
  userName: `mainrub`,
  userEmail: `mainrub06@gmail.com`,
  userAvatar: `/static/avatar/8.jpg`,
  isPro: false,
} as IUserInfo;

const authStatus = `AUTH`;

it(`Render snapshot <Main/>`, () => {
  const tree = renderer
    .create(
      <MemoryRouter>
        <Main
          favoriteResponse={true}
          activeOfferId={PLACE_MOCK[0].id}
          activeFilter={OFFERS_SORT_ITEMS[0]}
          citiesNames={CITIES}
          onChangeCity={() => {}}
          onOfferClick={() => {}}
          offers={PLACE_MOCK}
          activeCity={CITY_MOCK}
          onChangeFilterType={() => {}}
          handleOfferHover={() => {}}
          userInfo={USER_INFO_MOCK}
          authStatus={authStatus}
          handleClickFavoriteButton={() => {}}
          handleFavoriteClick={() => {}}
          offersCssClasses={OFFERS_CSS_CLASSES.MAIN}
        />
      </MemoryRouter>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
