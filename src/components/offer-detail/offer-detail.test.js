import React from "react";
import renderer from "react-test-renderer";
import OfferDetail from "./offer-detail.jsx";
import PLACE_MOCK_DETAIL from "../../mock/offers-detail";

it(`Render OfferDetail component`, () => {
  const tree = renderer
    .create(
        <OfferDetail element={PLACE_MOCK_DETAIL[0]} />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
