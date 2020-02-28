import React from "react";
import renderer from "react-test-renderer";
import MainInner from "./main-inner.jsx";
import PLACE_MOCK from "../../mock/offers.js";

const CITY = `Paris`;

it(`Render Main`, () => {
  const tree = renderer
    .create(
        <MainInner city = {CITY} onOfferClick={() => {}} dataCards={PLACE_MOCK} onChangeFilterType = {() => {}}/>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
