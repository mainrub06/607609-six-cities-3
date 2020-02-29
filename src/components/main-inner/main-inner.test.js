import React from "react";
import renderer from "react-test-renderer";
import MainInner from "./main-inner.jsx";
import PLACE_MOCK from "../../mock/offers.js";
import {OFFERS_SORT_ITEMS} from "../../const";

const CITY = `Paris`;

it(`Render Main`, () => {
  const tree = renderer
    .create(
        <MainInner
          activeFilter={OFFERS_SORT_ITEMS[0]}
          activePointId={PLACE_MOCK[0].id}
          handleOfferHover={() => {}}
          city={CITY}
          onOfferClick={() => {}}
          dataCards={PLACE_MOCK}
          onChangeFilterType={() => {}}
        />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
