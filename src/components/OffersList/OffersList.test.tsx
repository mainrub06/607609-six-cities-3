import React from "react";
import renderer from "react-test-renderer";
import OfferList from "./OffersList";
import PLACE_MOCK from "../../mock/offers";
import { OFFERS_CSS_CLASSES } from "../../const";
import { MemoryRouter } from "react-router-dom";

it(`Render snapshot <OfferList/>`, () => {
  const tree = renderer
    .create(
      <MemoryRouter>
        <OfferList
          offersCssClasses={OFFERS_CSS_CLASSES.MAIN}
          handleClickFavoriteButton={() => {}}
          handleOfferHover={() => {}}
          onOfferClick={() => {}}
          offers={PLACE_MOCK}
          cardsLength={10}
        />
      </MemoryRouter>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
