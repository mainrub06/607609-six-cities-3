import React from "react";
import renderer from "react-test-renderer";
import Map from "./map.jsx";
import PLACE_MOCK from "../../mock/offers.js";

it(`Render Map`, () => {
  const tree = renderer
    .create(
        <Map activePointId = {PLACE_MOCK[0].id} points={PLACE_MOCK} />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
