import React from "react";
import renderer from "react-test-renderer";
import Map from "./Map";
import PLACE_MOCK from "../../mock/offers";

const CITY_MOCK = {
  name: `Paris`,
  location: {
    latitude: 1.1,
    longitude: 1.2,
    zoom: 13,
  },
};

it(`Render snapshot <Map/>`, () => {
  const tree = renderer
    .create(
      <Map
        city={CITY_MOCK}
        activeOfferId={PLACE_MOCK[0].id}
        offers={PLACE_MOCK}
        nearMap={true}
      />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
