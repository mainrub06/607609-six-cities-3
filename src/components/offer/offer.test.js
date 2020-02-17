import React from "react";
import renderer from "react-test-renderer";
import Offer from "./offer.jsx";
import PLACE_MOCK from "../../mock/offers";
import {BrowserRouter} from "react-router-dom";

it(`Render Offer component`, () => {
  const tree = renderer
    .create(
        <BrowserRouter>
          <Offer element={PLACE_MOCK[1]} />
        </BrowserRouter>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
