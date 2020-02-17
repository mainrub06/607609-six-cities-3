import React from "react";
import renderer from "react-test-renderer";
import Offer from "./offer.jsx";
import PLACE_MOCK from "../../mock/offers";

it(`Render Offer component`, () => {
  const tree = renderer
    .create(
        <Offer onOfferClick={() => {}} element={PLACE_MOCK[1]} />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
