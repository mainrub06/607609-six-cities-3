import React from "react";
import renderer from "react-test-renderer";
import OfferList from "./offers-list.jsx";
import PLACE_MOCK from "../../mock/offers";

it(`Render OfferList component`, () => {
  const tree = renderer
    .create(
        <OfferList dataCards={PLACE_MOCK} />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
