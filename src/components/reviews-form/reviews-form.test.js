import React from "react";
import renderer from "react-test-renderer";
import ReviewsForm from "./reviews-form.jsx";

const activeHotelId = `1`;

it(`Render ReviewsForm component`, () => {
  const tree = renderer
    .create(
        <ReviewsForm activeHotelId = {activeHotelId} handleSubmitFeedback = {() => {}}/>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
