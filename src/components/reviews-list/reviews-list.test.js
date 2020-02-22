import React from "react";
import renderer from "react-test-renderer";
import ReviewsList from "./reviews-list.jsx";
import REVIEWS from "../../mock/reviews";

it(`Render ReviewsList component`, () => {
  const tree = renderer
    .create(
        <ReviewsList review = {REVIEWS[0]}/>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
