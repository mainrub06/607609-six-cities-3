import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Offer from "./offer.jsx";
import {OFFERS_CSS_CLASSES} from "../../const";
import PLACE_MOCK from "../../mock/offers";


const MOCK_EL = PLACE_MOCK[0];
const onHoverArticle = jest.fn((data) => data);
const onClickArticleName = jest.fn((data) => data);

Enzyme.configure({
  adapter: new Adapter()
});

it(`test Article hover`, () => {
  const OfferEl = shallow(
      <Offer
        element={MOCK_EL}
        onOfferClick={() => {}}
        handleOfferHover={() => {
          onHoverArticle(MOCK_EL.id);
        }}
        handleClickFavoriteButton = {() => {}}
        offersCssClasses = {OFFERS_CSS_CLASSES.MAIN}
      />
  );

  OfferEl.simulate(`mouseover`);

  expect(onHoverArticle.mock.calls[0][0]).toBe(MOCK_EL.id);
});

it(`test Article-title click`, () => {
  const OfferEl = shallow(
      <Offer
        element={MOCK_EL}
        onOfferClick={() => {
          onClickArticleName(MOCK_EL.id);
        }}
        handleOfferHover={() => {}}
        handleClickFavoriteButton = {() => {}}
        offersCssClasses = {OFFERS_CSS_CLASSES.MAIN}
      />
  );

  const name = OfferEl.find(`.place-card__name`);

  name.simulate(`click`);

  expect(onClickArticleName.mock.calls[0][0]).toBe(MOCK_EL.id);
});
