import React from "react";
import renderer from "react-test-renderer";
import {App} from "./app.jsx";
import PLACE_MOCK from "../../mock/offers";
import PLACE_MOCK_DETAIL from "../../mock/offers-detail";
import REVIEWS from "../../mock/reviews";

const PARIS = `Paris`;

it(`Render App`, () => {

  const tree = renderer
    .create(
        <App city = {PARIS} offersDetail = {PLACE_MOCK_DETAIL} reviews = {REVIEWS} onChangeCity = {() => {}} offers = {PLACE_MOCK} activeId = {PLACE_MOCK_DETAIL[0].id} />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
