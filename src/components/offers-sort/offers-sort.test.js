import React from "react";
import renderer from "react-test-renderer";
import OfferSort from "./offers-sort.jsx";
import {OFFERS_SORT_ITEMS} from "../../const";

it(`Render snapshot <OfferSort/>`, () => {
  const tree = renderer
    .create(
        <OfferSort activeFilter = {OFFERS_SORT_ITEMS[0]} onChangeFilterType={() => {}} />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
