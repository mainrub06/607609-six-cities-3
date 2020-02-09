import React from "react";
import renderer from "react-test-renderer";
import {PlaceCard} from "./place-card.jsx";
import PLACE_MOCK from "../../mock/place-card";

it(`Render PlaceCard`, () => {
  const tree = renderer
    .create(<PlaceCard
      element={PLACE_MOCK[1]}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
