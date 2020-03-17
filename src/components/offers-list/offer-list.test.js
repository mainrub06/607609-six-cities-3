import React from "react";
import renderer from "react-test-renderer";
import OfferList from "./offers-list.jsx";
import PLACE_MOCK from "../../mock/offers";
import {MemoryRouter} from "react-router-dom";

it(`Render OfferList component`, () => {
  const tree = renderer
    .create(
        <MemoryRouter>
          <OfferList handleClickFavoriteButton = {() => {}} handleOfferHover = {() => {}} onOfferClick={() => {}} dataCards={PLACE_MOCK} />
        </MemoryRouter>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
