import React from "react";
import renderer from "react-test-renderer";
import OfferDetail from "./offer-detail.jsx";
import PLACE_MOCK_DETAIL from "../../mock/offers-detail";
import {BrowserRouter} from "react-router-dom";

it(`Render OfferDetail component`, () => {
  const tree = renderer
    .create(
        <BrowserRouter>
          <OfferDetail dataCardsDetail={PLACE_MOCK_DETAIL} cardId={PLACE_MOCK_DETAIL[0].id} />
        </BrowserRouter>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
