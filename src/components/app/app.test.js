import React from "react";
import renderer from "react-test-renderer";
import {App} from "./app.jsx";
import PLACE_MOCK from "../../mock/place-card.js";

it(`Render App`, () => {
  const tree = renderer
    .create(<App
      dataCards={PLACE_MOCK}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
