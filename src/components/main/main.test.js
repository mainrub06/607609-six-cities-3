import React from "react";
import renderer from "react-test-renderer";
import Main from "./main.jsx";
import PLACE_MOCK from "../../mock/offers.js";

it(`Render Main`, () => {
  const tree = renderer
    .create(
        <Main onOfferClick={() => {}} dataCards={PLACE_MOCK} />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
