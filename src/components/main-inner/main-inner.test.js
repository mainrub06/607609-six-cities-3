import React from "react";
import renderer from "react-test-renderer";
import MainInner from "./main-inner.jsx";
import PLACE_MOCK from "../../mock/offers.ts";
import { OFFERS_SORT_ITEMS, OFFERS_CSS_CLASSES } from "../../const";
import { MemoryRouter } from "react-router-dom";

const CITY_MOCK = {
  name: `Paris`,
  location: {
    latitude: 1.1,
    longitude: 1.2,
    zoom: 13,
  },
};

it(`Render snapshot <Main/>`, () => {
  const tree = renderer
    .create(
      <MemoryRouter>
        <MainInner
          activeFilter={OFFERS_SORT_ITEMS[0]}
          activePointId={PLACE_MOCK[0].id}
          handleOfferHover={() => {}}
          activeCity={CITY_MOCK}
          onOfferClick={() => {}}
          offers={PLACE_MOCK}
          onChangeFilterType={() => {}}
          handleClickFavoriteButton={() => {}}
          offersCssClasses={OFFERS_CSS_CLASSES.MAIN}
        />
      </MemoryRouter>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
