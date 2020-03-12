import React from "react";
import renderer from "react-test-renderer";
import Reviews from "./reviews.jsx";

const activeHotelId = `1`;

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
        <Reviews activeHotelId = {activeHotelId} review = {REVIEWS[0]}/>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
