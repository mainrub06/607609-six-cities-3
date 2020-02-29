import React from "react";
import renderer from "react-test-renderer";
import Main from "./main.jsx";
import PLACE_MOCK from "../../mock/offers.js";
import {OFFERS_SORT_ITEMS} from "../../const";

const PARIS = `Paris`;

it(`Render Main`, () => {
  const tree = renderer
    .create(
        <Main
          activePointId={PLACE_MOCK[0].id}
          activeFilter={OFFERS_SORT_ITEMS[0]}
          onChangeCity={() => {}}
          onOfferClick={() => {}}
          dataCards={PLACE_MOCK}
          city={PARIS}
          onChangeFilterType={() => {}}
          handleOfferHover={() => {}}
        />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
