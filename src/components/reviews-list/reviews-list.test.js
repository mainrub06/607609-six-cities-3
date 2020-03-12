import React from "react";
import renderer from "react-test-renderer";
import ReviewsList from "./reviews-list.jsx";

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

it(`Render ReviewsList component`, () => {
  const tree = renderer
    .create(
        <ReviewsList reviews = {REVIEWS}/>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
