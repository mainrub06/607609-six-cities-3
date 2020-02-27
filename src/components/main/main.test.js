import React from "react";
import renderer from "react-test-renderer";
import Main from "./main.jsx";
import PLACE_MOCK from "../../mock/offers.js";

const PARIS = `Paris`;

it(`Render Main`, () => {

  const tree = renderer
    .create(
        <Main onChangeCity={() => {}} onOfferClick={() => {}} dataCards={PLACE_MOCK} city = {PARIS}/>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
