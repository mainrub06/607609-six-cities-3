import React from "react";
import renderer from "react-test-renderer";
import {Main} from "./main.jsx";
import PLACE_MOCK from "../../mock/place-card.js";


it(`Render Main`, () => {
  const tree = renderer
    .create(<Main
      dataCards={PLACE_MOCK}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
