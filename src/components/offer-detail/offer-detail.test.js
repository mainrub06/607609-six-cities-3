import React from "react";
import renderer from "react-test-renderer";
import OfferDetail from "./offer-detail.jsx";
import PLACE_MOCK_DETAIL from "../../mock/offers-detail";
import PLACE_MOCK from "../../mock/offers";
import REVIEWS from "../../mock/reviews";

const CITY_MOCK = {
  name: `Paris`,
  location: {
    latitude: 1.1,
    longitude: 1.2,
    zoom: 13
  }
};

it(`Render OfferDetail component`, () => {
  const tree = renderer
    .create(
        <OfferDetail
          city = {CITY_MOCK}
          review={REVIEWS[0]}
          onOfferClick={() => {}}
          activeId={PLACE_MOCK_DETAIL[0].id}
          dataCards={PLACE_MOCK}
          dataCardsDetail={PLACE_MOCK_DETAIL}
          element={PLACE_MOCK_DETAIL[0]}
          handleOfferHover={() => {}}
          activePointId={PLACE_MOCK[0].id}
        />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
