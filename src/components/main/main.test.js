import React from "react";
import renderer from "react-test-renderer";
import Main from "./main.jsx";
import PLACE_MOCK from "../../mock/offers.js";
import {OFFERS_SORT_ITEMS, cities as CITIES} from "../../const";

const CITY_MOCK = {
  name: `Paris`,
  location: {
    latitude: 1.1,
    longitude: 1.2,
    zoom: 13
  }
};

it(`Render Main`, () => {
  const tree = renderer
    .create(
        <Main
          activePointId={PLACE_MOCK[0].id}
          activeFilter={OFFERS_SORT_ITEMS[0]}
          citiesNames = {CITIES}
          onChangeCity={() => {}}
          onOfferClick={() => {}}
          dataCards={PLACE_MOCK}
          city={CITY_MOCK}
          onChangeFilterType={() => {}}
          handleOfferHover={() => {}}
        />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
