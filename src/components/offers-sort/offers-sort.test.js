import React from "react";
import renderer from "react-test-renderer";
import OfferSort from "./offers-sort.jsx";

it(`Render OfferSort component`, () => {
  const tree = renderer
    .create(
        <OfferSort onChangeFilterType={() => {}} />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
