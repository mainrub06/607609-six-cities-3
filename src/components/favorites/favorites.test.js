import React from "react";
import renderer from "react-test-renderer";
import Favorites from "./favorites.jsx";
import PLACE_DETAIL_MOCK from "../../mock/offers-detail";
import { OFFERS_CSS_CLASSES, CITIES } from "../../const";
import { MemoryRouter } from "react-router-dom";

const userInfo = {
  userAvatar: `img/1.png`,
  userEmail: `Oliver.conner@gmail.com`,
  id: 1,
  isPro: false,
  userName: `Oliver.conner`,
};

const favoriteResponse = true;

it(`Render snapshot <Favorite/>`, () => {
  const tree = renderer
    .create(
      <MemoryRouter>
        <Favorites
          getFavoritesServerData={() => {}}
          citiesNames={CITIES}
          favorites={PLACE_DETAIL_MOCK}
          userInfo={userInfo}
          favoriteResponse={favoriteResponse}
          handleClickFavoriteButton={() => {}}
          onOfferClick={() => {}}
          offersCssClasses={OFFERS_CSS_CLASSES.FAVORITE}
        />
      </MemoryRouter>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
