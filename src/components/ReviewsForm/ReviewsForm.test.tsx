import React from "react";
import renderer from "react-test-renderer";
import ReviewsForm from "./ReviewsForm";

const activeHotelId = `1`;

it(`Render snapshot <ReviewsForm/>`, () => {
  const tree = renderer
    .create(
      <ReviewsForm
        isButtonActive={false}
        resetForm={() => {}}
        handleTextareaChange={() => {}}
        activeHotelId={activeHotelId}
        handleSubmitFeedback={() => {}}
        handleRadioChange={() => {}}
        rateData={""}
        textData={""}
        reviewsResponse={200}
      />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
