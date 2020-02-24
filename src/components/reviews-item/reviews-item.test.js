import React from "react";
import renderer from "react-test-renderer";
import ReviewsItem from "./reviews-item.jsx";
import REVIEWS from "../../mock/reviews";

it(`Render ReviewsItem component`, () => {
  const tree = renderer
    .create(
        <ReviewsItem element = {REVIEWS[0].reviewsArr[0]}/>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
