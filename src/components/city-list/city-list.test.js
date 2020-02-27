import React from "react";
import renderer from "react-test-renderer";
import CityList from "./city-list.jsx";

it(`Render City-List filter`, () => {
  const tree = renderer
    .create(
        <CityList onChangeCity={() => {}} />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
