import React from "react";
import renderer from "react-test-renderer";
import Offer from "./offer.jsx";
import PLACE_MOCK from "../../mock/offers";

it(`Render PlaceCard`, () => {
  const tree = renderer
    .create(<Offer
      element={PLACE_MOCK[1]}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
