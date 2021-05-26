import React from "react";
import renderer from "react-test-renderer";
import Favorites from "./Favorites";
import PLACE_DETAIL_MOCK from "../../mock/offers-detail";
import { OFFERS_CSS_CLASSES, CITIES } from "../../const";
import { MemoryRouter } from "react-router-dom";

const userInfo = {
  userAvatar: `img/1.png`,
  userEmail: `Oliver.conner@gmail.com`,
  id: "1",
  isPro: false,
  userName: `Oliver.conner`,
};

const favoriteResponse = true;

it(`Render snapshot <Favorite/>`, () => {
  const tree = renderer
    .create(
      <MemoryRouter>
        <Favorites
          citiesNames={CITIES}
          favorites={PLACE_DETAIL_MOCK}
          userInfo={userInfo}
          favoriteResponse={favoriteResponse}
          offersCssClasses={OFFERS_CSS_CLASSES.FAVORITE}
          handleClickFavoriteButton={() => {}}
          getFavoritesServerData={() => {}}
          onOfferClick={() => {}}
        />
      </MemoryRouter>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
