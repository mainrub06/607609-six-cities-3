import React from "react";
import renderer from "react-test-renderer";
import Offer from "./Offer";
import PLACE_MOCK from "../../mock/offers";
import { OFFERS_CSS_CLASSES } from "../../const";
import { MemoryRouter } from "react-router-dom";

it(`Render snapshot <Offer/>`, () => {
  const tree = renderer
    .create(
      <MemoryRouter>
        <Offer
          offersCssClasses={OFFERS_CSS_CLASSES.MAIN}
          handleClickFavoriteButton={() => {}}
          onOfferClick={() => {}}
          handleOfferHover={() => {}}
          offer={PLACE_MOCK[1]}
          isOfferDetailItem={true}
          favoriteResponse={true}
        />
      </MemoryRouter>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
