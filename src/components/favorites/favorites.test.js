import React from "react";
import renderer from "react-test-renderer";
import Favorites from "./favorites.jsx";
import CITY_OFFERS from "../../mock/city-offers";
import CITY_OFFERS_DETAIL from "../../mock/city-offers-detail";
import {OFFERS_CSS_CLASSES, cities} from "../../const";
import {MemoryRouter} from "react-router-dom";

const userInfo = {
  userAvatar: `img/1.png`,
  userEmail: `Oliver.conner@gmail.com`,
  id: 1,
  isPro: false,
  userName: `Oliver.conner`
};

const favoriteResponse = true;

it(`Render Favorite component`, () => {
  const tree = renderer
    .create(
        <MemoryRouter>
          <Favorites getFavoritesServerData = {() => {}} favorites = {{loadCityOffers: CITY_OFFERS, citiesNames: cities, loadCityOffersDetail: CITY_OFFERS_DETAIL}} userInfo = {userInfo} favoriteResponse = {favoriteResponse} handleClickFavoriteButton = {() => {}} onOfferClick = {() => {}} offersCssClasses = {OFFERS_CSS_CLASSES.FAVORITE}/>
        </MemoryRouter>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
