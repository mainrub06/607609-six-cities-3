import React from "react";
import renderer from "react-test-renderer";
import Offer from "./offer.jsx";
import PLACE_MOCK from "../../mock/offers";
import {MemoryRouter} from "react-router-dom";

it(`Render Offer component`, () => {
  const tree = renderer
    .create(
        <MemoryRouter>
          <Offer handleClickFavoriteButton = {() => {}} onOfferClick={() => {}} handleOfferHover={() => {}} element={PLACE_MOCK[1]} />
        </MemoryRouter>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
