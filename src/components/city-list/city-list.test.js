import React from "react";
import renderer from "react-test-renderer";
import CityList from "./city-list.jsx";
import {CITIES} from "../../const";

const CITY_MOCK = {
  name: `Paris`,
  location: {
    latitude: 1.1,
    longitude: 1.2,
    zoom: 13
  }
};

it(`Render snapshot <CityList/>`, () => {
  const tree = renderer
    .create(
        <CityList citiesNames = {CITIES} activeCity = {CITY_MOCK} onChangeCity={() => {}} />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
