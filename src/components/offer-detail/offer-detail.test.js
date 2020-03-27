import React from "react";
import renderer from "react-test-renderer";
import {OfferDetail} from "./offer-detail.jsx";
import PLACE_MOCK_DETAIL from "../../mock/offers-detail";
import PLACE_MOCK from "../../mock/offers";
import REVIEWS from "../../mock/reviews";
import {OFFERS_CSS_CLASSES} from "../../const";
import {MemoryRouter} from "react-router-dom";

const CITY_MOCK = {
  name: `Paris`,
  location: {
    latitude: 1.1,
    longitude: 1.2,
    zoom: 13
  }
};

const USER_INFO_MOCK = {
  "id": 1,
  "name": `mainrub`,
  "email": `mainrub06@gmail.com`,
  "avatar_url": `/static/avatar/8.jpg`,
  "is_pro": false
};

const authStatus = `AUTH`;

it(`Render snapshot <OfferDetail/>`, () => {
  const tree = renderer
    .create(
        <MemoryRouter>
          <OfferDetail
            city = {CITY_MOCK}
            review={REVIEWS[0]}
            onOfferClick={() => {}}
            activeId={PLACE_MOCK_DETAIL[0].id}
            offer={PLACE_MOCK_DETAIL[0]}
            nearOffers= {PLACE_MOCK_DETAIL}
            handleOfferHover={() => {}}
            activePointId={PLACE_MOCK[0].id}
            userInfo = {USER_INFO_MOCK}
            authStatus = {authStatus}
            handleClickFavoriteButton = {() => {}}
            offersCssClasses = {OFFERS_CSS_CLASSES.MAIN}
            getNearOffersData = {() => {}}
            getComments = {() => {}}
          />
        </MemoryRouter>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
