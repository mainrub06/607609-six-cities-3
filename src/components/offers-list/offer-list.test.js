import React from "react";
import renderer from "react-test-renderer";
import OfferList from "./offers-list.jsx";
import PLACE_MOCK from "../../mock/offers";
import {BrowserRouter} from "react-router-dom";

it(`Render OfferList component`, () => {
  const tree = renderer
    .create(
        <BrowserRouter>
          <OfferList dataCards={PLACE_MOCK} />
        </BrowserRouter>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
