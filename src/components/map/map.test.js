import React from "react";
import renderer from "react-test-renderer";
import Map from "./map.jsx";
import PLACE_MOCK from "../../mock/offers.js";


const points = PLACE_MOCK.map((it) => it.cords);


it(`Render Map`, () => {
  const tree = renderer
    .create(
        <Map points={points} />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
