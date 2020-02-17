import React from "react";
import renderer from "react-test-renderer";
import Main from "./main.jsx";
import PLACE_MOCK from "../../mock/offers.js";
import {BrowserRouter} from "react-router-dom";

it(`Render Main`, () => {
  const tree = renderer
    .create(
        <BrowserRouter>
          <Main dataCards={PLACE_MOCK} />
        </BrowserRouter>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
