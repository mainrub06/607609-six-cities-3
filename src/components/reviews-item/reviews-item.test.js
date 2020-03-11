import React from "react";
import renderer from "react-test-renderer";
import ReviewsItem from "./reviews-item.jsx";

const REVIEWS = [
  {
    id: 1,
    rate: 2,
    comment: `review.comment`,
    date: `review.date`,
    user: {
      id: 1,
      isPro: false,
      name: `review.user.name`,
      avatar: `review.user.avatar_url`
    }
  },
  {
    id: 2,
    rate: 3,
    comment: `review.comment`,
    date: `review.date`,
    user: {
      id: 1,
      isPro: false,
      name: `review.user.name`,
      avatar: `review.user.avatar_url`
    }
  }
];

it(`Render ReviewsItem component`, () => {
  const tree = renderer
    .create(
        <ReviewsItem element = {REVIEWS[0]}/>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
