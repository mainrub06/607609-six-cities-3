import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Offer from "./offer.jsx";
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
      />
  );

  const name = OfferEl.find(`.place-card__name`);

  name.simulate(`click`);

  expect(onClickArticleName.mock.calls[0][0]).toBe(MOCK_EL.id);
});
