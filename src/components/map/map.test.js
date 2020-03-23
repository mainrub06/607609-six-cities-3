import React from "react";
import renderer from "react-test-renderer";
import Map from "./map.jsx";
import PLACE_MOCK from "../../mock/offers.js";

const CITY_MOCK = {
  name: `Paris`,
  location: {
    latitude: 1.1,
    longitude: 1.2,
    zoom: 13
  }
};

it(`Render snapshot <Map/>`, () => {
  const tree = renderer
    .create(
        <Map city = {CITY_MOCK} activePointId = {PLACE_MOCK[0].id} points={PLACE_MOCK} />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});


