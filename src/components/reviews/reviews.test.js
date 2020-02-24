import React from "react";
import renderer from "react-test-renderer";
import Reviews from "./reviews.jsx";
import REVIEWS from "../../mock/reviews";

it(`Render ReviewsList component`, () => {
  const tree = renderer
    .create(
        <Reviews review = {REVIEWS[0]}/>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
