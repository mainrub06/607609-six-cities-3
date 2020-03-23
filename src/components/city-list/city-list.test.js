import React from "react";
import renderer from "react-test-renderer";
import CityList from "./city-list.jsx";
import {cities as CITIES} from "../../const";

it(`Render snapshot <CityList/>`, () => {
  const tree = renderer
    .create(
        <CityList citiesNames = {CITIES} activeItemIndex = {0} handleItemClick = {() => {}} onChangeCity={() => {}} />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
