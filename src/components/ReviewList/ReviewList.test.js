import React from "react";
import renderer from "react-test-renderer";
import ReviewList from "./ReviewList";
import ReviewItem from "./ReviewItem";

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
      avatar: `review.user.avatar_url`,
    },
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
      avatar: `review.user.avatar_url`,
    },
  },
];

describe(`Testing reviews`, () => {
  it(`Render snapshot <ReviewList/>`, () => {
    const tree = renderer.create(<ReviewList reviews={REVIEWS} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Render snapshot <ReviewItem/>`, () => {
    const tree = renderer.create(<ReviewItem element={REVIEWS[0]} />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
